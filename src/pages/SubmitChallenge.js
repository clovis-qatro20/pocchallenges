import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getChallenge } from "../store/challenge/actions";
import { Redirect, useParams } from "react-router-dom";
import StyledButton from "../components/StyleButton";
import moment from "moment";
import { rejectChallenge } from "../store/challenge/actions";

const SubmitChallenge = ({
  getChallenge,
  rejectChallenge,
  challenge = {},
  history,
}) => {
  const { id, code = null } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { owner, code: challengeCode, description, price } = challenge || {};

  useEffect(() => {
    getChallenge(id);
  }, []);

  useEffect(() => {
    challenge.challenger?.name;
  }, [challenge]);

  const onEnterChallenge = () => {
    history.push(`/challenge/submit/${id}/${name}/${email}`);
  };

  const onRejectChallenge = () => {
    rejectChallenge();
  };

  const renderPulicMessage = () => (
    <p>
      Si eres el retador, pide a tu amigo que te comparta el enlace para el
      retador en vez del publico
    </p>
  );

  const renderChallengerMessage = () => (
    <>
      <div className="inputRow">
        <label>Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div className="inputRow">
        <label>Correo</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <StyledButton
        title="Aceptar"
        action={onEnterChallenge}
        customClass="submit-button"
      />
      <StyledButton
        title="Rechazar"
        action={onRejectChallenge}
        customClass="submit-button danger"
      />
    </>
  );

  if (challenge)
    return (
      <>
        {challenge?.refused && (
          <Redirect
            to={`/challenge/vote/${id}`}
          />
        )}
        <img src={`${process.env.PUBLIC_URL}/logo.png`} className="logo" />
        <div>
          <div className="descriptionContainer">
            <p>{owner?.name} te reto a:</p>
            <p>{description}</p>
          </div>
          <div className="priceContainer">
            <p>El premio</p>
            <p>{price}</p>
          </div>
          <p>
            A continuación sube un video tuyo cumpliendo el reto. Dale! Echale
            ganas y gana el reto
          </p>
          <p>Ingresa antes del</p>
          <p>{moment(challenge?.expires).format("LL")}</p>
        </div>
        {challengeCode === Number(code)
          ? renderChallengerMessage()
          : renderPulicMessage()}
      </>
    );

  return null;
};

const mapStateToProps = ({ Challenge }) => ({
  challenge: Challenge.data,
});

export default connect(mapStateToProps, { getChallenge, rejectChallenge })(
  SubmitChallenge
);
