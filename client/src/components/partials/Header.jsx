import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Link,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Hidden,
} from "@material-ui/core/";

import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function MobileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MenuIcon
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem component={RouterLink} to="/">
          <Typography variant="h6">Estuary</Typography>
        </MenuItem> */}
        <MenuItem component={RouterLink} to="/about" onClick={handleClose}>
          About
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/free-writes"
          onClick={handleClose}
        >
          Free Writes
        </MenuItem>
        <MenuItem component={RouterLink} to="/notes" onClick={handleClose}>
          Notes
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/projects/list"
          onClick={handleClose}
        >
          Projects
        </MenuItem>
      </Menu>
    </div>
  );
}

export default function Header() {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const renderAuth = () => {
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <Button style={{ color: "white" }} component={RouterLink} to="/login">
            Log in
          </Button>
        );
      default:
        return (
          <>
            <Button
              style={{ color: "white" }}
              component={RouterLink}
              to="/user"
            >
              {user
                ? user.firstName || user.displayName
                : auth.firstName || auth.displayName}
            </Button>
            <Button
              component={Link}
              style={{ color: "white" }}
              underline="none"
              href="/logout"
            >
              Log Out
            </Button>
          </>
        );
    }
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Hidden mdUp>
            <Typography
              component={RouterLink}
              to="/"
              style={{ color: "white", textDecoration: "none" }}
              variant="h6"
            >
              Estuary
            </Typography>
            <IconButton
              style={{ margin: "0" }}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              {MobileMenu()}
            </IconButton>
          </Hidden>
          <Hidden smDown>
            <div className={classes.title}>
              <Typography
                component={RouterLink}
                to="/"
                style={{
                  color: "white",
                  textDecoration: "none",
                  paddingRight: "20px",
                  justifySelf: "center",
                }}
                variant="h6"
              >
                Estuary
              </Typography>
              <Button
                component={RouterLink}
                style={{ color: "white" }}
                underline="none"
                to="/about"
              >
                About
              </Button>
              <Button
                component={RouterLink}
                style={{ color: "white" }}
                underline="none"
                to="/free-writes"
              >
                Free Writes
              </Button>
              <Button
                component={RouterLink}
                style={{ color: "white" }}
                underline="none"
                to="/notes"
              >
                Notes
              </Button>
              {/* <Button
                component={RouterLink}
                style={{ color: "white" }}
                underline="none"
                to="/about"
              >
                Next Actions
              </Button> */}
              <Button
                component={RouterLink}
                style={{ color: "white" }}
                underline="none"
                to="/projects/list"
              >
                Projects
              </Button>
            </div>

            {renderAuth()}
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}
