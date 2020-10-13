import React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Grid,
  Typography,
  Container,
  Button,
  Theme,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import { Recipe, UpdateRecipe, User } from "../interfaces";

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
    button: {
      backgroundColor: "#ec2d01",
      color: "white",
      "&:hover": {
        color: "#ec2d01",
        backgroundColor: "white",
      },
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "5%",
      marginBottom: "5%",
    },
  })
);

type Props = {
  recipes: Recipe[];
  savedRecipes: Recipe[];
  saveRecipe: UpdateRecipe;
  removeRecipe: UpdateRecipe;
  setSingleRecipe: UpdateRecipe;
  isLoading: boolean;
  refresh: () => void;
  user: User | {};
};

export function AllRecipesRender(props: Props) {
  const classes = useStyles();
  const {
    recipes,
    savedRecipes,
    saveRecipe,
    removeRecipe,
    setSingleRecipe,
    isLoading,
    refresh,
  } = props;
  const user = props.user || {};

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative" />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {!isLoading &&
            (recipes.length ? (
              <Box className={classes.results}>
                <Typography
                  variant="h3"
                  color="inherit"
                  className={classes.text}
                >
                  RECIPES
                </Typography>
              </Box>
            ) : (
              <Box className={classes.results}>
                <Typography
                  variant="h3"
                  color="inherit"
                  className={classes.text}
                >
                  NO RECIPES MATCH YOUR SEARCH
                </Typography>
              </Box>
            ))}

          <Grid container spacing={4}>
            {recipes.map((card) => {
              const isSaved =
                savedRecipes.filter(({ title }) => title === card.title)
                  .length > 0;
              return (
                <RecipeCard
                  recipe={card}
                  key={card.title}
                  isSaved={isSaved}
                  user={user}
                  saveRecipe={saveRecipe}
                  removeRecipe={removeRecipe}
                  setSingleRecipe={setSingleRecipe}
                />
              );
            })}
          </Grid>

          {!isLoading &&
            (recipes.length ? (
              <Box className={classes.buttonContainer}>
                <Button className={classes.button} onClick={refresh}>
                  Serve Again
                </Button>
              </Box>
            ) : (
              <Box className={classes.buttonContainer}>
                <Button
                  className={classes.button}
                  onClick={() => props.history.push("/")}
                >
                  New Search
                </Button>
              </Box>
            ))}
        </Container>
      </main>
    </React.Fragment>
  );
}

export default withRouter(AllRecipesRender);
