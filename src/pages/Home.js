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
      <img src={`${process.env.PUBLIC_URL}/logo.png`} className="logo" />
      <div>
        <p>Hola! Llego forma en que puedas Retar a tus amigos y ganarles:</p>
        <ul>
          <li>1. Crea el reto. 🤔</li>
          <li>
            2. Indica la fecha⌛ que le das para que lo cumpla el reto, puedes
            usar uno de nuestros retos generados, o crear el tuyo.
          </li>
          <li>3. Señala el premio 🍲 🍸🛹que vas a jugar.</li>
          <li>
            4. El retado 😈 sube video del reto, el limite de tiempo de cada video es de 30s. No olvides compartirle el link
            del reto
          </li>
          <li>
            5. Comparte el enlace para que otras personas voten 🗳️ y decidan si
            el retado cumplió.🏅
          </li>
        </ul>
      </div>
      <StyledButton title="empecemos" action={initChallenge} />
    </>
  );
};

export default connect(() => ({}), { resetChallenge })(Home);
