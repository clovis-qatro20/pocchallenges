import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import StyledButton from "../components/StyleButton";

const CreateChallengeConfirmation = ({ challenge }) => {
  const challengeURL = `${process.env.REACT_APP_BASE_URL}/challenge?id=${challenge.data?.id}`;

  const copyURL = () => {
    navigator.clipboard.writeText(challengeURL);
    toast.success("Tu enlace fue para publico fue copiado con exito!🔥🔥");
  };

  const copyURLwitCode = () => {
    const url = `${challengeURL}&code=${challenge.data?.code}`;
    navigator.clipboard.writeText(url);
    toast.success("Tu enlace para el retador fue copiado con exito!🔥🔥");
  };

  console.log(challengeURL);
  return (
    <>
      {!challenge.data && <Redirect to="/" />}
      <img src={`${process.env.PUBLIC_URL}/logo.png`} className="logo" />
      <p>
        ¡Tu reto esta listo! solo tienes que compartir con quien desees retar
        ahora
      </p>
      <StyledButton action={copyURLwitCode} title="enlace para el retado" />
      <StyledButton action={copyURL} title="enlace para el publico" />
    </>
  );
};

const mapStateToProps = ({ Challenge }) => ({ challenge: Challenge });

export default connect(mapStateToProps, {})(CreateChallengeConfirmation);
