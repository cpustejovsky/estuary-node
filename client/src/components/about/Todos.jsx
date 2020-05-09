import React from "react";
import Todo from "./Todo";
import { List, Typography } from "@material-ui/core";
export default function Todos() {
  return (
    <>
      <hr />
      <Typography variant="h5">To-Dos</Typography>
      <List>
        <Todo complete text="CRUD functionality for User" />
        <Todo complete text="Replace EJS with React on Front-End" />
        <Todo complete text="Authorize users through Google and GitHub OAuth" />
        <Todo complete text="Refactor notes and freewrites as subdocs" />
        <Todo complete text="CRUD functionality for notes" />
        <Todo complete text="Add customizable destinations for notes" />
        <Todo complete text="Delete UI for notes" />
        <Todo complete text="Create UI for notes" />
        <Todo complete text="Edit UI for notes" />
        <Todo complete text="Add notes by pressing Enter" />
        <Todo complete text="Implement Next Actions List" />{" "}
        <Todo complete text="Implement Immediate To-Dos List" />
        <Todo complete text="Implement Someday List" />
        <Todo complete text="Implement Waiting List" />
        <Todo complete text="Implement Reference List" />
        <Todo complete text="Replace materialize-css with Material-UI" />
        <Todo complete text="replace class-based with functional components" />
        <Todo complete text="write up functional components to Redux" />
        <Todo complete text="Refactor note model for different categories" />
        <Todo complete text="Implement Projects model and routes" />
        <Todo text="Refactor Organization flow (full GTD process, yes or no)" />
        <Todo complete subtodo text="Simulate multi-step form" />
        <Todo complete subtodo text='Set up "Is it actionable? No" flow' />
        <Todo complete subtodo text='...2 minutes? Yes" flow' />
        <Todo complete subtodo text='...2 minutes? No" flow' />
        <Todo subtodo text='Set up "Is this a Project? Yes" flow' />
        <Todo subtodo text='Set up "...apart of current project? Yes" flow' />
        <Todo subtodo text='Set up "...apart of current project? No" flow' />
        <Todo subtodo text="Set priority for next actions" />
        <Todo subtodo text="Drag and drop next actions to show priority" />
        <Todo subtodo text="set up tag creation, edit, and display" />
        <Todo subtodo text="Style multi-step form" />
        <Todo text="Add search and filter functionality" />
        <Todo subtodo text="Set up for tags" />
        <Todo subtodo text="Set up for content/title" />
        <Todo text="add performance benchmarks, etc for MongoDB" />
        <Todo text="add performance benchmarks, etc for Node" />
        <Todo text="add performance benchmarks, etc for React" />
        <Todo text="Make components re-usable (will need subtodos)" />
        <Todo text="Mocha unit testing" />
        <Todo text="Connect to Google Calendars via API" />
        <Todo text="Hook up next action steps to to-dos in Habitica" />
        <Todo text="Add functionality to email notes from app with MailGun" />
        <Todo text="Create Chrome Extension for capturing notes" />
        <Todo text="Create Estuary as Desktop App with Electron" />
        <Todo text="Create Estuary as Mobile App with Electron" />
        <Todo text="Use Docker and containers in app" />
        <Todo text="Set up CI/CD" />
        <Typography variant="h6">Maybe To-Dos</Typography>
        <Todo text="Refactor in TypeScript" />
        <Todo text="Migrate database to PostgreSQL" />
      </List>
      <hr />
    </>
  );
}
