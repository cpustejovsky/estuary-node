import React from "react";
import { Button, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import _ from "lodash";

export default function renderSubHeader(notes, match) {
  const renderNotesLength = () => {
    if (!_.isEmpty(notes)) {
      return notes.length;
    }
  };
  if (renderNotesLength() > 0) {
    return (
      <div className="button button__notes">
        <Typography variant="h4" className="button__text__left">
          {match.params.name.toUpperCase()} ({renderNotesLength() || 0})
        </Typography>
        <Button
          component={RouterLink}
          to="/notes/organize"
          variant="contained"
          color="primary"
        >
          Organize
        </Button>
      </div>
    );
  } else {
    return (
      <Typography variant="h4" align="center" style={{ marginTop: "20px" }}>
        {match.params.name.toUpperCase()} ({renderNotesLength() || 0})
      </Typography>
    );
  }
}
