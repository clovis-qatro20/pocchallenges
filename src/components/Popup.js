import React from "react";
import StyledButton from "./StyleButton";

const Popup = ({ content, setShowPopup }) => (
  <div className="modal">
    <div className="modalContainer">
      <span onClick={() => setShowPopup(false)}>[x]</span>
      <p>{content.text}</p>
      <a href={content.url} rel="noreferrer" target="_blank">
        <StyledButton title="Responder Encuesta" />
      </a>
    </div>
  </div>
);

export default Popup;
