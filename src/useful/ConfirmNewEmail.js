import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";

const ConfirmNewEmail = () => {
  const { secret } = useParams();
  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    axios
      .post("/confirm-email-change", {
        secret,
      })
      .then((res) => {
        toast({
          title: "Email changed succesfully",
          status: "success",
          duration: 5000,
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
};

export default ConfirmNewEmail;
