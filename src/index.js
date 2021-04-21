import React from "react";
import ReactDOM from "react-dom";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./useful/theme";
import "./index.scss";
import App from "./App";

ReactDOM.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </>,
  document.getElementById("root")
);
