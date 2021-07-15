import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getChallenge } from "../store/challenge/actions";
import { useParams } from "react-router-dom";
import StyledButton from "../components/StyleButton";

const SubmitChallenge = ({ getChallenge, challenge, history }) => {
  const { id, code = null } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { owner, code: challengeCode, description, price } = challenge || {};

  useEffect(() => {
    getChallenge(id);
  }, []);

  const onEnterChallenge = () => {
    history.push(`/challenge/submit/${id}/${name}/${email}`);
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
        title="entrar al reto"
        action={onEnterChallenge}
        customClass="submit-button"
      />
    </>
  );

  if (challenge)
    return (
      <>
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

export default connect(mapStateToProps, { getChallenge })(SubmitChallenge);
