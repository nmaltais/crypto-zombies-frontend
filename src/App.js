import React, { useState } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import Home from "./components/Home";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LightTheme from "./components/themes/LightTheme";
import DarkTheme from "./components/themes/DarkTheme";

function getLibrary(provider) {
  return new Web3(provider);
}

function App() {
  const [isUsingLightTheme, setIsUsingLightTheme] = useState(false);
  const toggleTheme = () => {
    setIsUsingLightTheme((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isUsingLightTheme ? LightTheme : DarkTheme}>
      <CssBaseline />
      <Web3ReactProvider getLibrary={getLibrary}>
        <Home toggleTheme={toggleTheme} />
      </Web3ReactProvider>
    </ThemeProvider>
  );
}

export default App;
