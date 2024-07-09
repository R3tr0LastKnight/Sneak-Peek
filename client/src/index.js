import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <GoogleOAuthProvider clientId="11348802405-f8mp3d9tbf5f839mh7qf1k6oo9csec36.apps.googleusercontent.com">
        <ToastContainer theme="dark" autoClose={900} />
        <App />
      </GoogleOAuthProvider>
    </AuthProvider>
  </BrowserRouter>
);

reportWebVitals();
