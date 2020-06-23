import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";
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
import NoteHeader from "./NoteHeader";
import MenuIcon from "@material-ui/icons/Menu";

export default function Header() {
  let loc = useLocation().pathname;
  let notesPage = loc.includes("notes") && !loc.includes("organize");
  const user = useSelector((state) => state.user);

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
          {renderMenu()}
        </Menu>
      </div>
    );
  };
  const renderAuth = () => {
    if (user) {
      return (
        <>
          <MenuItem
            style={{ color: "white" }}
            component={RouterLink}
            to="/user"
          >
            {user.firstName}
          </MenuItem>
          <MenuItem
            component={Link}
            style={{ color: "white" }}
            underline="none"
            href="/logout"
          >
            Log Out
          </MenuItem>
        </>
      );
    } else {
      return (
        <MenuItem style={{ color: "white" }} component={RouterLink} to="/login">
          Log in
        </MenuItem>
      );
    }
  };
  const renderMenu = () => {
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
        <hr></hr>
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
