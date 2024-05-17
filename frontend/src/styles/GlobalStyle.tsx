import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    overflow: ${(props: any) => (props.overflowHidden ? "hidden" : "initial")};
  }
`;

export default GlobalStyle;
