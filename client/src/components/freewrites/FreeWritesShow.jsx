import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { fetchFreeWrites } from "../../actions";
import Loader from "../partials/Loader";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import _ from "lodash";

function FreeWriteShow({ fetchFreeWrites, history }) {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const freeWrites = useSelector((state) => Object.values(state.freeWrites));
  useEffect(() => {
    fetchFreeWrites();
  }, []);
  const renderFreeWrites = () => {
    if (!_.isEmpty(freeWrites)) {
      return freeWrites.map(({ content, _id, title }) => {
        return (
          <Card key={_id} raised className="margin-top freewrites">
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {content}
              </Typography>
            </CardContent>
          </Card>
        );
      });
    }
  };

  //TODO: what is a good way to deal with auth redirects?
  if (auth || user) {
    return (
      <div >
        <div className="button button__free-writes">
          <Typography variant="h4" className="button__text__left">
            Free Writes
          </Typography>
          <Button
            component={RouterLink}
            to="/free-writes/new"
            size="large"
            variant="contained"
            color="primary"
          >
            New Free Write
          </Button>
        </div>
        {renderFreeWrites()}
      </div>
    );
  } else if (auth === null && user === null) {
    return <Loader />;
  } else if (!auth && !auth) {
    return <>{history.push("/login")}</>;
  }
}

export default connect(null, { fetchFreeWrites })(FreeWriteShow);
