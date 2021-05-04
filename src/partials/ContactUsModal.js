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
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import { useToast } from "@chakra-ui/react";
import { checkEmail } from "../useful/validation";
import axios from "axios";

const ContactUsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [values, setValues] = useState({
    type: "",
    subject: "",
    description: "",
    contact: "",
  });
  const [errors, setErrors] = useState({
    type: "",
    subject: "",
    decription: "",
    contact: "",
  });
  const toast = useToast();

  const handleOpenContactUsModal = () => onOpen();

  const handleInputs = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const checkInputs = () => {
    const tempErrors = {
      type: "",
      subject: "",
      description: "",
      contact: "",
    };

    const isEmailValid = checkEmail(values.contact);
    if (values.type === "") tempErrors.type = "Please select a report type.";
    if (values.subject === "")
      tempErrors.subject = "Please enter report subject.";
    if (values.description === "")
      tempErrors.description = "Please enter report description.";
    if (values.contact === "") tempErrors.contact = "Please enter an email.";
    else if (!isEmailValid) tempErrors.contact = "Please enter a valid email.";

    return tempErrors;
  };

  const handleSubmit = () => {
    const tempErrors = checkInputs();
    setErrors(tempErrors);
    for (const key of Object.keys(values))
      if (tempErrors[key]) {
        return;
      }

    axios
      .post("/report", values)
      .then((res) => {
        onClose();
        toast({
          title: "Report submitted successfuly",
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
      <p className="contact-us" href="/" onClick={handleOpenContactUsModal}>
        Contact Us
      </p>

      <Modal
        size="lg"
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay bg="#c67ace50" />
        <ModalContent>
          <ModalHeader>Contact Us</ModalHeader>
          <ModalCloseButton boxShadow="none" />
          <ModalBody>
            <p style={{ fontSize: ".9rem" }}>
              If you have encountered any issues with logins or registering,
              please let us know immediately with the error information. We will
              do our best to solve your issue as soon as possible. Thank you.
            </p>

            <FormControl id="report-type" my="1rem" isRequired>
              <FormLabel>Type</FormLabel>
              <Select
                placeholder="Please select report type"
                size="sm"
                name="type"
                value={values.type}
                onChange={handleInputs}
              >
                <option value="Refund">Refund</option>
                <option value="Harassment">Harassment</option>
                <option value="Inappropriate Content">
                  Inappropriate Content
                </option>
                <option value="Bug">Bug</option>
                <option value="Other">Other</option>
              </Select>
              <FormHelperText color="red.500" fontSize=".9rem">
                {errors.type}
              </FormHelperText>
            </FormControl>

            <FormControl id="report-subject" my="1rem" isRequired>
              <FormLabel>Subject</FormLabel>
              <Input
                placeholder="Please enter report title"
                size="sm"
                name="subject"
                value={values.subject}
                onChange={handleInputs}
              />
              <FormHelperText color="red.500" fontSize=".9rem">
                {errors.subject}
              </FormHelperText>
            </FormControl>

            <FormControl id="report-description" my="1rem" isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Please enter the reason for reporting"
                size="sm"
                name="description"
                value={values.decription}
                onChange={handleInputs}
                my="0"
              />
              <FormHelperText color="red.500" my="0" fontSize=".9rem">
                {errors.description}
              </FormHelperText>
            </FormControl>

            {/* <FormControl id="report-screenshot" my="1rem">
              <FormLabel>Screenshot</FormLabel>
            </FormControl> */}

            <FormControl id="report-contact-information" my="1rem" isRequired>
              <FormLabel>Your Contact Information</FormLabel>
              <Input
                placeholder="Please enter your email"
                size="sm"
                name="contact"
                value={values.contact}
                onChange={handleInputs}
              />
              <FormHelperText color="red.500" fontSize=".9rem">
                {errors.contact}
              </FormHelperText>
              <FormHelperText fontSize=".8rem">
                We will respond within 24 hours using the provided Email.
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <div className="contact-us-modal-btns">
              <button onClick={onClose}>Close</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ContactUsModal;
