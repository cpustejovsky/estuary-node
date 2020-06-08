import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default function NoteHeader() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <AppBar position="static" color="default" style={{ alignItems: "center" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="on"
        indicatorColor="secondary"
        textColor="default"
        aria-label="scrollable force tabs example"
      >
        <Tab label="In-Tray" component={RouterLink} to="/notes/in-tray" />
        <Tab label="Next" component={RouterLink} to="/notes/next" />
        {/* <Tab label="Waiting" component={RouterLink} to="/notes/waiting" /> */}
        <Tab label="Maybe" component={RouterLink} to="/notes/maybe" />
        <Tab label="Done" component={RouterLink} to="/notes/done" />
        <Tab label="Reference" component={RouterLink} to="/notes/reference" />
      </Tabs>
    // </AppBar>
  );
}
