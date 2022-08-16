import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      white: string;
      gray1: string;
      gray2: string;
      black: string;
      primary: string;
      primaryHover: string;
      secondaryHover: string;
    };

    breakpoints: {
      mobile: string;
      tablet: string;
      laptop: string;
      desktop: string;
    };
  }
}
