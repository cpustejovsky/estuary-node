import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

export default function Landing() {
  return (
    <div className="site__landing">
      <h2>Estuary</h2>
      <strong>Where all your streams of thought converge.</strong>
      <p>
        <Button variant="contained">
          <Link to="/about">
            Learn More
          </Link>
        </Button>
      </p>
    </div>
  );
}
