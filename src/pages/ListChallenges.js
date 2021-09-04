import React, { useEffect } from "react";
import { connect } from "react-redux";
import { listChallenges } from "../store/challenges/actions";
import StyledButton from "../components/StyleButton";
import moment from "moment";

const ListChallenges = ({ history, listChallenges, challenges }) => {
  const navigateToChallenge = (id) => {
    history.push(`/challenge/confirmation/${id}`);
  };

  useEffect(() => {
    listChallenges();
  }, []);

  const Item = ({ challenge: { owner, expires, id } }) => (
    <div className="challengeListItem">
      <p>{`${owner.name} reto a un amigo antes del ${moment(
        expires
      ).calendar()}`}</p>
      <button onClick={() => navigateToChallenge(id)}>VER EL RETO</button>
    </div>
  );

  return (
    <>
      {challenges.map((challenge, key) => (
        <Item challenge={challenge} key={key} />
      ))}
    </>
  );
};

const mapStateToProps = ({ Challenges }) => ({
  challenges: Challenges,
});

export default connect(mapStateToProps, { listChallenges })(ListChallenges);
