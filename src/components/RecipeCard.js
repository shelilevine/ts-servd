import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "5px",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    margin: "4%",
  },
  cardContent: {
    flexGrow: 1,
    paddingTop: "20px",
  },
  button: {
    justifyContent: "space-between",
  },
  save: {
    alignSelf: "flex-end",
    justifySelf: "flex-end",
  },
  cardTitle: {
    fontFamily: "Lato, serif",
    textAlign: "center",
  },
}));

export function RecipeCard(props) {
  const classes = useStyles();
  const { isSaved, user, recipe } = props;

  return (
    <React.Fragment>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={recipe.imgUrl}
            title={recipe.title}
          />
          <CardContent className={classes.cardContent}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.cardTitle}
            >
              {recipe.title}
            </Typography>
          </CardContent>
          <CardActions className={classes.button}>
            <Button
              size="small"
              color="primary"
              className={classes.view}
              onClick={() => {
                props.setSingleRecipe(recipe);
                props.history.push({
                  pathname: "/single-recipe",
                  state: recipe,
                });
              }}
            >
              View
            </Button>
            {user.id && isSaved ? (
              <Button
                className={classes.save}
                onClick={() => props.removeRecipe(recipe)}
              >
                <StarIcon />
              </Button>
            ) : user.id ? (
              <Button
                className={classes.save}
                onClick={() => props.saveRecipe(recipe)}
              >
                <StarBorderIcon />
              </Button>
            ) : null}
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  );
}

RecipeCard.propTypes = {
  isSaved: PropTypes.bool,
  user: PropTypes.object,
  recipe: PropTypes.object,
};

RecipeCard.defaultProps = {
  isSaved: false,
  user: {},
};

export default withRouter(RecipeCard);
