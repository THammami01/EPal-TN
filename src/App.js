import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./partials/Header";
import SwitchToDarkTheme from "./useful/SwitchToDarkTheme";

import Home from "./components/Home";
import Chill from "./components/Chill";
import Posts from "./components/Posts";
import Community from "./components/Community";
import HowItWorks from "./components/HowItWorks";
import Download from "./components/Download";
import Policies from "./components/Policies";
import PrivacyPolicy from "./components/PrivacyPolicy";
import CommunityGuidelines from "./components/CommunityGuidelines";
import MultimediaPolicy from "./components/MultimediaPolicy";
import About from "./components/About";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Router>
      <ChakraProvider>
        <Header />
        <SwitchToDarkTheme />

        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/chill" component={Chill} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/community" component={Community} />
            <Route exact path="/how-it-works" component={HowItWorks} />
            <Route exact path="/download" component={Download} />
            <Route exact path="/policies" component={Policies} />
            <Route
              exact
              path="/privacy-policy"
              component={PrivacyPolicy}
            />
            <Route
              exact
              path="/community-guidelines"
              component={CommunityGuidelines}
            />
            <Route
              exact
              path="/multimedia-policy"
              component={MultimediaPolicy}
            />
            <Route exact path="/about" component={About} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </ChakraProvider>
    </Router>
  );
};

export default App;
