import React from "react";
import { Typography, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  recipeIngredientsContainer: {
    display: "flex",
    marginLeft: "3%",
    paddingBottom: "3%",
  },
  recipeIngredients: {
    marginTop: "1%",
    paddingTop: "1%",
    paddingBottom: "1%",
  },
  typography: {
    fontFamily: "Lato, Times, serif",
  },
}));

export default function SingleRecipeIngredients(props) {
  const classes = useStyles();
  const { ingredients } = props;

  return (
    <React.Fragment>
      <Grid className={classes.recipeIngredientsContainer}>
        <Grid className={classes.recipeIngredients} container>
          <Container style={{ paddingLeft: "0px" }}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              className={classes.typography}
            >
              <strong>Ingredients</strong>
            </Typography>
          </Container>
          <Grid
            container
            spacing={3}
            style={{ marginLeft: "1%", paddingTop: "2%" }}
          >
            {ingredients.map((ingredient) => (
              <Grid container xs={6} sm={6} key={ingredient} spacing={0}>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  className={classes.typography}
                >
                  {ingredient}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

SingleRecipeIngredients.propTypes = {
  ingredients: PropTypes.array,
};

SingleRecipeIngredients.defaultProps = {
  ingredients: [],
};
