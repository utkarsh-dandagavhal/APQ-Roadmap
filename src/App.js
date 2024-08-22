import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Assessment from "./Assessment";
import Results from "./Results";

const App = () => {
  return (
    <BrowserRouter basename="/APQ-Roadmap">
      <Routes>
        <Route path="/" element={<Assessment />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
