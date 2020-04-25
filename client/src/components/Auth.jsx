import React, { Component } from "react";

export default class extends Component {
  render() {
    return (
      <div className="center">
        <h2>Howdy!</h2>
        <p>Sign in or Sign up with Google or GitHub.</p>
        <div>
          <a href="/auth/google" className="btn teal accent-4 btn-large button button__auth">
            <i className="button__text__left fab fa-google"></i>Sign in with Google
          </a>
        </div>
        <div>
          <a href="/auth/github" className="btn teal accent-4 btn-large button button__auth">
          <i className="button__text__left fab fa-github"></i>Sign in with GitHub
          </a>
        </div>
      </div>
    );
  }
}
