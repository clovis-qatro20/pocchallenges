import React from "react";

const StyledButton = ({ title, action, disabled, customClass='' }) => (
  <button disabled={disabled} onClick={action} className={`primary ${customClass}`}>{title}</button>
);

export default StyledButton;
