import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import {
  Box,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const serverUrl = "/api/auth/signup";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formContainer: {
    alignContent: "center",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "100vh",
  },
}));

export function SignUp(props) {
  const [user, updateUser] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const classes = useStyles();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const { data } = await axios.post(serverUrl, user);
      if (data.id) {
        props.setUser(data);
        props.history.push("/");
      } else {
        setError("Invalid username and/or password");
      }
    } catch (err) {
      setError(err.response.data);
    }
  }

  function handleChange(evt) {
    updateUser({ ...user, [evt.target.name]: evt.target.value });
    setError(null);
  }

  return props.user.id ? (
    <Redirect to="/" />
  ) : (
    <Box mx="auto" className={classes.formContainer}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(evt) => handleSubmit(evt)}
          >
            {error ? <Alert severity="error">{error}</Alert> : null}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(evt) => handleChange(evt)}
              value={user.email}
              type="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(evt) => handleChange(evt)}
              value={user.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs />
              <Grid item>
                <Link
                  variant="body2"
                  onClick={() => props.history.push("/login")}
                >
                  Already have an account? Log In
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Box>
  );
}

export default withRouter(SignUp);
