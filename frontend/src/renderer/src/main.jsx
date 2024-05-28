import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { FetchContextProvider } from "./context/FetchContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
        <FetchContextProvider>
          <App />
        </FetchContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);
