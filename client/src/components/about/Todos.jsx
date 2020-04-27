import React from "react";
import Todo from "./Todo"
export default function Todos() {
  return (
    <>
      <h4>To-Dos</h4>
      <ul>
        <Todo complete text="Email and/or text user with notes" />
        <Todo
          complete
          text="Add CRUD functionality to User (Update and Destroy)"
        />
        <Todo
          complete
          text="Add CRUD functionality to User (Update and Destroy)"
        />
        <Todo complete text="Add Mocha testing framework to app" />
        <Todo complete text="Replace EJS with React on Front-End" />
        <Todo
          complete
          text="Authorize users through Google and GitHub OAuth APIs"
        />
        <Todo
          complete
          text="Refactor notes and freewrites as subdocs related to User model"
        />
        <Todo text="CRUD functionality for notes"/>
        <Todo text="Set priority for notes"/>
        <Todo text="Add customizable tags for notes"/>
        <Todo text="Be able to add multiple notes at a time"/>
        <Todo text="Drag and drop notes"/>
        <Todo text="Add Next Actions List"/>
        <Todo text="Create a system to file general reference items"/>
        <Todo text="Complete unit testing coverage"/>
        <Todo text="Add search and filter functionality"/>
        <Todo text="Connect to Google Calendars via API"/>
        <Todo text="Hook up next action steps to to-dos in Habitica"/>
        <Todo text="Add functionality to email notes from app with MailGun"/>
        <Todo text="Turn Estuary in Electron App"/>
        <Todo text="Refactor in TypeScript"/>
      </ul>
    </>
  );
}
