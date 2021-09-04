import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Popup from "./Popup";

export const LayoutContext = React.createContext({ padding: "1em" });

const Layout = ({ children, loading, challenge }) => {
  const [style, setStyle] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ text: "", url: "" });
  const [showFeedBack, setShowFeedBack] = useState(true);

  const createPopup = (content) => {
    setPopupContent(content);
    setShowPopup(true);
  };

  useEffect(() => {
    toast.error(challenge.err);
  }, [challenge.err]);

  return (
    <LayoutContext.Provider value={{ setStyle, createPopup }}>
      <div className="layout" style={style}>
        {loading && (
          <div className="loader">
            <Loader type="Puff" color="#00BFFF" height={150} width={150} />
          </div>
        )}
        <ToastContainer
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {showPopup && <Popup content={popupContent} setShowPopup={setShowPopup} />}
        {children}
        {showFeedBack && (
          <div className="feedback">
            {/* <h3>X</h3> */}
            Ayudanos a mejorar! nos gustaria escuchar tu opinion, haz click en{" "}
            <a
              rel="noreferrer"
              target="_blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLSeIR2t6qv5fBe5tpRi0-cx6KQdax4_Po7BuGusl7SWeOGG34g/viewform?usp=sf_link"
            >
              Feedback form
            </a>
            <span onClick={() => setShowFeedBack(false)}> [x]</span>
          </div>
        )}
      </div>
    </LayoutContext.Provider>
  );
};

const mapStateToProps = ({ Loader, Challenge }) => ({
  loading: Loader,
  challenge: Challenge,
});

export default connect(mapStateToProps)(Layout);
