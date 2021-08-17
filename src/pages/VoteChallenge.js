import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import {
  getChallenge,
  voteChallenge,
  updateVoting,
} from "../store/challenge/actions";
import { LayoutContext } from "../components/Layout";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import moment from "moment";
import API from "@aws-amplify/api";
import { onUpdateChallengeSubscription } from "../graphql/subscriptions";
import "moment/locale/es";
import { useParams } from "react-router";

class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props);
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div>
        <div data-vjs-player>
          <video
            ref={(node) => {
              this.videoNode = node;
            }}
            className="video-js"
          />
        </div>
      </div>
    );
  }
}

const VotingCounter = ({ accomplish, notAccomplished }) => {
  const total = accomplish + notAccomplished;
  let accomplishPercentage = "50%";
  let notAccomplishedPercentage = "50%";

  if (total)
    accomplishPercentage =
      ((accomplish / total) * 100).toFixed(1).toString() + "%";
  if (total)
    notAccomplishedPercentage =
      ((notAccomplished / total) * 100).toFixed(1).toString() + "%";
  return (
    <div>
      <h3 className="votingTitle">Total de votos: {total}</h3>
      <div className="challengeProgressBar">
        <div
          className="votingBar votingBarRight"
          style={{ width: accomplishPercentage }}
        ></div>
        <div className="votingBar votingBarLeft"></div>
      </div>
      <div className="votingBarTextCounter">
        <p>SI: {accomplishPercentage}</p>
        <p>NO: {notAccomplishedPercentage}</p>
      </div>
    </div>
  );
};

const VoteChallenge = ({
  challenge,
  getChallenge,
  voteChallenge,
  updateVoting,
}) => {
  const { id } = useParams();
  const { setStyle } = useContext(LayoutContext);
  const [showModal, setShowModal] = useState(true);
  const [videoOnDemandJsOptions, setVideoOnDemandJsOptions] = useState({});
  const [renderVideo, setRenderVideo] = useState(false);
  const [voted, setVoted] = useState(false);
  const [pickWinner, setPickWinner] = useState(false);
  let challengeSubscription;
  moment.locale("es");

  useEffect(() => {
    setStyle({
      padding: 0,
      background_color: "#ffffff",
      justifyContent: "flex-start",
    });
    getChallenge(id);
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;

    const challengeHasBeenVoted = () => {
      const isVoted = document.cookie
        .split(";")
        .filter((cookie) => cookie.includes("cmu_id"))
        .some((cookieId) => cookieId.replace("cmu_id=", " ").trim() === id);

      setVoted(isVoted);
    };

    challengeHasBeenVoted();

    challengeSubscription = API.graphql({
      query: onUpdateChallengeSubscription,
      variables: {
        id,
      },
    }).subscribe({
      next: ({
        value: {
          data: { onUpdateChallengeSubscription },
        },
      }) => {
        updateVoting(onUpdateChallengeSubscription);
      },
    });

    return () => {
      setStyle({});
    };
  }, []);

  useEffect(() => {
    setPickWinner(
      moment(challenge?.expires).isBefore(moment().format("YYYY-MM-DDThh:mm"))
    );
    setVideoOnDemandJsOptions({
      autoplay: false,
      controls: true,
      aspectRatio: "4:5",
      sources: [
        {
          src: `https://cmuvod-dev-output-m1m9gw90.s3.amazonaws.com/public/${challenge?.vodAsset?.videoID}/${challenge?.vodAsset?.videoID}.m3u8`,
        },
      ],
    });
    if (id === challenge?.id) setRenderVideo(true);
  }, [challenge]);

  const closeModal = () => {
    document.body.style.position = "";
    document.body.style.top = "";
    setShowModal(false);
  };

  const onClickVote = (value) => {
    setVoted(true);
    document.cookie = `cmu_id=${id};path=/`;
    voteChallenge(value);
  };

  const renderVotingInterface = () => (
    <div className="bottomControlers">
      {voted ? (
        <>
          <h5>Gracias por Vortar!!</h5>
          <p>
            Recuerda volver a este mismo link el{" "}
            {moment(challenge?.expires).calendar()}, para descubir al ganador
          </p>
        </>
      ) : (
        <>
          <h5>¿Se cumplió el reto?</h5>
          <div className="votingButtons">
            <button className="left" onClick={() => onClickVote(true)}>
              si
            </button>
            <button className="right" onClick={() => onClickVote(false)}>
              no
            </button>
          </div>
        </>
      )}
    </div>
  );

  const renderWinnerInterface = () => {
    const challengerWin = challenge?.accomplish > challenge?.notAccomplished;
    return (
      <div className="bottomControlers">
        <h4>
          {challengerWin
            ? `${challenge?.challenger?.name} gano!! 🦄🔥🔥🔥`
            : `${challenge?.challenger?.name} perdio!! 😩😩😭`}
        </h4>
      </div>
    );
  };

  const renderVotingSection = () => {
    if (challenge?.refused) {
      return <p>{challenge?.challenger.name} rechazo el reto</p>;
    }

    return (
      <>
        {pickWinner ? (
          <>
            <p>mira quien gano</p>
            <button className="secondary" onClick={() => closeModal()}>
              entrar
            </button>
          </>
        ) : (
          <>
            <p>la votacion termina a las</p>
            <p>{moment(challenge?.expires).calendar()}</p>
            <p>¿CUMPLIÓ? O NO CUMPLIÓ</p>
            <button className="secondary" onClick={() => closeModal()}>
              votar
            </button>
          </>
        )}
      </>
    );
  };

  return (
    <div>
      {showModal && (
        <div className="descriptionModal">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} className="logo" />
          <h4>El reto Cash Me Up</h4>
          <p>{`${challenge?.owner?.name} reto a ${
            challenge?.challenger?.name || ""
          }`}</p>
          <p>a</p>
          <p>{challenge?.description}</p>
          {/* <p>antes del</p>
          <p>{challenge?.expires}</p> */}
          {renderVotingSection()}
          <p></p>
        </div>
      )}
      {renderVideo && <VideoPlayer {...videoOnDemandJsOptions} />}
      <VotingCounter
        {...{
          accomplish: challenge?.accomplish,
          notAccomplished: challenge?.notAccomplished,
        }}
      />
      {pickWinner ? renderWinnerInterface() : renderVotingInterface()}
    </div>
  );
};

const mapStateToProps = ({ Challenge }) => ({
  challenge: Challenge.data,
});

export default connect(mapStateToProps, {
  getChallenge,
  voteChallenge,
  updateVoting,
})(VoteChallenge);
