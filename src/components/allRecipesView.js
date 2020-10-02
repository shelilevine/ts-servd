import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import AllRecipesRender from "./allRecipesRender";
import PropTypes from "prop-types";

const serverUrl = "/api/recipes";

export function AllRecipesView(props) {
  const [isLoading, setLoadStatus] = useState(true);

  useEffect(() => {
    if (props.location.state && !props.search.length) {
      props.setSingleRecipe({});
      getSearchResults();
    }
  }, []);

  async function getSearchResults() {
    window.scrollTo(0, 0);
    const ingredient = props.location.state.ingredient;
    const { data } = await axios.get(serverUrl, {
      params: {
        ingredients: ingredient,
      },
      withCredentials: false,
    });
    props.setSearchResults(data);
    setLoadStatus(false);
  }

  return (
    <AllRecipesRender
      recipes={props.search}
      user={props.user}
      savedRecipes={props.savedRecipes}
      saveRecipe={props.saveRecipe}
      removeRecipe={props.removeRecipe}
      setSingleRecipe={props.setSingleRecipe}
      isLoading={isLoading}
      refresh={getSearchResults}
    />
  );
}

AllRecipesView.propTypes = {
  removeRecipe: PropTypes.func,
  saveRecipe: PropTypes.func,
  savedRecipes: PropTypes.array,
  search: PropTypes.array,
  setSearchResults: PropTypes.func,
  setSingleRecipe: PropTypes.func,
  user: PropTypes.object,
};

export default withRouter(AllRecipesView);
