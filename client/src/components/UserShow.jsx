import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";

class User extends Component {
  render() {
    if (!this.props.auth && !this.props.user) {
      return "Loading";
    } else if (this.props.user) {
      return (
        <div>
          <h3>
            {this.props.user.displayName || this.props.user.firstName}{" "}
            {this.props.user.lastName}
          </h3>
          <p>
            <strong>Email Address: </strong>
            {this.props.user.email}
          </p>
          <p>
            <strong>Daily Email Updates: </strong>
            {this.props.user.emailUpdates === true ? "On" : "Off"}
          </p>
          <Link className="btn" to="/user/edit">
            Edit Profile
          </Link>
        </div>
      );
    } else if (this.props.auth) {
      return (
        <div>
          <h3>
            {this.props.auth.displayName || this.props.auth.firstName}{" "}
            {this.props.auth.lastName}
          </h3>
          <p>
            <strong>Email Address: </strong>
            {this.props.auth.email}
          </p>
          <p>
            <strong>Daily Email Updates: </strong>
            {this.props.auth.emailUpdates === true ? "On" : "Off"}
          </p>
          <Link className="btn" to="/user/edit">
            Edit Profile
          </Link>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ auth, user }) => {
  return { auth, user };
};

export default connect(mapStateToProps, { fetchUser })(User);
