import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";

const ChangePassword = () => {
  const {
    isOpen: isPwdOpen,
    onOpen: onPwdOpen,
    onClose: onPwdClose,
  } = useDisclosure();

  const [showOldPwd, toggleOldPwd] = useState(false);
  const [showNewPwd, toggleNewPwd] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPwd: "",
    newPwd: "",
  });
  const [pwdErrors, setPwdErrors] = useState({
    oldPwd: "",
    newPwd: "",
  });
  const toast = useToast();

  const handleToggleOldPwd = () => {
    toggleOldPwd(!showOldPwd);
  };

  const handleToggleNewPwd = () => {
    toggleNewPwd(!showNewPwd);
  };

  const handlePwdsChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSavePwd = () => {
    setPwdErrors({
      oldPwd: "",
      newPwd: "",
    });

    const currPwdErrors = {
      oldPwd: "",
      newPwd: "",
    };

    if (passwords.oldPwd === "")
      currPwdErrors.oldPwd = "Please enter the current password";
    else if (passwords.oldPwd.length < 6)
      currPwdErrors.oldPwd = "Please enter a valid password";

    if (passwords.newPwd === "")
      currPwdErrors.newPwd = "Please enter the new password";
    else if (passwords.newPwd.length < 6)
      currPwdErrors.newPwd = "Please enter a valid password";

    if (
      passwords.oldPwd === "" ||
      passwords.oldPwd.length < 6 ||
      passwords.newPwd === "" ||
      passwords.newPwd.length < 6
    ) {
      console.log(currPwdErrors);
      setPwdErrors(currPwdErrors);
      return;
    }

    if (passwords.oldPwd === passwords.newPwd) {
      setPwdErrors({ oldPwd: "", newPwd: "Please enter a different password" });
      return;
    }

    axios
      .put("/user-password", passwords)
      .then((res) => {
        onPwdClose();
        toast({
          title: "Password updated successfully",
          status: "success",
          duration: 5000,
        });
      })
      .catch((err) => {
        toast({
          title: "An error occured",
          status: "erorr",
          duration: 3000,
        });
      });
  };

  return (
    <>
      <button onClick={onPwdOpen}>Change</button>

      <Modal isOpen={isPwdOpen} onClose={onPwdClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalBody>
            <FormControl id="old-pwd" isRequired my=".5rem">
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  autocomplete="false"
                  pr="4.5rem"
                  variant="filled"
                  type={showOldPwd ? "text" : "password"}
                  placeholder="Please enter your password"
                  name="oldPwd"
                  value={passwords.oldPwd}
                  onChange={handlePwdsChange}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleToggleOldPwd}
                    variant="ghost"
                    mr=".5rem"
                  >
                    {showOldPwd ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText color="red.500" mt="0.3rem">
                {pwdErrors.oldPwd}
              </FormHelperText>
            </FormControl>

            <FormControl id="new-password" isRequired my=".5rem">
              <FormLabel>New Password</FormLabel>
              <InputGroup size="md">
                <Input
                  autocomplete="false"
                  pr="4.5rem"
                  variant="filled"
                  type={showNewPwd ? "text" : "password"}
                  placeholder="Please enter your new password"
                  name="newPwd"
                  value={passwords.newPwd}
                  onChange={handlePwdsChange}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleToggleNewPwd}
                    variant="ghost"
                    mr=".5rem"
                  >
                    {showNewPwd ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText color="red.500" mt="0.3rem">
                {pwdErrors.newPwd}
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <button className="password-btn cancel" onClick={onPwdClose}>
              Cancel
            </button>
            <button className="password-btn save" onClick={handleSavePwd}>
              Save
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePassword;
