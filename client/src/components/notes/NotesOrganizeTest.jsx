import React, { useState } from "react";
import Actionable from "./organize/Actionable";
import NotActionable from "./organize/NotActionable";
export default function NotesOrganizeTest() {
  const [actionableShow, setActionableShow] = useState(true);
  const [notActionableShow, setNotActionableShow] = useState(false);

  const hideActionable = () => setActionableShow(false);
  const showNotActionable = () => setNotActionableShow(true);
  return (
    <div>
      <h1>Organize Notes</h1>
      <Actionable
        show={actionableShow}
        hideActionable={hideActionable}
        showNotActionable={showNotActionable}
      />
      <NotActionable show={notActionableShow} />
    </div>
  );
}
