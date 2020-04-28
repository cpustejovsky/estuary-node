import React, { Component } from "react";

export default class Note extends Component {
  state = {
    show: false,
  };
  toggleDelete() {
    this.setState({ show: !this.state.show });
  }
  renderDelete(show, id) {
    if (show && id === this.props.id) {
      return (
        <>
          <p>Are you sure?</p>
          <a className="green-text">Yes</a>
          <a onClick={() => this.toggleDelete()} >No</a>
        </>
      );
    } else {
      return null;
    }
  }
  render() {
    return (
      <div>
        <div key={this.props.id} className="card darken-1">
          <div className="card-content">
            <p>{this.props.content}</p>
          </div>
          <div className="card-action">
            <a>Edit</a>
            <a onClick={() => this.toggleDelete()} className="red-text">
              Delete
            </a>
            {this.renderDelete(this.state.show, this.props.id)}
          </div>
        </div>
      </div>
    );
  }
}
