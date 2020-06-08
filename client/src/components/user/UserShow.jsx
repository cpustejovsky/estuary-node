import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";

export default function User() {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  if (!auth && !user) {
    return "Loading";
  } else if (user) {
    return (
      <div className="site">
        <Card raised>
          <CardContent className="card-content">
            <Typography gutterBottom variant="h4">
              {user.displayName || user.firstName} {user.lastName}
            </Typography>
            <p>
              <strong>Email Address: </strong>
              {user.email}
            </p>
            <p>
              <strong>Daily Email Updates: </strong>
              {user.emailUpdates === true ? "On" : "Off"}
            </p>
          </CardContent>
          <CardActions className="card-action">
            <Button component={RouterLink} to="/user/edit">
              Edit Profile
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  } else if (auth) {
    return (
      <Card raised>
        <CardContent className="card-content">
          <Typography gutterBottom variant="h4" component="h2">
            {auth.displayName || auth.firstName} {auth.lastName}
          </Typography>
          <p>
            <strong>Email Address: </strong>
            {auth.email}
          </p>
          <p>
            <strong>Daily Email Updates: </strong>
            {auth.emailUpdates === true ? "On" : "Off"}
          </p>
        </CardContent>
        <CardActions className="card-action">
          <Button component={RouterLink} to="/user/edit">
            Edit Profile
          </Button>
        </CardActions>
      </Card>
    );
  }
}
