import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AccountCircle } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    opacity: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    align: "center",
    cursor: "pointer",
    fontFamily: "Oswald, sans-serif",
    fontSize: "60px",
    color: "white",
  },
  button: {
    backgroundColor: "white",
    color: "#ec2d01",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  centerBox: {
    flexBasis: 0,
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
  },
  leftBox: {
    flexBasis: 0,
    flexGrow: 1,
  },
  rightBox: {
    flexBasis: 0,
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
}));

function MenuAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user, logout } = props;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          background: "#ec2d01",
        }}
      >
        <Toolbar classesName={classes.toolbar}>
          <Box className={classes.leftBox} />
          <Box className={classes.centerBox}>
            <Typography
              variant="h4"
              className={classes.title}
              onClick={() => props.history.push("/")}
            >
              SERV'D
            </Typography>
          </Box>
          {user.id ? (
            <div className={classes.rightBox}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    props.history.push("/myAccount");
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    props.history.push("/saved");
                  }}
                >
                  Saved Recipes
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    logout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Box className={classes.rightBox}>
              <Button
                variant="outlined"
                size="small"
                onClick={() =>
                  props.history.push("/login", props.history.location.pathname)
                }
                className={classes.button}
              >
                Sign In
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

MenuAppBar.propTypes = {
  logout: PropTypes.func,
  user: PropTypes.object,
};

export default withRouter(MenuAppBar);
