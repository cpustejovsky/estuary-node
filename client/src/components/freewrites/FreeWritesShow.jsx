import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { fetchFreeWrites } from "../../actions";
import Loader from "../partials/Loader";
import { Button, Card, CardContent, Typography } from "@material-ui/core";

class FreeWriteShow extends Component {
  componentDidMount() {
    this.props.fetchFreeWrites();
  }
  renderFreeWrites() {
    if (this.props.freeWrites.length > 0) {
      return this.props.freeWrites.map(({ content, _id, title }) => {
        return (
          <Card key={_id} raised className="margin-top">
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
  }
  render() {
    console.log(this.props.freeWrites);
    //TODO: what is a good way to deal with auth redirects?
    if (this.props.auth || this.props.user) {
      return (
        <div>
          <div className="button button__free-writes">
            <Typography variant="h4" className="button__text__left">
              Your Free Writes
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
          {this.renderFreeWrites()}
        </div>
      );
    } else if (this.props.auth === null && this.props.user === null) {
      return <Loader />;
    } else if (!this.props.auth && !this.props.auth) {
      return <>{this.props.history.push("/auth")}</>;
    }
  }
}

const mapStateToProps = ({ auth, user, notes, freeWrites }) => {
  return { auth, user, notes, freeWrites };
};

export default connect(mapStateToProps, { fetchFreeWrites })(FreeWriteShow);
