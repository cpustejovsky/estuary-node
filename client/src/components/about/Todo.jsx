import React from 'react'
const Todo = ({ complete, text }) => {
  if (complete) {
    return (
      <li className="valign-wrapper">
        <i className="material-icons green-text" style={{ fontSize: "" }}>
          check
        </i>
        {text}
      </li>
    );
  } else {
    return (
      <li className="valign-wrapper">
        <i className="material-icons grey-text" style={{ fontSize: "" }}>
          crop_square
        </i>
        {text}
      </li>
    );
  }
};

export default Todo;
