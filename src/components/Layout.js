import React, { useEffect } from "react";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const Layout = ({ children, loading, challenge }) => {
  useEffect(() => {
    toast.error(challenge.err);
  }, [challenge.err]);

  return (
    <div className="layout">
      {challenge.data && (
        <Redirect to="/create_challenge/confirmation" />
      )}
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
  );
};

const mapStateToProps = ({ Loader, Challenge }) => ({
  loading: Loader,
  challenge: Challenge,
});

export default connect(mapStateToProps)(Layout);
