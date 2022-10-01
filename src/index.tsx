import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';
import themeColor from './styles/theme';
import GlobalStyle from './styles/global';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={themeColor}>
            <GlobalStyle />
            <App />
        </ThemeProvider>
    </React.StrictMode>,
);

reportWebVitals();
