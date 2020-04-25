import React from "react";
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <div className="site__landing">
      <h1>Estuary</h1>
      <strong>Where all your streams of thought converge.</strong>
      <p>
        <Link to="/about" className="btn teal accent-4">
          Learn More
        </Link>
      </p>
    </div>
  );
}
