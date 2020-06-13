import React from "react";
import axios from "axios";
import { connect, useSelector } from "react-redux";
window.axios = axios;

function Test() {
  const user = useSelector((state) => state.user);
  return (
    <div className="center">
      <h1>Test Page</h1>
      <p>{user.emailUpdates}</p>
      <p>The axios library is loaded to test routes on this application.</p>
    </div>
  );
}

export default connect(null, {})(Test);
