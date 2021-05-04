import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input, InputGroup } from "@chakra-ui/input";
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
import { useContext, useState } from "react";
import { AppContext } from "../../App";
import { checkEmail } from "../../useful/validation";

const ChangeEmail = () => {
  const {
    isOpen: isEmailOpen,
    onOpen: onEmailOpen,
    onClose: onEmailClose,
  } = useDisclosure();
  const {mainData} = useContext(AppContext);

  const [newEmail, setNewEmail] = useState("");
  const [newEmailError, setNewEmailError] = useState("");
  const toast = useToast();

  const handleInput = (e) => {
    setNewEmail(e.target.value);
  };

  const handleSaveNewEmail = () => {
    setNewEmail("");
    
    if(newEmail === "") {
      setNewEmailError("Please enter an email")
      return;
    } else if(newEmail === mainData?.email) {
      setNewEmailError("Please enter a different email")
      return;
    } else if(!checkEmail(newEmail)) {
      setNewEmailError("Please enter a valid email")
      return;      
    }
    
    axios
      .put("/send-email-change-confirmation", { newEmail })
      .then((res) => {
        onEmailClose();
        toast({
          title: "Email confirmation sent successfully",
          description: "Please check your inbox",
          status: "success",
          duration: 5000,
        });
      })
      .catch((err) => {
        toast({
          title: "An error occured",
          status: "error",
          duration: 3000,
        });
      });
  };

  return (
    <>
      <button onClick={onEmailOpen}>Change</button>

      <Modal isOpen={isEmailOpen} onClose={onEmailClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Email</ModalHeader>
          <ModalBody>
            <p style={{ fontSize: ".9rem", color: "#aa8da4" }}>
              We will send you a confirmation email to your new email address.
            </p>

            <FormControl id="change-email" isRequired my=".5rem">
              <FormLabel>New Email</FormLabel>
              <InputGroup size="md">
                <Input
                  autocomplete="false"
                  pr="4.5rem"
                  variant="filled"
                  type="email"
                  placeholder="Please enter your new email"
                  name="newEmail"
                  value={newEmail}
                  onChange={handleInput}
                />
              </InputGroup>
              <FormHelperText color="red.500" mt="0.3rem">
                {newEmailError}
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <button className="password-btn cancel" onClick={onEmailClose}>
              Cancel
            </button>
            <button className="password-btn save" onClick={handleSaveNewEmail}>
              Save
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangeEmail;
