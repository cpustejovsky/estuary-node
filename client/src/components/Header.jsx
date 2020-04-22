import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <nav>
        <div class="nav-wrapper light-blue accent-4">
          <Link className="brand-logo center" to="/">
            <i className="large material-icons">all_inbox</i> Estuary
          </Link>
          {/* TODO: add mobile navbar */}
          <ul id="nav-mobile" class="left hide-on-med-and-down">
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
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <Link to="/user">User</Link>
            </li>
            <li>
              <Link to="/register">Auth</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
