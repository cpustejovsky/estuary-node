import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import AllInboxIcon from "@material-ui/icons/AllInbox";

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

function SimpleMenu() {
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
        <MenuItem component={RouterLink} to="/" onClick={handleClose}>
          Home
        </MenuItem>
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
          <Button style={{ color: "white" }} component={RouterLink} to="/auth">
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
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            {SimpleMenu()}
          </IconButton>
          <AllInboxIcon />
          <Typography variant="h6" className={classes.title}>
            Estuary
          </Typography>
          {renderAuth()}
        </Toolbar>
      </AppBar>
    </div>
  );
}
