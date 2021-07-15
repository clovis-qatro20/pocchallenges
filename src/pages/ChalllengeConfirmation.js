import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router";
import { toast } from "react-toastify";
import StyledButton from "../components/StyleButton";
import { getChallenge } from "../store/challenge/actions";

const ChallengeConfirmation = ({
  challenge: { data, submitted },
  getChallenge,
}) => {
  const challengerURL = `${process.env.REACT_APP_BASE_URL}/challenge/${data?.id}`;
  const votingURL = `${process.env.REACT_APP_BASE_URL}/challenge/vote/${data?.id}`;
  const urlWithCode = `${challengerURL}/${data?.code}`;
  const inputRefChallengeURL = useRef(null);
  const inputRefVotingURL = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    !data  && getChallenge(id);
  }, []);

  const copyURL = () => {
    inputRefVotingURL.current.select();
    inputRefVotingURL.current.setSelectionRange(0, 9999);
    document.execCommand("copy");

    toast.success("Tu enlace fue para publico fue copiado con exito!🔥🔥");
  };

  const copyURLwithCode = () => {
    inputRefChallengeURL.current.select();
    inputRefChallengeURL.current.setSelectionRange(0, 9999);
    document.execCommand("copy");

    toast.success("Tu enlace para el retador fue copiado con exito!🔥🔥");
  };

  return (
    <>
      <img src={`${process.env.PUBLIC_URL}/logo.png`} className="logo" />
      <p>
        {submitted
          ? `Gracias por participar empieza a compartir con tus amigos para que voten`
          : `¡Tu reto esta listo! solo tienes que compartir con quien desees retar
        ahora`}
      </p>
      {!submitted && (
        <>
          <h4>Link para el retado</h4>
          <div className="votingLingContainer">
            <textarea
              value={`${data?.owner?.name} te ha retado, atrévete 😉💪 gana esa premio  🎁, sigue el link: ${urlWithCode}`}
              type="text"
              ref={inputRefChallengeURL}
            />
            <StyledButton action={copyURLwithCode} title="Copiar" />
          </div>
        </>
      )}
      <h4>Link para votar</h4>
      <div className="votingLingContainer">
        <textarea
          value={`Te han seleccionado🧐cómo jurado. Decide 🤔 y vota 🗳️si tu amigo cumplió o no el reto: ${votingURL}`}
          type="text"
          ref={inputRefVotingURL}
        />
        <StyledButton action={copyURL} title="Copiar" />
      </div>
    </>
  );
};

const mapStateToProps = ({ Challenge }) => ({ challenge: Challenge });

export default connect(mapStateToProps, { getChallenge })(
  ChallengeConfirmation
);
