import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@material-ui/core";

export default function Landing() {
  return (
    <div className="site__landing">
      <h2>Estuary</h2>
      <strong>Where all your streams of thought converge.</strong>
      <p>
        <Button component={RouterLink} to="/about" variant="contained" color="primary">
          Learn More
        </Button>
      </p>
    </div>
  );
}
