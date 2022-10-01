import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InfoPage from './pages/InfoPage';
import SurveyPage from './pages/SurveyPage';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<InfoPage />} />
                <Route path="/survey" element={<SurveyPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
