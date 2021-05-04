import { useEffect, useContext } from "react";
import { AppContext } from "../../App";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { Divider } from "@chakra-ui/layout";
import "./Setting.scss";
import axios from "axios";
import ProfileSetting from "./ProfileSetting";
import MyAccountSetting from "./MyAccountSetting";
import NotificationsSetting from "./NotificationsSetting";
import PrivacySetting from "./PrivacySetting";
import WebsiteLogSetting from "./WebsiteLogSetting";
import { useToast } from "@chakra-ui/toast";

const Setting = () => {
  const { setMainData } = useContext(AppContext);
  const history = useHistory();
  const settingUrls = {
    "Edit Profile": "/setting/profile",
    Account: "/setting/myaccount",
    Notifications: "/setting/notifications",
    Privacy: "/setting/privacy",
    "Webite Log": "/setting/website-log",
  };
  const toast = useToast();

  useEffect(() => {
    document.title = "Settings - E-Pal";
    if (!localStorage.getItem("accessToken")) {
      history.push("/");
    }
  }, []);

  const handleLogoutClick = () => {
    axios
      .delete("/logout", {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        localStorage.removeItem("accessToken");
        axios.defaults.headers.common["Authorization"] = "";
        toast({
          title: "You have been logged out successfully.",
          status: "info",
          duration: 2000,
          // isClosable: true,
        });
        setMainData(null);
        history.push("/");
      });
  };

  return (
    <div className="setting">
      <div className="left-side-bar">
        <div>
          <label>Settings</label>
          {Object.keys(settingUrls).map((value) => (
            <Link to={settingUrls[value]} key={value}>
              <div>{value}</div>
            </Link>
          ))}
          <Divider />
          <div onClick={handleLogoutClick}>Log Out</div>
        </div>
      </div>

      <Switch>
        <Route exact path="/setting/profile" component={ProfileSetting} />
        <Route exact path="/setting/myaccount" component={MyAccountSetting} />
        <Route
          exact
          path="/setting/notifications"
          component={NotificationsSetting}
        />
        <Route exact path="/setting/privacy" component={PrivacySetting} />
        <Route
          exact
          path="/setting/website-log"
          component={WebsiteLogSetting}
        />
      </Switch>
    </div>
  );
};

export default Setting;
