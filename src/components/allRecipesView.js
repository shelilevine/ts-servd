import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import AllRecipesRender from "./allRecipesRender";

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

export default withRouter(AllRecipesView);
