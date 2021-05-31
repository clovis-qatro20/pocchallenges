import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export const LayoutContext = React.createContext({ padding: "1em" });

const Layout = ({ children, loading, challenge }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    toast.error(challenge.err);
  }, [challenge.err]);

  return (
    <LayoutContext.Provider value={{setStyle}}>
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
        {children}
      </div>
    </LayoutContext.Provider>
  );
};

const mapStateToProps = ({ Loader, Challenge }) => ({
  loading: Loader,
  challenge: Challenge,
});

export default connect(mapStateToProps)(Layout);
