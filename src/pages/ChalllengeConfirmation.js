import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import StyledButton from "../components/StyleButton";

const ChallengeConfirmation = ({ challenge: { data, submitted } }) => {
  const challengerURL = `${process.env.REACT_APP_BASE_URL}/challenge?id=${data?.id}`;
  const votingURL = `${process.env.REACT_APP_BASE_URL}/challenge/vote?id=${data?.id}`;

  const copyURL = () => {
    navigator.clipboard.writeText(votingURL);
    toast.success("Tu enlace fue para publico fue copiado con exito!🔥🔥");
  };

  const copyURLwitCode = () => {
    const url = `${challengerURL}&code=${data?.code}`;
    navigator.clipboard.writeText(url);
    toast.success("Tu enlace para el retador fue copiado con exito!🔥🔥");
  };

  return (
    <>
      {/* {!data && <Redirect to="/" />} */}
      <img src={`${process.env.PUBLIC_URL}/logo.png`} className="logo" />
      <p>
        {submitted
          ? `Gracias por participar empieza a compartir con tus amigos para que voten`
          : `¡Tu reto esta listo! solo tienes que compartir con quien desees retar
        ahora`}
      </p>
      {!submitted && (
        <StyledButton action={copyURLwitCode} title="enlace para el retado" />
      )}
      <StyledButton action={copyURL} title="enlace para el publico" />
    </>
  );
};

const mapStateToProps = ({ Challenge }) => ({ challenge: Challenge });

export default connect(mapStateToProps, {})(ChallengeConfirmation);
