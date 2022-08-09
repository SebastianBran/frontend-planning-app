import { ThemeProvider } from "@emotion/react";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Authviews from "./pages/Authviews/Authviews";
import Freeviews from "./pages/Freeviews/Freeviews";
import { store } from "./state/store";
import { theme } from "./themes/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Freeviews />} />
              <Route path="auth/*" element={<Authviews />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
