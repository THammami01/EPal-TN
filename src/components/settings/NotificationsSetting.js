import { Switch } from "@chakra-ui/switch";
import { useToast } from "@chakra-ui/toast";
import { useEffect } from "react";

const NotificationSetting = () => {
  const toast = useToast();

  useEffect(() => {
    document.title = "Notifications Setting - E-Pal";
  }, []);

  const handleSetBtnClick = () => {
    toast({
      title: "Not implemented yet",
      status: "info",
      duration: 2000,
    });
  }
  
  return (
    <div className="main-content notification">
      <h1>Notifications</h1>
      <div className="first-section">
        <div>
          <div>
            <label>E-mail Subscriptions:</label>
            <p>
              Subscribe to receive order notifications, news, major updates and
              promotial events.
            </p>
          </div>
          <Switch size="lg" isDisabled />
        </div>

        <hr/>

        <div>
          <div>
            <label>ePal Recommendations:</label>
            <p>Activate to allow ePal recommendations.</p>
          </div>
          <Switch size="lg" isDisabled />
        </div>

        <hr/>

        <div>
          <div>
            <label>ePal Match:</label>
            <p>
              When users initiate ePal matching, you will receive push
              notifications to respond.
            </p>
          </div>
          <Switch size="lg" isDisabled />
        </div>

        <hr/>

        <div>
          <div>
            <label>ePal Online Notifications:</label>
            <p>Receive alerts when the ePals you have ordered become online.</p>
          </div>
          <button onClick={handleSetBtnClick}>Set</button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSetting;
