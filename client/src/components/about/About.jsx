import React from "react";
import Todos from "./Todos";
import MailChimpForm from "./MailChimpForm";
import { Grid, Typography } from "@material-ui/core";

export default function About() {
  return (
    <Grid className="site site__about">
      <Typography variant="h4">What is Estuary?</Typography>
      <p>
        Thanksgiving weekend 2019, I started reading{" "}
        <a
          href="https://www.amazon.com/Getting-Things-Done-Stress-Free-Productivity/dp/0143126563"
          target="_blank"
          rel="noreferrer noopener"
        >
          Getting Things Done by David Allen
        </a>
        . During my plane rides, I had the idea to turn my note taking app,
        Estuary, into an app that could facilitate the GTD process.
      </p>
      <p>
        That would have the dual benefit of cementing these practices for me and
        also building a robust app that I can proudly show off in my portfolio.
      </p>
      <hr />
      <Typography variant="h5">Have any ideas for improvements?</Typography>
      <p>
        Here's the source code:{" "}
        <a href="https://github.com/cpustejovsky/estuary">
          https://github.com/cpustejovsky/estuary
        </a>
        . Feel free to leave a comment or even make a pull request if you're so
        inclined (check my current list of to-dos first).
      </p>
      <Typography variant="h6">Sign up to follow Estuary's progress</Typography>
      <MailChimpForm />
      <Todos />
    </Grid>
  );
}
