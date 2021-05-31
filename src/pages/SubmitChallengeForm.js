import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import { connect } from "react-redux";
import { submitChallenge } from "../store/challenge/actions";
import Webcam from "react-webcam";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPlay,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Auth from "@aws-amplify/auth";
import { LayoutContext } from "../components/Layout";
import { Redirect } from "react-router";

const DEFAULT_RECORD_TIME = 10;

const SubmitChallengeForm = ({ submitChallenge, redirect }) => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [blobURL, setBlobURL] = useState("");
  const { setStyle } = useContext(LayoutContext);

  useEffect(() => {
    setStyle({ padding: 0, background_color: "#ffffff" });
    (async () => {
      await Auth.signIn("masteruser", "ShibaInuCoin");
    })();

    return () => {
      setStyle({});
    };
  }, []);

  const videoConstraints = {
    width: screen.width,
    height: screen.height,
    facingMode: "user",
  };

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
    setTimeout(() => {
      handleStopCaptureClick();
    }, DEFAULT_RECORD_TIME * 1000);
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks(
          (prev) =>
            new Blob(prev.concat(data), {
              type: "video/mp4",
            })
        );
        const blob = new Blob([].concat(data), {
          type: "video/webm",
        });
        const url = URL.createObjectURL(blob);
        setBlobURL(url);
      }
    },
    [setRecordedChunks]
  );

  const handleDiscardMedia = () => {
    setBlobURL("");
    setRecordedChunks([]);
  };

  const handleSendMedia = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const challenger = {
      name: params.get("name"),
      email: params.get("email"),
    };
    submitChallenge({ recordedChunks, challenger });
  }, [recordedChunks]);

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const renderCaputre = () => (
    <>
      <Webcam
        audio={true}
        ref={webcamRef}
        videoConstraints={videoConstraints}
      />
      <div className="videoController">
        {!capturing ? (
          <button onClick={handleStartCaptureClick} className="playerButton">
            <FontAwesomeIcon icon={faPlay} />
          </button>
        ) : (
          <CountdownCircleTimer
            isPlaying
            duration={DEFAULT_RECORD_TIME}
            colors={[
              ["#9570f7", 1],
              ["#ff1a1a", 1],
            ]}
          >
            {({ remainingTime }) => (
              <p className="textCounter">{remainingTime}</p>
            )}
          </CountdownCircleTimer>
        )}
      </div>
    </>
  );

  const renderReplay = () => (
    <>
      <video src={blobURL} autoPlay />{" "}
      <div className="videoController">
        <button onClick={handleDiscardMedia} className="playerButton">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <button onClick={handleSendMedia} className="playerButton">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </>
  );

  return (
    <div className="videoRecorder">
      {redirect && <Redirect to='/challenge/confirmation' />}
      {blobURL ? renderReplay() : renderCaputre()}
    </div>
  );
};

const mapStateToProps = ({ Challenge }) => ({
  challenge: Challenge.data,
  redirect: Challenge.submitted || false,
});

export default connect(mapStateToProps, { submitChallenge })(
  SubmitChallengeForm
);
