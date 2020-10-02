import React, { useEffect } from "react";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import arrowWood from "../arrowwoodback.jpg";
import {
  CssBaseline,
  Typography,
  Grid,
  Container,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import SingleRecipeIngredients from "./SingleRecipeIngredients";
import SingleRecipeSteps from "./SingleRecipeSteps";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "Lato, sans serif",
    backgroundImage: `url(${arrowWood})`,
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    backgroundColor: "white",
    borderRadius: "10px",
    opacity: "94%",
    fontFamily: "Lato, sans serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
    marginLeft: "2%",
    marginTop: "3%",
  },
  title: {
    margin: "1.5%",
  },
  recipeImg: {
    width: "100%",
    marginBottom: "15px",
  },
  recipeImgContainer: {
    display: "flex",
  },
  favoriteStar: {
    marginTop: "2%",
  },
  typography: {
    fontFamily: "Lato, Times, serif",
  },
  servings: {
    marginTop: "4%",
  },
}));

export function SingleRecipe(props) {
  const classes = useStyles();
  const recipe = props.location.state || props.appState.singleRecipe;
  const isLoggedIn = !!props.appState.user.id;
  const isSaved =
    props.appState.savedRecipes.filter((saved) => saved.title === recipe.title)
      .length > 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="md">
        {/* Title */}
        <Grid className={classes.title} spacing={2}>
          <Box className={classes.header}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              className={classes.typography}
            >
              <strong>{recipe.title}</strong>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                className={`${classes.typography} ${classes.servings}`}
              >
                Servings: {recipe.servings}
              </Typography>
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                className={classes.typography}
              >
                Cook Time: {recipe.time} min.
              </Typography>
            </Typography>

            <div className={classes.favoriteStar}>
              {isLoggedIn && !isSaved ? (
                <StarBorderIcon
                  variant="contained"
                  onClick={() => props.saveRecipe(recipe)}
                />
              ) : null}
              {isLoggedIn && isSaved ? (
                <StarIcon
                  variant="contained"
                  onClick={() => props.removeRecipe(recipe)}
                />
              ) : null}
            </div>
          </Box>
        </Grid>

        {/* Recipe Image */}
        <Grid className={classes.recipeImg}>
          <Container className={classes.recipeImgContainer}>
            <img
              className={classes.recipeImg}
              src={recipe.imgUrl}
              alt={recipe.title}
            />
          </Container>
        </Grid>

        {/* Ingredients*/}
        <SingleRecipeIngredients ingredients={recipe.ingredients} />

        {/* Steps */}
        <SingleRecipeSteps steps={recipe.steps} />
      </Container>
    </div>
  );
}

SingleRecipe.propTypes = {
  appState: PropTypes.object,
};

export default withRouter(SingleRecipe);
