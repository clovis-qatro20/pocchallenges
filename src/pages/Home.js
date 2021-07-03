import React from "react";
import { connect } from "react-redux";
import { resetChallenge } from "../store/challenge/actions";
import StyledButton from "../components/StyleButton";

const Home = ({ history, resetChallenge }) => {
  const initChallenge = () => {
    history.push("/create_challenge");
  };

  resetChallenge();

  return (
    <>
      <img src={`${process.env.PUBLIC_URL}/logo-with-text.png`} className="logo" />
      <div>
        <p>👋 Llegó la forma en que puedas Retar a tus amigos y ganarles:</p>
        <ol>
          <li>Crea el reto. 🤔</li>
          <li>
            Indica la fecha⌛ que le das para que lo cumpla, puedes
            usar uno de nuestros retos generados o crear el tuyo.
          </li>
          <li>Señala el premio 🍲 🍸🛹que vas a jugar.</li>
          <li>
            El retado 😈 sube video del reto, el limite de tiempo de cada video es de 30s. No olvides compartirle el link
            del reto.
          </li>
          <li>
            Comparte el enlace con tus amigos para que voten 🗳️ y decidan si
            el retado cumplió.🏅
          </li>
        </ol>
      </div>
      <StyledButton title="empecemos" action={initChallenge} />
    </>
  );
};

export default connect(() => ({}), { resetChallenge })(Home);
