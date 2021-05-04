import { useEffect } from "react";

const WebsiteLogSetting = () => {
  useEffect(() => {
    document.title = "Website Log - E-Pal";
  }, []);

  return (
    <div className="main-content website-log">
      {/* <h1>Website Log</h1> */}

      <div className="log-card">
        <img src="/assets/imgs/log-bg-epal-alt.jpg" alt="" className="bg-img" />

        <div className="log">
          <div>
            <label>V4.3.0 Apr 16, 2021</label>
            <p>
              1. Transformed User Levels to eMeows. Complete tasks and feed your
              kitty to have them level up!
            </p>
            <p>
              2. Simplified the old matching system to help clients find
              suitable ePals faster
            </p>
            <p>
              3. Addition of Live Rooms, which is a voice room an ePal could
              host to show they are ready to take orders
            </p>
            <p>
              4. Addition of manual dispatch, have a real staff help you find
              ePals for you
            </p>
            <p>5. Addition of Order Leaderboard and Contribution Leaderboard</p>
          </div>

          <div>
            <label>V4.2.0 Mar 26, 2021</label>
            <p>1. Addition of user manual for newcomers</p>
            <p>2. Simplified the ePal Dashboard and all its functions</p>
            <p>3. Addition of ePal guide, Business Assistant and Tip Center</p>
            <p>
              4. Optimization of business overview and ePal points. Gated
              functions are now open for everyone
            </p>
            <p>
              5. Addition of more promotion methods such as the Buy 1 get 1 free
              sale
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteLogSetting;
