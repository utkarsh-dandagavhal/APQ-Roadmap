// index.js
import React from "react";
import ReactDOM from "react-dom/client"; // Note the import from 'react-dom/client'
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create a root element
root.render(<App />);
