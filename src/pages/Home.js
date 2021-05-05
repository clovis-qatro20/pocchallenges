import React from "react";
import StyledButton from '../components/StyleButton'

const Home = ({history}) => {
  const initChallenge = () => {
    history.push('/create_challenge')
  }

  return (
    <>
    <img src={`${process.env.PUBLIC_URL}/logo.png`} className="logo"/>
    <div>
      <p>Hola! Llego forma en que puedas Retar a tus amigos y ganarles:</p>
      <ul>
        <li>1. Crea el reto. 🤔</li>
        <li>2. Indica el tiempo ⌛que le das para que lo cumpla.</li>
        <li>3. Señala el premio 🍲 🍸🛹que vas a jugar.</li>
        <li>
          4. El retado 😈 sube foto🖼️ del reto. No olvides compartirle el código
          del reto
        </li>
        <li>
          5. Comparte el enlace para que otras personas voten 🗳️ y decidan si el
          retado cumplió.🏅
        </li>
      </ul>
    </div>
      <StyledButton title="empecemos" action={initChallenge} />
    </>
  );
};

export default Home;
