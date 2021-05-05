import React from "react";

const StyledButton = ({ title, action }) => (
  <button onClick={action} className='primary'>{title}</button>
);

export default StyledButton;
