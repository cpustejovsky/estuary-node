import React, { useState } from "react";
import Actionable from "./Actionable";
import NotActionable from "./NotActionable";
import TwoMinutes from "./TwoMinutes"
export default function NotesOrganizeTest() {
  const [actionableShow, setActionableShow] = useState(true);
  const [notActionableShow, setNotActionableShow] = useState(false);
  const [twoMinutesShow, setTwoMinutesShow] = useState(false);

  const hideActionable = () => setActionableShow(false);
  const showNotActionable = () => setNotActionableShow(true);
  const showTwoMinutes = () => setTwoMinutesShow(true);
  return (
    <div>
      <h1>Organize Notes</h1>
      <Actionable
        show={actionableShow}
        hideActionable={hideActionable}
        showNotActionable={showNotActionable}
        showTwoMinutes={showTwoMinutes}
      />
      <NotActionable show={notActionableShow} />
      <TwoMinutes show={twoMinutesShow} />
    </div>
  );
}
