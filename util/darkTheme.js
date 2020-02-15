import breakpoints from './breakpoints';

const darkTheme = {
  bp: breakpoints,
                                    
  dp: value => `${value/16.0}rem`,

  colors: {
    primary050: "#1B5E20",
    primary100: "#2E7D32",
    primary200: "#388E3C",
    primary300: "#43A047",
    primary400: "#4CAF50",
    primary500: "#66BB6A",
    primary600: "#81C784",
    primary700: "#A5D6A7",
    primary800: "#C8E6C9",
    primary900: "#E8F5E9",

    neutral050: "#263238",
    neutral100: "#37474F",
    neutral200: "#455A64",
    neutral300: "#546E7A",
    neutral400: "#607D8B",
    neutral500: "#78909C",
    neutral600: "#90A4AE",
    neutral700: "#B0BEC5",
    neutral800: "#CFD8DC",
    neutral900: "#ECEFF1",

    warning100: "#FF6D00",
    warning200: "#FF9100",
    warning300: "#FFAB40",
    warning400: "#FFD180",
    warning500: "#FFE0B2",

    error100: "#DD2C00",
    error200: "#FF3D00",
    error300: "#FF6E40",
    error400: "#FF9E80",
    error500: "#FFCCBC",

    success100: "#00BFA5",
    success200: "#1DE9B6",
    success300: "#64FFDA",
    success400: "#A7FFEB",
    success500: "#B2DFDB",

    system100: "#37474F",
    system200: "#546E7A",
    system300: "#78909C",
    system400: "#B0BEC5",
    system500: "#CFD8DC",
  },
};

export default darkTheme;
