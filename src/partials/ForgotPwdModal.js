import { useState } from "react";
import { FormHelperText } from "@chakra-ui/form-control";
import { FormLabel } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useToast } from "@chakra-ui/react";
import { checkEmail } from "../useful/validation";
import axios from "axios";

const ForgotPwdModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [values, setValues] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });
  const toast = useToast();

  const handleForgotPwdModal = () => onOpen();

  const handleInputs = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    const tempErrors = { email: "" };
    const isEmailValid = checkEmail(values.email);
    if (values.email === "") tempErrors.email = "Please enter an email.";
    else if (!isEmailValid) tempErrors.email = "Please enter a valid email.";

    setErrors(tempErrors);
    if (values.email === "" || !isEmailValid) return;

    axios
      .post("/verify-user-by-email", values)
      .then((res) => {
        onClose();
        toast({
          title: "Verification email sent successfully.",
          description: "Please check your inbox.",
          status: "success",
          duration: 5000,
          isClosable: false,
        });
      })
      .catch((err) => {
        toast({
          title: "Error occured.",
          status: "error",
          duration: 5000,
          isClosable: false,
        });
      });
  };

  return (
    <>
      <p className="forgot-pwd" onClick={handleForgotPwdModal}>
        Forgot your password?
      </p>

      <Modal
        size="sm"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay bg="#c67ace50" />
        <ModalContent>
          <ModalHeader>Verify with Email</ModalHeader>
          <ModalCloseButton boxShadow="none" />
          <ModalBody>
            <p style={{ fontSize: ".9rem" }}>
              We will send a verification code to the email address you entered.
            </p>

            <FormControl id="forgot-pwd-email" my="1rem" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Please enter your email"
                name="email"
                value={values.email}
                onChange={handleInputs}
              />
              <FormHelperText color="red.500" fontSize=".9rem">
                {errors.email}
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <div className="forgot-pwd-modal-btns">
              <button onClick={onClose}>Close</button>
              <button onClick={handleNext}>Next</button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ForgotPwdModal;
