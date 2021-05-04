import { useContext, useEffect, useState } from "react";
import { Input, InputGroup } from "@chakra-ui/input";
import { Tooltip } from "@chakra-ui/tooltip";
import { useToast } from "@chakra-ui/toast";
import { MdCancel, MdHelpOutline } from "react-icons/md";
import { AppContext } from "../../App";
import axios from "axios";
import { useHistory } from "react-router";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import ChangePassword from "./ChangePassword";
import ChangeEmail from "./ChangeEmail";

const MyAccountSetting = () => {
  const { mainData, setMainData } = useContext(AppContext);
  const {
    isOpen: isDelOpen,
    onOpen: onDelOpen,
    onClose: onDelClose,
  } = useDisclosure();
  const history = useHistory();
  const toast = useToast();
  const [phone, setPhone] = useState({
    isReadOnly: true,
    value: "",
  });

  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    document.title = "Account Setting - E-Pal";

    setPhone({ ...phone, value: mainData?.phone || "" });
  }, []);

  useEffect(() => {
    setPhone({ ...phone, value: mainData?.phone || phone.value });
  }, [mainData]);

  const handlePhoneInput = (e) => {
    setPhone({ ...phone, value: e.target.value });
  };

  const handlePhoneBtnToggle = () => {
    setPhoneError("");

    if (!phone.isReadOnly) {
      if (phone.value === "") {
        setPhoneError("Please enter a phone number");
        return;
      } else if (phone.value.toString() === mainData?.phone?.toString()) {
        setPhoneError("Please enter a different number");
        return;
      } else if (isNaN(phone.value)) {
        setPhoneError("Please enter a valid number");
        return;
      } else {
        axios
          .put("/user-phone-number", { phoneNumber: phone.value })
          .then((res) => {
            toast({
              title: "Phone number updated successfully",
              status: "success",
              duration: 3000,
            });
            setPhone({ ...phone, isReadOnly: true });

            axios
              .get("/user-data")
              .then((res) => {
                setMainData(res.data);
              })
              .catch((err) => {});
          })
          .catch((err) => {
            toast({
              title: "An error occured",
              description: "Couldn't make the update",
              status: "error",
              duration: 3000,
            });
          });
      }
    } else {
      setPhone({ ...phone, isReadOnly: false });
    }
  };

  const cancelPhoneBtnUpdate = () => {
    setPhone({ isReadOnly: true, value: mainData?.phone });
    setPhoneError("");
  };

  const handleDeleteAccount = () => {
    axios
      .delete("/delete-user")
      .then((res) => {
        toast({
          title: "Account deleted successfully",
          status: "success",
          duration: 10000,
        });

        localStorage.removeItem("accessToken");
        setMainData(null);
        history.push("/");
      })
      .catch((err) => {
        toast({
          title: "An error occured",
          description: "Couldn't delete user",
          status: "error",
          duration: 10000,
        });
      });
  };

  return (
    <div className="main-content myaccount">
      <h1>My Account</h1>
      <h2>Account Information</h2>
      <div className="information-section">
        <div>
          <label>ID:</label>
          <p>{mainData?.id.toUpperCase()}</p>
        </div>
        <div>
          <label>Registration Date:</label>
          <p>
            {new Date(mainData?.signup_date.substr(0, 10)).toLocaleDateString(
              "en-GB"
            )}
          </p>
        </div>
        <div>
          <label>Email:</label>
          <InputGroup width="15rem" mr="1rem">
            <Input
              type="email"
              size="sm"
              variant="unstyled"
              placeholder="Email"
              isReadOnly
              value={mainData?.email}
            />
          </InputGroup>

          <ChangeEmail />
        </div>
        <div>
          <label>Phone:</label>

          <div className="phone">
            <Input
              type="tel"
              size="sm"
              // variant={phone.isReadOnly ? "unstyled" : "flushed"}
              variant="flushed"
              name="phone"
              placeholder="Phone Number"
              isReadOnly={phone.isReadOnly}
              value={phone.value}
              onChange={handlePhoneInput}
            />
            <p>{phoneError}</p>
          </div>

          <button name="btn-phone" onClick={handlePhoneBtnToggle}>
            {phone.isReadOnly ? "Change" : "Save"}
          </button>

          {!phone.isReadOnly && (
            <Tooltip hasArrow label="Cancel phone update" placement="top">
              <div onClick={cancelPhoneBtnUpdate}>
                <MdCancel />
              </div>
            </Tooltip>
          )}

          <Tooltip
            hasArrow
            label="The phone number is used to log in or receive order and other messages"
            placement="top"
          >
            <div>
              <MdHelpOutline />
            </div>
          </Tooltip>
        </div>
        <div>
          <label>Password:</label>
          <p style={{ width: "15rem", marginRight: "1rem" }}>********</p>
          <ChangePassword />
        </div>
        <hr />
        <div>
          <label>Delete Account:</label>
          <button className="delete-btn" onClick={onDelOpen}>
            Delete
          </button>

          <Modal isOpen={isDelOpen} onClose={onDelClose} isCentered>
            <ModalOverlay bg="#000000dd" />
            <ModalContent>
              <ModalHeader>Delete Account</ModalHeader>
              <ModalBody className="delete-account-model-body">
                <p>Are you sure you want to delete your account ?</p>
                <p>This action cannot be undone.</p>
              </ModalBody>

              <ModalFooter>
                <div className="delete-account-btns">
                  <button onClick={onDelClose}>Close</button>
                  <button onClick={handleDeleteAccount}>Delete</button>
                </div>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default MyAccountSetting;
