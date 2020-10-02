import React from "react";
import RecipeCard from "./RecipeCard";
import { Grid, Container, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  results: {
    alignContent: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    noWrap: "true",
    color: "white",
    fontWeight: "70px",
    fontFamily: "Oswald, sans-serif",
    marginBottom: "30px",
    marginTop: "10px",
  },
}));

const SavedRecipes = (props) => {
  const classes = useStyles();
  const { recipes, setSingleRecipe } = props;

  return (
    <React.Fragment>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Box className={classes.results}>
            <Typography variant="h3" color="inherit" className={classes.text}>
              {recipes.length ? "SAVED RECIPES" : "NO SAVED RECIPES"}
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {recipes.map((recipe) => (
              <RecipeCard
                recipe={recipe}
                key={recipe.title}
                setSingleRecipe={setSingleRecipe}
              />
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};

SavedRecipes.propTypes = {
  setSingleRecipe: PropTypes.func,
  recipes: PropTypes.arrayOf(PropTypes.object),
};

export default SavedRecipes;
