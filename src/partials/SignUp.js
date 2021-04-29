import { useState } from "react";
import {
  Input,
  InputGroup,
  Button,
  InputRightElement,
  FormControl,
  FormHelperText,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";
import "./Auth.scss";

const LogIn = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div className="sign-up">
      <FormControl id="signup-email" isRequired my=".5rem">
        <FormLabel>Email</FormLabel>
        <Input
          variant="filled"
          placeholder="Please enter your email"
          size="md"
          autoComplete="off"
        />
        {/* Add text and it will appear, Invalid email/password.. */}
        <FormHelperText color="red.500" mt="0.3rem">
          ...
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
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              variant="ghost"
              mr=".5rem"
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormHelperText color="red.500" mt="0.3rem">
          ...
        </FormHelperText>
      </FormControl>

      <div className="agreement">
        <Checkbox mt=".3rem"></Checkbox>
        <label>
          After checking, you are indicating that you have read and acknowledge
          the <a href="/">E-Pal Platform User Agreement.</a>
        </label>
      </div>

      <button className="main-btn">Sign Up</button>
      <a className="contact-us" href="/">
        Contact Us
      </a>
    </div>
  );
};

export default LogIn;
