import React, { useCallback, useState, useRef } from "react";
import { connect } from "react-redux";
import { submitChallenge } from "../store/challenge/actions";
import Webcam from "react-webcam";
import StyledButton from "../components/StyleButton";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faPlay,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const DEFAULT_RECORD_TIME = 5;

const SubmitChallengeForm = ({ submitChallenge }) => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [blobURL, setBlobURL] = useState("");

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
        setRecordedChunks((prev) => prev.concat(data));
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

  const handleSendMedia = () => {
    submitChallenge(recordedChunks);
  };

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

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
      {blobURL ? renderReplay() : renderCaputre()}
    </div>
  );
};

const mapStateToProps = ({ Challenge }) => ({
  challenge: Challenge.data,
});

export default connect(mapStateToProps, { submitChallenge })(
  SubmitChallengeForm
);
