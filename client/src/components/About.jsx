import React from "react";
export default function About() {
  return (
    <div className="row site__about">
      <div className="col m8 offset-m2">
        <h3 className="">What is Estuary?</h3>
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
          That would have the dual benefit of cementing these practices for me
          and also building a robust app that I can proudly show off in my
          portfolio.
        </p>
        <h4>Have any ideas for improvements?</h4>
        <p>
          Here's the source code:{" "}
          <a href="https://github.com/cpustejovsky/estuary">
            https://github.com/cpustejovsky/estuary
          </a>
          . Feel free to leave a comment or even make a pull request if you're
          so inclined (check my current list of to-dos first).
        </p>
        <h4>To-Dos</h4>
        <ul>
          <li>
            <del>Email and/or text user with notes</del>
          </li>
          <li>
            <del>Add CRUD functionality to User</del>
            <ul>
              <li>
                <del>Update</del>
              </li>
              <li>
                <del>Destroy</del>
              </li>
            </ul>
          </li>
          <li>
            <del>Add Mocha testing framework to app</del>
          </li>
          <li>
            <del>Remove document upload feature</del>
          </li>
          <li>
            <del>Replace EJS with React on Front-End</del>
          </li>
          <li>
            <del>
              Authorize users through Google API instead of username and
              password
            </del>
          </li>
          <li>Clean up note selector function</li>
          <li>Add avatar image to user profiles</li>
          <li>Be able to add multiple notes at a time</li>
          <li>Add Next Actions List</li>
          <li>Set priority for notes</li>
          <li>Add customizable tags for notes</li>
          <li>Connect to Google Calendars via API</li>
          <li>Add sufficient unit testing</li>
          <li>Complete unit testing coverage</li>
          <li>Refactor in TypeScript</li>
          <li>Add search and filter functionality</li>
          <li>Add functionality to email notes to app</li>
          <li>
            Create a system to file general reference items (potentially connect
            with Toby)
          </li>
          <li>
            Hook up next action steps to to-dos in Habitica (
            <a href="https://habitica.com/apidoc/">Habitica API</a>)
          </li>
          <li>Turn Estuary in Electron App</li>
        </ul>
      </div>
    </div>
  );
}
