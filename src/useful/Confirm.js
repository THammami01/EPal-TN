import { useEffect } from "react";
import { useToast } from "@chakra-ui/toast";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import SwitchToDarkTheme from "./SwitchToDarkTheme";

const Confirm = () => {
  const { secret } = useParams();
  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    axios
      .post("/confirm", {
        secret,
      })
      .then((res) => {
        toast({
          title: "User confirmed.",
          description: "You can now log in.",
          status: "success",
          duration: 10000,
        });
        history.push("/");
      })
      .catch((err) => {
        if (err.response?.status === 403)
          toast({
            title: "Invalid URL.",
            description: "Please check your inbox and try again.",
            status: "warning",
            duration: 10000,
          });
        else
          toast({
            title: "Error occured.",
            description: "Please try again.",
            status: "warning",
            duration: 10000,
          });
      });
  }, []);
  
  return (
    <>
      <SwitchToDarkTheme />
    </>
  );
};

export default Confirm;
