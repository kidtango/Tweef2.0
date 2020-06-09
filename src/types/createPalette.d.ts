import * as createPalette from '@material-ui/core/styles/createPalette';

// Extending the theme palete for custom properties
declare module '@material-ui/core/styles/createPalette' {
  interface TypeBackground {
    dark: string;
  }
}
