import React from "react";
import Todo from "./Todo";
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
        <Todo complete text="CRUD functionality for notes" />
        <Todo complete text="Add customizable destinations for notes" />
        <Todo complete text="Delete UI for notes" />
        <Todo complete text="Create UI for notes" />
        <Todo complete text="Edit UI for notes" />
        <Todo complete text="Add notes by pressing Enter" />
        <Todo text="Add Next Actions List (model, routes, front-end)" />
        <Todo text="destination UI for notes" />
        <Todo text="Set priority for next actions" />
        <Todo text="Drag and drop next actions to show priority" />
        <Todo text="Implement Immediate To-Dos List" />
        <Todo text="Implement Projects List (model, routes, front-end)" />
        <Todo text="Implement Delegated Item List" />
        <Todo text="Implement Deferred file general reference items" />
        <Todo text="Implement Waiting List" />
        <Todo text="Implement Reference List" />
        <Todo text="Implement Someday List" />
        <Todo text="set up tag creation, edit, and display" />
        <Todo text="Add search and filter functionality" />
        <Todo text="Complete unit testing coverage" />
        <Todo text="Connect to Google Calendars via API" />
        <Todo text="Hook up next action steps to to-dos in Habitica" />
        <Todo text="Add functionality to email notes from app with MailGun" />
        <Todo text="Create Chrome Extension for capturing notes" />
        <Todo text="Create Estuary as Desktop App with Electron" />
        <Todo text="Create Estuary as Mobile App with Electron" />
        <Todo text="Use Docker and containers in app" />
        <Todo text="Set up CI/CD" />
        <h5>Maybe To-Dos</h5>
        <Todo text="Refactor in TypeScript" />
        <Todo text="Migrate database to PostgreSQL" />
      </ul>
    </>
  );
}
