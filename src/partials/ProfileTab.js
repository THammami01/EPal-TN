import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProfileTab.scss";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Tooltip,
  Divider,
  Box,
} from "@chakra-ui/react";
import { IoIosPaper, IoIosWallet } from "react-icons/io";
import { RiCoupon5Fill } from "react-icons/ri";
import { SiYoutubegaming } from "react-icons/si";
import { RiRadioButtonLine } from "react-icons/ri";
import { MdWeekend } from "react-icons/md";
import { HiStatusOffline } from "react-icons/hi";
import { BiHeartCircle } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { GiElectric } from "react-icons/gi";

const ProfileTab = () => {
  const { mainData, setMainData } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <img
        className="avatar"
        src="/assets/imgs/default-avatar.png"
        alt=""
        onClick={onOpen}
      />

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent
            style={{ background: "#21212c" }}
            className="profile-drawer"
          >
            <DrawerHeader className="tab-header">
              <div className="top-profile">
                <img
                  className="avatar drawer-avatar"
                  src="/assets/imgs/default-avatar.png"
                  alt=""
                  onClick={onOpen}
                />
                <Tooltip
                  label={mainData.firstname ? `${mainData.firstname} ${mainData.lastname}` : mainData.email.split("@")[0].toUpperCase()}
                  hasArrow
                >
                  <h3>{mainData.firstname ? `${mainData.firstname} ${mainData.lastname}` : mainData.email.split("@")[0].toUpperCase()}</h3>
                </Tooltip>
              </div>
            </DrawerHeader>
            <DrawerBody>
              <Popover placement="left-start">
                <PopoverTrigger>
                  <div className="select-status">
                    {" "}
                    <RiRadioButtonLine /> ONLINE
                  </div>
                </PopoverTrigger>

                <PopoverContent
                  padding=".5rem 0"
                  width="12rem"
                  className="popover-content"
                >
                  <PopoverBody padding="0" className="popover-body">
                    <Tooltip
                      label="User is online"
                      placement="left"
                      maxWidth="12rem"
                    >
                      <p className="status-item">
                        <RiRadioButtonLine />
                        ONLINE
                      </p>
                    </Tooltip>
                    <Tooltip
                      label="In-game, but willing to receive messages."
                      placement="left"
                      maxWidth="12rem"
                    >
                      <p className="status-item">
                        <SiYoutubegaming />
                        GAMING
                      </p>
                    </Tooltip>
                    <Tooltip
                      label="Messages notifications will be muted."
                      placement="left"
                      maxWidth="12rem"
                    >
                      <p className="status-item">
                        <MdWeekend />
                        RESTING
                      </p>
                    </Tooltip>
                    <Tooltip
                      label="User is offline."
                      placement="left"
                      maxWidth="12rem"
                    >
                      <p className="status-item">
                        <HiStatusOffline />
                        OFFLINE
                      </p>
                    </Tooltip>
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              <div className="selections">
                <div>
                  <p>0</p>
                  <label>Topics</label>
                </div>
                <div>
                  <p>0</p>
                  <label>Followers</label>
                </div>
                <div>
                  <p>0</p>
                  <label>Followings</label>
                </div>
                <div>
                  <p>0</p>
                  <label>Visitors</label>
                </div>
              </div>

              <div className="orders">
                <div>
                  <IoIosPaper />
                  <label>Order</label>
                </div>
                <div>
                  <IoIosWallet />
                  <label>Wallet</label>
                </div>
                <div>
                  <RiCoupon5Fill />
                  <label>Coupons</label>
                </div>
              </div>
              <Divider margin=".5rem 0" />
              <div className="epal-plus">
                <Box bgGradient="linear(to-l, #7928CA, #FF0080)">
                  <p>
                    <GiElectric /> Get E-Pal Plus
                  </p>
                  <p>4.99 Buff for 15 privileges</p>
                </Box>
              </div>
              <Divider margin=".5rem 0" />
              <div className="become-epal">
                <BiHeartCircle /> <label>Become an ePal</label>
              </div>
              <Divider margin=".5rem 0" />
              <Link to="/setting/profile" onClick={onClose}>
                <div className="settings">
                  <AiOutlineSetting /> <label>Settings</label>
                </div>
              </Link>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default ProfileTab;
