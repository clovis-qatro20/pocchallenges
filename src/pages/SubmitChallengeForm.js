import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import { connect } from "react-redux";
import { submitChallenge } from "../store/challenge/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faRedo,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Auth from "@aws-amplify/auth";
import { LayoutContext } from "../components/Layout";
import { Redirect } from "react-router";
import StyledButton from "../components/StyleButton";
import { toast } from "react-toastify";

const SubmitChallengeForm = ({ submitChallenge, redirect }) => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
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

  const handleDiscardMedia = () => {
    setBlobURL("");
    setRecordedChunks([]);
  };

  const handleReplay = () => {
    videoRef.current.play();
  };

  const handleSendMedia = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const challenger = {
      name: params.get("name"),
      email: params.get("email"),
    };
    submitChallenge({ recordedChunks, challenger });
  }, [recordedChunks]);

  const onFinishUploadVideo = (video) => {
    console.log(video);
    setRecordedChunks(video);
    // const blob = new Blob(video);
    const url = URL.createObjectURL(video);
    console.log(url);
    setBlobURL(url);
  };

  const uploadVideo = () => {
    document.getElementById("getFile").click();
  };

  const renderCaputre = () => (
    <>
      <input
        type="file"
        accept="video/*"
        id="getFile"
        capture="user"
        style={{ display: "none" }}
        onChange={(e) => onFinishUploadVideo(e.target.files[0])}
      ></input>
      <p>al dar click, se abrira la camara de tu celular, el video puede durar un máximo de 30 segundos</p>
      <StyledButton title="sube tu video" action={uploadVideo} />
    </>
  );

  const checkVideoValidate = (time) => {
    if (time > 20) {
      handleDiscardMedia();
      toast.error("El limite de tiempo del video es de 30s");
    }
  };

  const renderReplay = () => (
    <>
      <video
        src={blobURL}
        autoPlay
        className="replay"
        ref={videoRef}
        onLoadedMetadata={(e) => checkVideoValidate(e.target.duration)}
      />{" "}
      <div className="videoController">
        <button
          onClick={handleDiscardMedia}
          className="playerButton playerButtonsm"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <button onClick={handleSendMedia} className="playerButton">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
        <button onClick={handleReplay} className="playerButton playerButtonsm">
          <FontAwesomeIcon icon={faRedo} />
        </button>
      </div>
    </>
  );

  return (
    <div className="videoRecorder">
      {redirect && <Redirect to="/challenge/confirmation" />}
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
