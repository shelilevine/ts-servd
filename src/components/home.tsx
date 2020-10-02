import React, { useState, useEffect, ChangeEvent } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import Search from "./search";
import arrowWood from "../arrowwoodback.jpg";
import { Redirect, withRouter } from "react-router-dom";
import CSS from 'csstype';

interface Styles {
  paperContainer: CSS.Properties
  formContainer: CSS.Properties
  title: CSS.Properties
  button: CSS.Properties
}

const styles: Styles = {
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
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "100vh",
  },
  title: {
    color: "white",
    // fontWeight: "70px",
    fontFamily: "Oswald, sans-serif",
    fontSize: "50px",
    paddingBottom: "40px",
    marginTop: "100px",
  },
  button: {
    marginTop: "30px",
    backgroundColor: "#ec2d01",
    borderRadius: "5px",
  },
};

type Props = {
  setSearchResults: (result: Array<string>) => Array<string>
}



export function Home(props: Props): JSX.Element {
  const [ingredient, setIngredient] = useState("");
  const [isSubmitted, setSubmitStatus] = useState(false);

  useEffect(() => {
    props.setSearchResults([]);
  }, []);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    setSubmitStatus(true);
  };

  if (isSubmitted) {
    return (
      <Redirect
        to={{
          pathname: `/search`,
          state: { ingredient },
        }}
      />
    );
  } else
    return (
      <Box mx="auto" style={styles.formContainer}>
        <Typography
          color="inherit"
          align="center"
          variant="h2"
          style={styles.title}
          component="h2"
        >
          SEARCH FOR RECIPES
        </Typography>
        <Search
          ingredient={ingredient}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => setIngredient(evt.target.value)}
          onSubmit={handleSubmit}
        />
        <Button
          variant="contained"
          color="primary"
          style={styles.button}
          onClick={handleSubmit}
          disabled={!ingredient}
        >
          Serve!
        </Button>
      </Box>
    );
}

export default withRouter(Home);
