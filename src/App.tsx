import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InfoPage from "./pages/InfoPage";
import SurveyPage from "./pages/SurveyPage";
import CompletionPage from "./pages/CompletionPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InfoPage />}></Route>
        <Route path="/survey" element={<SurveyPage />}></Route>
        <Route path="/completion" element={<CompletionPage />}></Route>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
