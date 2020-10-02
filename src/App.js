/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./App.css";
import { Box, Hidden } from "@material-ui/core";
import Routes from "./routes";
import BottomAppBar from "./components/bottom";
import MenuAppBar from "./components/appBar";
import arrowWood from "./arrowwoodback.jpg";
import { withSnackbar } from "notistack";

const serverUrl = "/api";
axios.defaults.withCredentials = true;

const styles = {
  paperContainer: {
    minHeight: "100vh",
    margin: "0px",
    flexDirection: "column",
    height: "fill-screen",
    backgroundImage: `url(${arrowWood})`,
    backgroundSize: "cover",
    backgroundPosition: "right",
    backgroundRepeat: "repeat",
    zIndex: -1,
  },

  formContainer: {
    alignContent: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 450,
  },
  mdUp: {
    vertical: "bottom",
    horizontal: "left",
  },
  mdDown: {
    vertical: "top",
    horizontal: "left",
  },
};

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      savedRecipes: [],
      search: [],
      singleRecipe: {},
    };
    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
    this.removeRecipe = this.removeRecipe.bind(this);
    this.getRecipes = this.getRecipes.bind(this);
    this.setSearchResults = this.setSearchResults.bind(this);
    this.setSingleRecipe = this.setSingleRecipe.bind(this);
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get(`${serverUrl}/auth`);
      await this.setUser(data);
    } catch (err) {
      console.error(err.response.data);
    }
  }

  async saveRecipe(recipe) {
    try {
      await axios.post(`${serverUrl}/recipes`, recipe);
      this.setState({ savedRecipes: [...this.state.savedRecipes, recipe] });

      this.props.enqueueSnackbar("Recipe Saved", {
        variant: "success",
        anchorOrigin: window.screen.width < 960 ? styles.mdDown : styles.mdUp,
      });
    } catch (err) {
      console.error(err.response.data);

      this.props.enqueueSnackbar(err.response.data, {
        variant: "error",
        anchorOrigin: window.screen.width < 960 ? styles.mdDown : styles.mdUp,
      });
    }
  }

  async removeRecipe(recipe) {
    try {
      await axios.delete(`${serverUrl}/recipes/${recipe.title}`);
      const updatedRecipes = this.state.savedRecipes.filter(
        ({ title }) => title !== recipe.title
      );
      this.setState({ savedRecipes: updatedRecipes });

      this.props.enqueueSnackbar("Recipe Removed", {
        variant: "success",
        anchorOrigin: window.screen.width < 960 ? styles.mdDown : styles.mdUp,
      });
    } catch (err) {
      console.error(err.response.data);

      this.props.enqueueSnackbar(err.response.data, {
        variant: "error",
        anchorOrigin: window.screen.width < 960 ? styles.mdDown : styles.mdUp,
      });
    }
  }

  async getRecipes() {
    try {
      const response = await axios.get(`${serverUrl}/recipes/saved`);
      this.setState({ savedRecipes: response.data });
    } catch (err) {
      console.error(err.response.data);
    }
  }

  setSingleRecipe(singleRecipe) {
    this.setState({ singleRecipe });
  }

  async setUser(user) {
    this.setState({ user });
    if (user.id) {
      await this.getRecipes();
    }
  }

  async logout() {
    try {
      await axios.post(`${serverUrl}/auth/signout`);
      this.setUser({});
      this.setState({ savedRecipes: [] });
      this.props.history.push("/");
    } catch (err) {
      console.error(err);
    }
  }

  setSearchResults(recipes) {
    this.setState({ search: recipes });
  }

  render() {
    return (
      <div style={styles.paperContainer}>
        <Box mx="auto">
          <Hidden smDown>
            <MenuAppBar user={this.state.user} logout={this.logout} />
          </Hidden>
          <Routes
            setUser={this.setUser}
            saveRecipe={this.saveRecipe}
            removeRecipe={this.removeRecipe}
            setSearchResults={this.setSearchResults}
            setSingleRecipe={this.setSingleRecipe}
            appState={this.state}
            logout={this.logout}
          />
          <Hidden mdUp>
            <BottomAppBar user={this.state.user} logout={this.logout} />
          </Hidden>
        </Box>
      </div>
    );
  }
}

export default withRouter(withSnackbar(App));
