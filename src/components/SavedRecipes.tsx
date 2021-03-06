import React from "react";
import RecipeCard from "./RecipeCard";
import { Grid, Container, Box, Typography, Theme } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Recipe } from "../interfaces";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      fontFamily: "Oswald, sans-serif",
      marginBottom: "30px",
      marginTop: "10px",
    },
  })
);

type Props = {
  recipes: Recipe[];
  setSingleRecipe: (recipe: Recipe) => void;
};

const SavedRecipes = (props: Props): JSX.Element => {
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
