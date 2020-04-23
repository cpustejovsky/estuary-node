import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  renderAuth() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <Link to="/auth">Log in</Link>
          </li>
        );
      default:
        return (
          <>
            {" "}
            <li>
              <a href="/logout">Log Out</a>
            </li>
          </>
        );
    }
  }
  render() {
    console.log(this.props.auth)
    return (
      <nav>
        <div className="nav-wrapper light-blue accent-4">
          <Link className="brand-logo center" to="/">
            <i className="large material-icons">all_inbox</i> Estuary
          </Link>
          {/* TODO: add mobile navbar */}
          <ul id="nav-mobile" className="left hide-on-med-and-down">
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/free-writes">Free Writes</Link>
            </li>
            <li>
              <Link to="/notes">Notes</Link>
            </li>
          </ul>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/user">User</Link>
            </li>
            {this.renderAuth()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
