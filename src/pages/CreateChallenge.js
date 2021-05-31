import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import StyledButton from "../components/StyleButton";
import { createChallenge } from "../store/challenge/actions";
import moment from "moment";
import { Redirect } from "react-router";

const challenges = [
  "Reto de tragos 🥃.Mira parece fácil pero la idea🤔 es que por cada trago🍻 que tu amig@ tome debe acompañarlo de dos flexiones de pecho🏋️🏋️. Ponle un número de rondas realizable durante 30 segundos ⌛ para que parezca un reto y menciona la recompensa que juegas a cambio.🎁 (Sube vídeo⬆️📽️). ",
  "Comer un limón 🍋sin hacer expresiones.Parece simple pero créeme valdrá la pena ver 🧐 a tu amig@ intentarlo. La idea es realizar un video como prueba de si cumple o no.  no se te olvide mencionar la recompensa que juegas a cambio. 🎁 (Sube vídeo⬆️📽️).",
  "Comer un pastel 🍰 con las manos atadas o sin usarlas 👐. Desordenarse con crema y comida entre amigos es buena onda 😂. Pon el reto a tu amig@ donde tiene que demostrar si es capaz de terminar todo el pedazo de pastel 🍰 en menos de 15 segundos⌛. no se te olvide mencionar la recompensa que juegas a cambio 🎁. (Sube vídeo⬆️📽️). ",
  "Care galleta. 🍪 Este es un reto como para romper el hielo, la idea es que en menos de 25 segundos ⌛ tu amig@ se coloque la galleta en su frente 😯 y sólo usando los músculos 😂 de su cara tiene que ubicarla en la boca. no se te olvide mencionar la recompensa 🎁 que juegas a cambio. ( Sube vídeo ⬆️📽️).",
  "Cucharon 🥄. Mira tu amig@ se coloca una cuchara 🥄 en la boca😯 tiene que mover seis bolas de ping pong 🏓🏓de un plato a otro en menos de un minuto ⌛. No se puede usar las manos👐. A no ser que se caiga una bola de  ping pong, la cual puede recoger y poner de nuevo en el plato inicial 🥣.  No se te olvide mencionar la recompensa 🎁 que juegas a cambio. ( Sube vídeo⬆️📽️). ",
  "Pose de Yoga 🧘‍♀️en el puesto de oficina o de estudio 🖥️. El reto es que tu amig@ se tome una foto  📷en el puesto de trabajo o de estudio  🖥️ haciendo una pose de yoga 🧘‍♀️, si quieres elige tu cuál, no se vale trabajo en casa.😒. No se te olvide mencionar la recompensa 🎁 que juegas a cambio. ( Sube foto ⬆️📷).",
];

const CreateChallenge = ({ createChallenge, challenge }) => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState(0);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");

  const generateRandomChallenge = () => {
    const index = Math.floor(Math.random() * challenges.length);
    setDescription(challenges[index]);
  };

  useEffect(() => {
    const randomCode = Math.floor(Math.random() * 10000);
    setCode(randomCode);
    generateRandomChallenge();
  }, []);

  const onSumitChallenge = () => {
    createChallenge({
      owner: {
        name,
        email,
      },
      expires: date,
      description,
      price,
      code,
      accomplish: 0,
      notAccomplished: 0,
    });
  };

  return (
    <>
      {challenge.data && <Redirect to="/challenge/confirmation" />}
      <img src={`${process.env.PUBLIC_URL}/logo.png`} className="logo" />
      <div className="formContainer">
        <div className="inputRow">
          <label>Descripcion del reto</label>
          <textarea
            rows="8"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          style={{ marginTop: "10px" }}
          onClick={() => generateRandomChallenge()}
        >
          Generar Reto
        </button>
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
        <div className="inputRow">
          <label>Fecha de finalización</label>
          <input
            type="date"
            id="start"
            name="trip-start"
            value={date}
            min={moment().format("YYYY-MM-DD")}
            max={moment().add(2, "w").format("YYYY-MM-DD")}
            onChange={(e) => setDate(e.target.value)}
          ></input>
        </div>
        <div className="inputRow">
          <label>Descripcion del Premio</label>
          <textarea
            rows="6"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></textarea>
        </div>
      </div>
      <StyledButton title="iniciar el reto" action={onSumitChallenge} />
    </>
  );
};

const mapStateToProps = ({ Challenge }) => ({
  challenge: Challenge,
});

export default connect(mapStateToProps, { createChallenge })(CreateChallenge);
