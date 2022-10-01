import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'NotoSansCJKkr-Bold';
        src: url('fonts/NotoSansCJKkr-Bold.otf') format('opentype');
    }
    @font-face {
        font-family: 'NotoSansCJKkr-Regular';
        src: url('fonts/NotoSansCJKkr-Regular.otf') format('opentype');
    }

    body {
        font-family: 'NotoSansCJKkr-Regular';
        min-width: 300px;
        margin: 0 30px;
    }

    button {
        border: none;
        cursor: pointer;
    }

`;

export default GlobalStyle;
