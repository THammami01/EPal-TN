import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import Header from "./partials/Header";

const Example = () => {
  const { toggleColorMode } = useColorMode();
  useEffect(() => {
    toggleColorMode();
  }, []);
  return <></>;
};

const App = () => {
  return (
    <ChakraProvider>
      <Header />
      <Example />
    </ChakraProvider>
  );
};

export default App;
