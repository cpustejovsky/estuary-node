import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";
import NoteHeader from "./NoteHeader";
import MenuIcon from "@material-ui/icons/Menu";
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
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menuContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  menuItems: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      color: "white",
      "& a": {
        color: "white",
      },
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
}));

export default function Header() {
  let loc = useLocation().pathname;
  let notesPage = loc.includes("notes") && !loc.includes("organize");
  const user = useSelector((state) => state.user);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderAuth = () => {
    if (user) {
      return (
        //TODO: add breakpoints and mediaqueries to change properties based on mobile or desktop
        <div className={classes.menuItems}>
          <MenuItem component={RouterLink} to="/user">
            {user.firstName}
          </MenuItem>
          <MenuItem component={Link} underline="none" href="/logout">
            Log Out
          </MenuItem>
        </div>
      );
    } else {
      return (
        <MenuItem
          className={classes.menuItems}
          component={RouterLink}
          to="/login"
        >
          Log in
        </MenuItem>
      );
    }
  };
  const renderMenu = (mobile = false) => {
    return (
      <>
        <div className={classes.menuItems}>
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
          <MenuItem
            component={RouterLink}
            to="/notes/in-tray"
            onClick={handleClose}
          >
            Notes
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/projects/list"
            onClick={handleClose}
          >
            Projects
          </MenuItem>
          {mobile ? <hr /> : null}
        </div>
        {renderAuth()}
      </>
    );
  };
  return (
    <AppBar position="sticky" id="header" style={{ width: "100vw" }}>
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
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
        <Hidden mdUp>
          <IconButton
            style={{ margin: "0" }}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon aria-haspopup="true" onClick={handleClick} />
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {renderMenu(true)}
            </Menu>
          </IconButton>
        </Hidden>
        <Hidden smDown className={classes.menuContainer}>
          <div className={classes.menuContainer}>{renderMenu()}</div>
        </Hidden>
      </Toolbar>
      {notesPage ? <NoteHeader /> : null}
    </AppBar>
  );
}
