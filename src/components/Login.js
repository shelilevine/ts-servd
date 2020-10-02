import axios from "axios";
import { withRouter, Redirect } from "react-router-dom";
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  Box,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
const oauthKey = process.env.REACT_APP_OAUTHKEY;

const serverUrl = "/api/auth";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    alignContent: "center",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "100vh",
  },
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
}));

export function SignIn(props) {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPw] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const { data } = await axios.post(`${serverUrl}/signin`, {
        email,
        password,
      });
      if (data.id) {
        props.setUser(data);
        props.history.push(props.history.location.state);
      } else {
        setError({ error: "Invalid username and/or password" });
      }
    } catch (err) {
      setError({ error: "Invalid username and/or password" });
      console.log(err);
    }
  };

  const loginWithGoogle = async (response) => {
    const idToken = response.getAuthResponse().id_token;
    try {
      const { data } = await axios.post(`${serverUrl}/google`, {
        token: idToken,
      });
      props.setUser(data);
      props.history.push(props.history.location.state);
    } catch (err) {
      console.error(err);
    }
  };

  return props.user.id ? (
    <Redirect to={props.history.location.state} />
  ) : (
    <Box mx="auto" className={classes.formContainer}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(evt) => onSubmit(evt)}
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
              onChange={(evt) => {
                setError(null);
                setEmail(evt.target.value);
              }}
              value={email}
              type="email"
              pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
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
              onChange={(evt) => {
                setError(null);
                setPw(evt.target.value);
              }}
              value={password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <GoogleLogin
                  clientId={oauthKey}
                  buttonText="Login"
                  onSuccess={loginWithGoogle}
                  cookiePolicy="single_host_origin"
                  SameSite="None"
                />
              </Grid>
              <Grid item>
                <Link
                  variant="body2"
                  onClick={() => props.history.push("/signup")}
                >
                  New to Serv'd? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Box>
  );
}

export default withRouter(SignIn);
