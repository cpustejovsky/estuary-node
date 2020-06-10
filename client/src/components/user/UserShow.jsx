import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";

function User() {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const [stats, setStats] = useState({});
  const fetchNotestatistics = async () => {
    let response = await axios.get("/api/notes/stats");
    setStats(response.data);
  };
  useEffect(() => {
    fetchNotestatistics();
  }, []);
  const renderStatistics = (stats) =>
    Object.keys(stats).map((key) => (
      <li>
        {key.toUpperCase()}: {stats[key]}
      </li>
    ));

  renderStatistics(stats);
  if (!auth && !user) {
    return "Loading";
  } else if (user) {
    return (
      <div>
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
            <hr />
            <Typography gutterBottom variant="h5">
              Note Statistics
            </Typography>
            <ul>{renderStatistics(stats)}</ul>
          </CardContent>
          <CardActions className="card-action">
            <Button component={RouterLink} to="/user/edit">
              Edit Profile
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
export default connect(null, {})(User);
