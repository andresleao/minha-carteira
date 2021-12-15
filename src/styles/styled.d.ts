import 'styled-component';

declare module 'styled-component' {
  export interface DefaultTheme {
    title: string
    colors: {
      primary: string,
      secondary: string,
      tertiary: string,
      
      white: string,
      black: string,
      grey: string,
  
      success: string,
      info: string,
      warning: string,
    },
  }
}