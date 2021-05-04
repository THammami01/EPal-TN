import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import SwitchToDarkTheme from "./useful/SwitchToDarkTheme";
import axios from "axios";
import Header from "./partials/Header";
import "./components/pages/page.scss";

import Home from "./components/pages/Home";
import Chill from "./components/pages/Chill";
import Posts from "./components/pages/Posts";
import Community from "./components/pages/Community";
import HowItWorks from "./components/pages/HowItWorks";
import Download from "./components/pages/Download";
import Policies from "./components/pages/Policies";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import CommunityGuidelines from "./components/pages/CommunityGuidelines";
import MultimediaPolicy from "./components/pages/MultimediaPolicy";
import About from "./components/pages/About";
import Confirm from "./useful/Confirm";
import ConfirmNewEmail from "./useful/ConfirmNewEmail";
import Setting from "./components/settings/Setting";
import NotFound from "./components/pages/NotFound";

// axios.defaults.baseURL = "http://localhost:4000/";
axios.defaults.baseURL = "https://epal-tn.herokuapp.com/";

export const AppContext = createContext();

const App = () => { 
  const [mainData, setMainData] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = accessToken;

      axios
        .get("/user-data")
        .then((res) => {
          setMainData(res.data);
        })
        .catch((err) => {
          alert("Error !");
        });
    }
  }, []);

  return (
    <AppContext.Provider value={{ mainData, setMainData }}>
      <Router>
        <ChakraProvider>
          <Header />
          <SwitchToDarkTheme />
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/chill" component={Chill} />
              <Route exact path="/posts" component={Posts} />
              <Route exact path="/community" component={Community} />
              <Route exact path="/how-it-works" component={HowItWorks} />
              <Route exact path="/download" component={Download} />
              <Route exact path="/policies" component={Policies} />
              <Route exact path="/privacy-policy" component={PrivacyPolicy} />
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


              <Route path="/confirm/:secret" component={Confirm} />
              <Route path="/confirm-new-email/:secret" component={ConfirmNewEmail} />
              <Route path="/setting/" component={Setting} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </ChakraProvider>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
