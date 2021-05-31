import Amplify from "@aws-amplify/core";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import awsconfig from "./aws-exports";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreateChallenge from "./pages/CreateChallenge";
import ChallengeConfirmation from "./pages/ChalllengeConfirmation";
import SubmitChallenge from "./pages/SubmitChallenge";
import SubmitChallengeForm from "./pages/SubmitChallengeForm";
import store from "./store";
import VoteChallenge from "./pages/VoteChallenge";
import ReactGA from "react-ga";
import withTracker from "./components/withTracker";

Amplify.configure(awsconfig);
ReactGA.initialize("UA-155085693-1");

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route
              path="/challenge"
              exact
              component={withTracker(SubmitChallenge)}
            />
            <Route
              path="/challenge/submit"
              exact
              component={withTracker(SubmitChallengeForm)}
            />
            <Route
              path="/challenge/vote"
              exact
              component={withTracker(VoteChallenge)}
            />
            <Route
              path="/challenge/confirmation"
              exact
              component={withTracker(ChallengeConfirmation)}
            />
            <Route
              path="/create_challenge"
              exact
              component={withTracker(CreateChallenge)}
            />
            <Route path="/" component={Home} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
