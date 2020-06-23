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
  menuItems: {
    [theme.breakpoints.up("md")]: {
      color: "white",
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

  const MobileMenu = () => {
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
          {renderMenu(true)}
        </Menu>
      </div>
    );
  };
  const renderAuth = () => {
    if (user) {
      return (
        //TODO: add breakpoints and mediaqueries to change properties based on mobile or desktop
        <>
          <MenuItem
            className={classes.menuItems}
            component={RouterLink}
            to="/user"
          >
            {user.firstName}
          </MenuItem>
          <MenuItem
            component={Link}
            className={classes.menuItems}
            underline="none"
            href="/logout"
          >
            Log Out
          </MenuItem>
        </>
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
            color="inherit"
            aria-label="menu"
          >
            {MobileMenu()}
          </IconButton>
        </Hidden>
        <Hidden smDown>
          <>
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
            {renderMenu()}
          </>
        </Hidden>
      </Toolbar>
      {notesPage ? <NoteHeader /> : null}
    </AppBar>
  );
}
