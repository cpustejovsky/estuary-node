import React, { Component } from "react";
import { Link, Button, Typography } from "@material-ui/core";

export default class extends Component {
  render() {
    return (
      <div className="center">
        <h2>Howdy!</h2>
        <p>Sign in or Sign up with Google or GitHub.</p>
        <div>
          <Button
            fullWidth
            component={Link}
            href="/auth/google"
            variant="contained"
            color="primary"
            size="large"

          >
            <i className="button__text__left fab fa-google"></i>Sign in with
            Google
          </Button>
        </div>
        <div className="margin-top">
          <Button
            fullWidth
            component={Link}
            href="/auth/github"
            variant="contained"
            color="primary"
            size="large"
          >
            <i className="button__text__left fab fa-github"></i>Sign in with
            GitHub
          </Button>
        </div>
      </div>
    );
  }
}
