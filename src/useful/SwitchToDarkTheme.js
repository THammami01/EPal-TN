import { useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";

const SwitchToDarkTheme = () => {
  const { toggleColorMode } = useColorMode();
  useEffect(() => {
    toggleColorMode();
  }, []);
  return <></>;
};

export default SwitchToDarkTheme;