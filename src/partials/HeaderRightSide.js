import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  // ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { AppContext } from "../App";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import ProfileTab from "./ProfileTab";

const HeaderRightSide = () => {
  const { mainData } = useContext(AppContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabIndex, setTabIndex] = useState(0);

  const style1 = {
    padding: "0",
  };
  const style2 = {
    outlineColor: "transparent",
  };

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const handleLoginClick = () => {
    setTabIndex(0);
    onOpen();
  };

  const handleSignupClick = () => {
    setTabIndex(1);
    onOpen();
  };

  return (
    <div className="right-side">
      {mainData === null ? (
        <>
          <button onClick={handleLoginClick}>Log In</button>
          <button onClick={handleSignupClick}>Sigh Up</button>
        </>
      ) : (
        <ProfileTab />
      )}

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={style1}>
            <div className="login-signup-model-header">
              <img src="/assets/imgs/epal.png" alt="Epal Tunisia" />
              <h2>
                {tabIndex === 0
                  ? "Welcome to E-PAL Tunisia!"
                  : "Join E-PAL Tunisia now!"}
              </h2>
            </div>
          </ModalHeader>
          <ModalCloseButton style={style2} _style={style2} />

          <ModalBody>
            <Tabs index={tabIndex} onChange={handleTabsChange} isFitted>
              <TabList>
                <Tab borderRadius="0" _hover={{ borderRadius: "0" }}>
                  Log In
                </Tab>
                <Tab borderRadius="0" _hover={{ borderRadius: "0" }}>
                  Sign Up
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <LogIn onClose={onClose} />
                </TabPanel>
                <TabPanel>
                  <SignUp onClose={onClose} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>

          {/* <ModalFooter>...</ModalFooter> */}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default HeaderRightSide;
