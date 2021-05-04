import { Switch } from "@chakra-ui/switch";
import { useEffect } from "react";

const PrivacySetting = () => {
  useEffect(() => {
    document.title = "Privacy Setting - E-Pal";
  }, []);

  return (
    <div className="main-content privacy">
      <h1>Privacy Setting</h1>

      <div className="first-section">
        <div>
          <div>
            <label>Incognito Browsing:</label>
            <p>
            Activate to browse users’ profiles without a visit notice.
            </p>
          </div>
          <Switch size="lg" isDisabled />
        </div>

        <hr />

        <div>
          <div>
            <label>Hide Birthday:</label>
            <p>Activate to stop other users from seeing your birthday.</p>
          </div>
          <Switch size="lg" isDisabled />
        </div>

        <hr />

        <div>
          <div>
            <label>Anonymous on Leaderboard:</label>
            <p>
            After activation, you will become anonymous on the Leaderboard.
            </p>
          </div>
          <Switch size="lg" isDisabled />
        </div>
      </div>
    </div>
  );
};

export default PrivacySetting;
