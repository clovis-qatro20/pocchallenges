import Amplify from "@aws-amplify/core";
import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import awsconfig from "./aws-exports";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreateChallenge from "./pages/CreateChallenge";
import CreateChallengeConfirmation from "./pages/CreateChalllengeConfirmation";
import SubmitChallenge from "./pages/SubmitChallenge";
import SubmitChallengeForm from "./pages/SubmitChallengeForm";
import store from "./store";

Amplify.configure(awsconfig);

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/challenge" exact component={SubmitChallenge} />
            <Route path="/challenge/submit" exact component={SubmitChallengeForm} />
            <Route path="/create_challenge/confirmation" exact component={CreateChallengeConfirmation} />
            <Route path="/create_challenge" exact component={CreateChallenge} />
            <Route path="/" component={Home} />
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
