import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body, input {
    background: ${(props) => props.theme.colors.background};
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: #C4C4C4;
  }

  button {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: #C4C4C4;
  }

  .ReactModal__Overlay--after-open {
    background-color: rgb(68, 68, 68, 0.75) !important;
  }

  .ReactModal__Content {
    margin: 0 auto;
    padding: 0 !important;
    max-width: 480px;
    max-height: 520px;
    border: none !important;
    border-radius: 0 !important;
    background-color: ${(props) => props.theme.colors.white};

    @media (${(props) => props.theme.breakpoints.laptop}){
      max-height: 420px;
    }
  }
`;
