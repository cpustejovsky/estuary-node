import React from "react";
import axios from "axios";
window.axios = axios;
export default function Test() {
  return (
    <div className="center">
      <h1>Test Page</h1>
      <p>The axios library is loaded to test routes on this application.</p>
    </div>
  );
}
