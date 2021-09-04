import React, { useState, useRef, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { Redirect, useParams } from "react-router";
import { toast } from "react-toastify";
import { LayoutContext } from "../components/Layout";
import StyledButton from "../components/StyleButton";
import { getChallenge } from "../store/challenge/actions";

const ChallengeConfirmation = ({
  challenge: { data, submitted },
  getChallenge,
}) => {
  const challengerURL = `${process.env.REACT_APP_BASE_URL}/challenge/${data?.id}`;
  const votingURL = `${process.env.REACT_APP_BASE_URL}/challenge/vote/${data?.id}`;
  const urlWithCode = `${challengerURL}/${data?.code}`;
  const { createPopup } = useContext(LayoutContext);
  const inputRefChallengeURL = useRef(null);
  const inputRefVotingURL = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    !data && getChallenge(id);
    createPopup({
      text: "Ayudanos a mejorar, nos encantaría conocer tu feedback sobre esta idea para que un día podamos llevar este proyecto a la relidad",
      url: "https://docs.google.com/forms/d/e/1FAIpQLSeIR2t6qv5fBe5tpRi0-cx6KQdax4_Po7BuGusl7SWeOGG34g/viewform?usp=sf_link",
    });
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
