import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      buttons: string;
      icons: string;
      text: string;
      textOnPrimary: string;
      backgroundAlt?: string;
      textOnBackground: string,
    };
    space: {
      sm: string;
      md: string;
      lg: string;
    };
     fonts: {
      body: string;
      heading: string;
      monospace: string;
    };
  }
}
