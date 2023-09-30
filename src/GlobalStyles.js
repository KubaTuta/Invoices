const { createGlobalStyle } = require("styled-components");

export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    background-color: #00965E;
    text-color: white;
  }
  *, ::before, ::after {
    box-sizing: inherit;
  }

  #root {
    font-family: 'Genos', sans-serif;
    font-weight: 400;
    font-size: 1.1em;
    letter-spacing: 0.08em;
    color: white;
    line-height: 2;
  }
  `