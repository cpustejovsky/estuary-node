import React from "react";
import ListItem from "@material-ui/core/ListItem";
import { Check, CropSquare } from "@material-ui/icons";
import { green, grey } from "@material-ui/core/colors";

const Todo = ({ complete, text }) => {
  if (complete) {
    return (
      <ListItem className="valign-wrapper">
        <Check style={{ color: green[500] }} />
        {text}
      </ListItem>
    );
  } else {
    return (
      <ListItem className="valign-wrapper">
        {/* <i className="material-icons grey-text" style={{ fontSize: "" }}>
          crop_square
        </i>{" "} */}
        <CropSquare style={{ color: grey[500] }} />
        {text}
      </ListItem>
    );
  }
};

export default Todo;
