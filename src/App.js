import { ChakraProvider } from "@chakra-ui/react";
import Header from "./partials/Header";
import SwitchToDarkTheme from "./useful/SwitchToDarkTheme";

const App = () => {
  return (
    <ChakraProvider>
      <Header />
      <SwitchToDarkTheme />
    </ChakraProvider>
  );
};

export default App;
