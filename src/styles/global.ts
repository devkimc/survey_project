import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'NotoSansKR-Bold';
        src: url('assets/fonts/NotoSansKR-Bold.otf') format('otf');
    }
    @font-face {
        font-family: 'NotoSansKR-Regular';
        src: url('assets/fonts/NotoSansKR-Regular.otf') format('otf');
    }

    body {
        min-width: 360px;
        margin: 0 30px;
    }
`;

export default GlobalStyle;
