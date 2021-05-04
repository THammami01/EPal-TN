import { useState, useContext, useRef } from "react";
import { AppContext } from "../App";
import {
  Input,
  InputGroup,
  Button,
  InputRightElement,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import ContactUsModal from "./ContactUsModal";
import ForgotPwdModal from "./ForgotPwdModal";
import "./Auth.scss";
import { checkEmail, checkPassword } from "../useful/validation";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const LogIn = ({ onClose }) => {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({ email: "", password: "", token: "" });
  const [errors, setErrors] = useState({ email: "", password: "", token: "" });
  const [loginError, setLoginError] = useState("");
  const { setMainData } = useContext(AppContext);
  const captchaRef = useRef();

  const toggleShowPassword = () => setShow(!show);

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onChangeReCAPTCHA = (token) => {
    setValues({ ...values, token });
  };

  const handleLogin = () => {
    setErrors({ email: "", password: "", token: "" });
    setLoginError("");
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
      .post("/login", values)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.accessToken);
          axios.defaults.headers.common["Authorization"] = res.data.accessToken;

          axios
            .get("/user-data")
            .then((res) => {
              setMainData(res.data);
            })
            .catch((err) => {
            });

          onClose();
        }
      })
      .catch((err) => {
        if (err.response?.status === 403) setLoginError("Invalid logins.");
        else setLoginError("An occor occured.");
      });

    captchaRef.current.reset();
  };

  return (
    <div className="log-in">
      <FormControl id="login-email" isRequired my=".5rem">
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
        {/* Add text and it will appear, Invalid email/password.. */}
        <FormHelperText color="red.500" mt="0.3rem">
          {errors.email}
        </FormHelperText>
      </FormControl>

      <FormControl id="login-password" isRequired my=".5rem">
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

      <ForgotPwdModal />

      <ReCAPTCHA
        ref={captchaRef}
        className="ReCAPTCHA"
        sitekey="6LdIcMMaAAAAAF9aD4bvuTFQA4Bo9G7P7uZp4YLw"
        onChange={onChangeReCAPTCHA}
      />

      <button className="main-btn" onClick={handleLogin}>
        Log In
      </button>
      <p className="login-error">
        {errors.token}
        {loginError}
      </p>

      <ContactUsModal />
    </div>
  );
};

export default LogIn;
