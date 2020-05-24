import React, { useState } from "react";
import Todo from "./Todo";
import {
  Grid,
  List,
  Typography,
  Collapse,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
export default function Todos() {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <Grid container justify="space-between">
        {" "}
        <Grid item>
          <Typography variant="h5" style={{ marginTop: "5%" }}>
            To-Dos
          </Typography>
        </Grid>
        <Grid item>
          {" "}
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={checked}
                onChange={() => {
                  setChecked(!checked);
                }}
              />
            }
            label={checked ? "Hide Completed To-Dos" : "Show Completed To-Dos"}
          />
        </Grid>
      </Grid>
      <List>
        <Collapse in={checked}>
          <Todo complete text="CRUD functionality for User" />
          <Todo complete text="Replace EJS with React on Front-End" />
          <Todo
            complete
            text="Authorize users through Google and GitHub OAuth"
          />
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
          <Todo
            complete
            text="replace class-based with functional components"
          />
          <Todo complete text="write up functional components to Redux" />
          <Todo complete text="Refactor note model for different categories" />
          <Todo complete text="Implement Projects model and routes" />
          <Todo
            complete
            text="Refactor Organization flow (full GTD process, yes or no)"
          />
          <Todo complete subtodo text="Simulate multi-step form" />
          <Todo complete subtodo text='Set up "Is it actionable? No" flow' />
          <Todo complete subtodo text='Will it take 2 minutes? Yes" flow' />
          <Todo complete subtodo text='Will it take 2 minutes? No" flow' />
          <Todo complete subtodo text='Set up "Is this a Project? Yes" flow' />
          <Todo
            complete
            subtodo
            text='Set up "apart of current project? Yes" flow'
          />
          <Todo
            complete
            subtodo
            text='Set up "apart of current project? No" flow'
          />
          <Todo
            complete
            text="create routes, actions, reducers for categories"
          />
          <Todo complete text="refactor view for categories" />
          <Todo
            complete
            text="set up routes, actions, reducers for project completed property"
          />
          <Todo complete text="refactor view for project done" />
          <Todo
            complete
            text="set up routes, actions, reducers for note completed property"
          />
          <Todo complete text="refactor view for note done" />
          <Todo complete text="Connect to Google Calendars via API" />
          <Todo complete subtodo text="Hook up app to Google Calendar API" />
          <Todo complete subtodo text="Set up event creation route" />
          <Todo
            complete
            subsubtodo
            text="Check if event already exists there"
          />
          <Todo
            complete
            subsubtodo
            text="If event, send back preexisting event in error message along with new event"
          />
          <Todo
            complete
            subsubtodo
            text="If !event, create new event without attaching event"
          />
          <Todo complete subtodo text="create view for event creation" />
        </Collapse>
        <Todo text="Mocha unit testing" />
        <Todo complete subtodo text="Splitting out routes and controllers" />
        <Todo subtodo text="set up dummy data and tests" />
        <Todo subsubtodo text="user" />
        <Todo subsubtodo text="projects" />
        <Todo subsubtodo text="notes" />
        <Todo subsubtodo text="free writes" />
        <Todo text="Add search and filter functionality" />
        <Todo subtodo text="Set priority for next actions" />
        <Todo subtodo text="Drag and drop next actions to show priority" />
        <Todo subtodo text="set up tag creation, edit, and display" />
        <Todo subtodo text="Set search up for tags" />
        <Todo subtodo text="Set search up for content/title" />
        <Todo text="Add functionality to email notes from app with MailGun" />
        <Todo text="Performance" />
        <Todo subtodo text="add performance benchmarks, etc for MongoDB" />
        <Todo subtodo text="clean up models and queries" />
        <Todo subtodo text="add performance benchmarks, etc for Node" />
        <Todo subtodo text="add performance benchmarks, etc for React" />
        <Todo text="Make components re-usable" />
        <Todo subtodo text="notes/" />
        <Todo subtodo text="notes/organize" />
        <Todo subtodo text="partials/" />
        <Todo subtodo text="freewrites/" />
        <Todo subtodo text="projects/" />
        <Todo subtodo text="user/" />
        <Todo subtodo text="components/" />
        <Todo text="Styling and Content" />
        <Todo subtodo text="decide on colors" />
        <Todo
          subtodo
          text={
            <>
              <a
                href="https://cssguidelin.es/"
                target="_blank"
                rel="noreferrer noopener"
              >
                follow CSS Guidelines
              </a>
            </>
          }
        />
        <Todo subtodo text="Enforce BEM methodology" />
        <Todo subtodo text="Consistently apply styling across app" />{" "}
        <Todo subsubtodo text="notes/" />
        <Todo subsubtodo text="notes/organize" />
        <Todo subsubtodo text="partials/" />
        <Todo subsubtodo text="freewrites/" />
        <Todo subsubtodo text="projects/" />
        <Todo subsubtodo text="user/" />
        <Todo subsubtodo text="components/" />
        <Todo subtodo text="create an informative and engaging landing page" />
        <Todo text="Hook up next action steps to to-dos in Habitica" />
        <Todo text="Create Chrome Extension for capturing notes" />
        <Todo text="Create Estuary as Desktop App with Electron" />
        <Todo text="Create Estuary as Mobile App with Electron" />
        <Todo text="Use Docker and containers in app" />
        <Todo text="Set up CI/CD" />
        <Typography variant="h6">Maybe To-Dos</Typography>
        <Todo text="Refactor in TypeScript" />
        <Todo text="Migrate database to PostgreSQL" />
      </List>
    </>
  );
}
