import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';

type GlobalThemeType = {
    theme: ThemeType;
};

const GlobalStyle = createGlobalStyle<GlobalThemeType>`
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
        font-size: 16px;
        min-width: 300px;
        margin: 0 30px;
    }

    button {
        border: none;
        cursor: pointer;
    }

    a {
        text-decoration: none;
        color: ${props => props.theme.black};
    }
`;

export default GlobalStyle;
