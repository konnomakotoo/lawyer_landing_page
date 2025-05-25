import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      text: string;
      textOnPrimary: string;
      backgroundAlt: string;
    };
    space: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}
