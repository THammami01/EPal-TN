import { useContext, useRef, useState } from "react";
import {
  Input,
  InputGroup,
  Button,
  InputRightElement,
  FormControl,
  FormHelperText,
  FormLabel,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import "./Auth.scss";
import { AppContext } from "../App";
import { checkEmail, checkPassword } from "../useful/validation";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import ContactUsModal from "./ContactUsModal";

const LogIn = ({ onClose }) => {
  const [show, setShow] = useState(false);
  const toggleShowPassword = () => setShow(!show);
  const [values, setValues] = useState({ email: "", password: "", token: "" });
  const [errors, setErrors] = useState({ email: "", password: "", token: "" });
  const [signupError, setSignupError] = useState("");
  const { setMainData } = useContext(AppContext);
  const captchaRef = useRef();
  const toast = useToast();

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onChangeReCAPTCHA = (token) => {
    setValues({ ...values, token });
  };

  const handleSignup = () => {
    setErrors({ email: "", password: "", token: "" });
    setSignupError("");
    const { email, password, token } = values;
    const currErrors = { email: "", password: "", token: "" };
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checkPassword(password);

    if (email === "") currErrors.email = "Please enter an email";
    else if (!isEmailValid) currErrors.email = "Please enter a valid email";

    if (password === "") currErrors.password = "Please enter a password";
    else if (!isPasswordValid)
      currErrors.password = "Please enter a valid password";

    if (token === "") currErrors.token = "Please verify you're not a robot";

    setErrors(currErrors);

    if (
      email === "" ||
      !isEmailValid ||
      password === "" ||
      !isPasswordValid ||
      token === ""
    )
      return;

    axios
      .post("/signup", values)
      .then((res) => {
        if (res.status === 200) {
          onClose();
          toast({
            title: "A verification email has been sent to you.",
            description: "Please check your inbox.",
            status: "info",
            duration: 15000,
            // isClosable: true,
          });
        }
      })
      .catch((err) => {
        // if (err.response?.status === 403) setSignupError("Unauthorized.");
        // else
        if (err.response?.status === 409)
          setSignupError("User with the same email exists.");
        else setSignupError("An occor occured.");
      });

    captchaRef.current.reset();
  };

  return (
    <div className="sign-up">
      <FormControl id="signup-email" isRequired my=".5rem">
        <FormLabel>Email</FormLabel>
        <Input
          variant="filled"
          placeholder="Please enter your email"
          size="md"
          autoComplete="on"
          name="email"
          value={values.email}
          onChange={handleInputChange}
        />
        <FormHelperText color="red.500" mt="0.3rem">
          {errors.email}
        </FormHelperText>
      </FormControl>

      <FormControl id="signup-password" isRequired my=".5rem">
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            variant="filled"
            type={show ? "text" : "password"}
            placeholder="Please enter your password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={toggleShowPassword}
              variant="ghost"
              mr=".5rem"
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormHelperText color="red.500" mt="0.3rem">
          {errors.password}
        </FormHelperText>
      </FormControl>

      <div className="agreement">
        <Checkbox mt=".3rem" isChecked></Checkbox>
        <label>
          By clicking on Sign Up, you are indicating that you have read and
          acknowledge the{" "}
          <a href="/policies" target="_blank">
            E-Pal Platform User Agreement.
          </a>
        </label>
      </div>

      <ReCAPTCHA
        ref={captchaRef}
        className="ReCAPTCHA"
        sitekey="6LdIcMMaAAAAAF9aD4bvuTFQA4Bo9G7P7uZp4YLw"
        onChange={onChangeReCAPTCHA}
      />

      <button className="main-btn" onClick={handleSignup}>
        Sign Up
      </button>

      <p className="login-error">
        {errors.token}
        {signupError}
      </p>

      <ContactUsModal />
    </div>
  );
};

export default LogIn;
