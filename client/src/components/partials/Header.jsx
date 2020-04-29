import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";
class Header extends Component {
  componentDidMount() {
    let sidenav = document.querySelector("#mobile-nav");
    M.Sidenav.init(sidenav, {});
  }
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
            <li>
              <Link to="/user">
                {this.props.user
                  ? this.props.user.firstName || this.props.user.displayName
                  : this.props.auth.firstName || this.props.auth.displayName}
              </Link>
            </li>
            <li>
              <a href="/logout">Log Out</a>
            </li>
          </>
        );
    }
  }
  render() {
    return (
      <>
        <nav>
          <a href="#" data-target="mobile-nav" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <div className="nav-wrapper light-blue accent-4">
            <Link className="brand-logo center" to="/">
              <i className="large material-icons">all_inbox</i> Estuary
            </Link>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/free-writes">Free Writes</Link>
              </li>
              <li>
                <Link to="/notes">
                  Notes
                </Link>
              </li>
            </ul>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.renderAuth()}
            </ul>
          </div>
        </nav>
        {/* TODO: figure out how to close sidebar on click while using Link tags */}
        <ul className="sidenav" id="mobile-nav">
          <ul id="nav-mobile" className="left">
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/free-writes">Free Writes</Link>
            </li>
            <li>
              <Link to="/notes">Notes</Link>
            </li>
            <hr/>
            {this.renderAuth()}
          </ul>
        </ul>
      </>
    );
  }
}

const mapStateToProps = ({ auth, user }) => {
  return { auth, user };
};

export default connect(mapStateToProps)(Header);
