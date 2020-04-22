import React from "react";
import { Link } from "react-router-dom";
export default function About() {
  return (
    <div className="row site__about">
      <div className="col m8 offset-m2">
        <h1 className="center">What is Estuary?</h1>
        <p>
          Thanksgiving weekend 2019, I started reading{" "}
          <a
            href="https://www.amazon.com/Getting-Things-Done-Stress-Free-Productivity/dp/0143126563"
            target="_blank"
            rel="noreferrer"
          >
            Getting Things Done by David Allen
          </a>
          . During my plane rides, I had the idea to turn my note taking app,
          Estuary, into an app that could facilitate the GTD process.
        </p>
        <p>
          That would have the dual benefit of cementing these practices for me
          and also building a robust app that I can proudly show off in my
          portfolio.
        </p>
        {/* <h3>What can Estuary do so far?</h3>
        <p>Well, you can do the following:</p>
        <ul>
          <li>Register and create a user</li>
          <li>Log in and log out of your account</li>
          <li>Create free writes or notes that save to the database</li>
          <li>
            Take notes during your free write by hitting <strong>enter</strong>{" "}
            beginning the new line with <strong>#n</strong> or{" "}
            <strong>#N</strong> and then hitting <strong>enter</strong> again
          </li>
          <li>
            email a list of your notes to yourself at the push of a button
          </li>
          <li>
            set the option to receive email updates of your notes every day at
            6:00am EST
          </li>
        </ul>
        <h3>What's under the hood?</h3>
        <p>Here's what running Estuary behind the scenes:</p>
        <ul>
          <li>EJS templates (no fancy Front-End framework yet)</li>
          <li>BootStrap and some custom CSS</li>
          <li>Express for the routing</li>
          <li>NodeJS for the server-side logic</li>
          <li>MongoDB and Mongoose for Database and ORM, respectively</li>
          <li>Heroku and GitHub for deployment</li>
        </ul> */}
        <h3>Have any ideas for improvements?</h3>
        <p>
          Here's the source code:{" "}
          <a href="https://github.com/cpustejovsky/estuary">
            https://github.com/cpustejovsky/estuary
          </a>
          . Feel free to leave a comment or even make a pull request if you're
          so inclined.
        </p>
      </div>
    </div>
  );
}
