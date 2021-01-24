import { createGlobalStyle } from 'styled-components';

import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html,
    body{
        font-family: 'Poppins', sans-serif;
        width: 100%;
        background-color: ${theme.colors.background};
    }

    button {
        outline: 0;
    }

    .react-tiny-popover-container {
        z-index: 2;
    }
`;
