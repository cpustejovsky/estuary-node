import React, { Component } from "react";

export default class FreeWritesNew extends Component {
  render() {
    return (
      <div>
        <h1>Free Write</h1>
        <p>Enter any text that comes to mind.</p>
        <p>
          If you want to save something as a note, press
          <strong>Enter</strong> and then begin your note with
          <strong>#n</strong> or <strong>#N</strong>.
        </p>
        <p>
          When you're finished with your note, press <strong>Enter</strong>{" "}
          again and continue with your free-write.
        </p>
        <p>
          When done, press Submit and both your free-write and any notes you
          have taken will be saved.
        </p>
      </div>
    );
  }
}
