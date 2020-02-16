import Color from 'color';

const muiTheme = ({ dp, ...theme }) => ({
  typography: {
  
  },

  palette: {
    common: {
      black: theme.colors.neutral900,
      white: theme.colors.neutral050,
    },

    primary: {
      light: theme.colors.primary400,
      dark: theme.colors.primary700,
      main: theme.colors.primary500,
      contrastText: theme.colors.primary100,
    },

    secondary: {
      light: theme.colors.primary700,
      dark: theme.colors.primary400,
      main: theme.colors.primary100,
      contrastText: theme.colors.primary500,
    },

    background: {
      paper: theme.colors.neutral050,
      default: theme.colors.primary050,
    },

    text: {
      primary: theme.colors.neutral900,
    },

    error: {
      light: theme.colors.error500,
      dark: theme.colors.error100,
      main: theme.colors.error400,
      contrastText: theme.colors.neutral050,
    },

    grey: {
      '900': theme.colors.neutral900,
      '800': theme.colors.neutral800,
      '700': theme.colors.neutral700,
      '600': theme.colors.neutral600,
      '500': theme.colors.neutral500,
      '400': theme.colors.neutral400,
      '300': theme.colors.neutral300,
      '200': theme.colors.neutral200,
      '100': theme.colors.neutral100,
      '50' : theme.colors.neutral050,
    },
  },

  overrides: {
    MuiPaper: {
      root: {
        padding: `${dp(24)} ${dp(40)}`,
      },

      rounded: {
        borderRadius: dp(18),
      }
    },
  }
});

export default muiTheme;