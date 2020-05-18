import React from "react";
import { Link, Button } from "@material-ui/core";

export default function Login() {
  return (
    <div className="center">
      <h2>Howdy!</h2>
      <p>Sign in or Sign up with Google.</p>
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
    </div>
  );
}
