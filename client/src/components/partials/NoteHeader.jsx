import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
class Header extends Component {
  render() {
    return (
      <div>
        <button className="btn-small">Inbox</button>
        <button className="btn-small">Projects</button>
        <button className="btn-small">Next</button>
        <button className="btn-small">3rd Party</button>
        <button className="btn-small">Maybe</button>
        <button className="btn-small">Done</button>
        <button className="btn-small">Reference</button>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user }) => {
  return { auth, user };
};

export default connect(mapStateToProps)(Header);
