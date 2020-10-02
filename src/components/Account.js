/* eslint-disable no-alert */
import React, { useState, useEffect } from "react";
import ViewAccountForm from "./ViewAccountForm";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Button, Box, Hidden, withWidth } from "@material-ui/core";
import { withSnackbar } from "notistack";

const serverUrl = "/api/auth";

const styles = {
  button: {
    marginTop: "30px",
    backgroundColor: "#ec2d01",
    borderRadius: "5px",
  },
  formContainer: {
    alignContent: "center",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "100vh",
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

export function Account(props) {
  const [user, updateUser] = useState({ name: "", password: "", email: "" });

  useEffect(() => {
    updateUser({ ...user, ...props.appState.user });
  }, []);

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      if (user.id !== null) {
        const { data } = await axios.put(`${serverUrl}`, user);
        props.setUser(data);

        props.enqueueSnackbar("Account Successfully Updated", {
          variant: "success",
          anchorOrigin: window.screen.width < 960 ? styles.mdDown : styles.mdUp,
        });
      }
    } catch (err) {
      props.enqueueSnackbar(err.response.data, {
        variant: "error",
        anchorOrigin: window.screen.width < 960 ? styles.mdDown : styles.mdUp,
      });
    }
  }

  return (
    <Box mx="auto" style={styles.formContainer}>
      <ViewAccountForm
        onChange={(evt) =>
          updateUser({ ...user, [evt.target.name]: evt.target.value })
        }
        onSubmit={handleSubmit}
        state={user}
      />
      <Hidden mdUp>
        <Button
          variant="contained"
          color="primary"
          style={styles.button}
          onClick={() => props.logout()}
        >
          Logout
        </Button>
      </Hidden>
    </Box>
  );
}

export default withRouter(withSnackbar(Account));
