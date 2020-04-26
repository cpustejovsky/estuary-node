import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchFreeWrites } from "../actions";
import Loader from "./Loader";

class FreeWriteShow extends Component {
  componentDidMount() {
    this.props.fetchFreeWrites();
  }
  renderFreeWrites() {
    if (this.props.freeWrites.length > 0) {
      return this.props.freeWrites.map(({ content, _id, title }) => {
        return (
          <div key={_id} className="card darken-1">
            <div className="card-content">
              <span class="card-title">{title}</span>
              <p>{content}</p>
            </div>
          </div>
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
            <h4 className="button__text__left">Your Free Writes</h4>
            <Link to="free-writes/new" className="btn-large green">
              New Free Write
            </Link>
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
