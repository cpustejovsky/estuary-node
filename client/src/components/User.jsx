import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class User extends Component {
  render() {
    console.log(this.props.auth);
    if (!this.props.auth) {
      return "Loading";
    } else {
      return (
        <div>
        <h3>{this.props.auth.displayName || this.props.auth.firstName} {this.props.auth.lastName}</h3>
        <p><strong>Email Address: </strong>{this.props.auth.email}</p>
        <p><strong>Daily Email Updates: </strong>{this.props.auth.emailUpdates === true ? "On": "Off"}</p>
        <Link className="btn" to="/user/edit">Edit Profile</Link>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(User);
