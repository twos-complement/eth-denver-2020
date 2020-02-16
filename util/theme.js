import breakpoints from './breakpoints'

const theme = {
  bp: breakpoints,

  dp: value => `${value / 16.0}rem`,

  colors: {
    primary900: '#1B5E20',
    primary800: '#2E7D32',
    primary700: '#388E3C',
    primary600: '#43A047',
    primary500: '#4CAF50',
    primary400: '#66BB6A',
    primary300: '#81C784',
    primary200: '#A5D6A7',
    primary100: '#C8E6C9',
    primary050: '#F8FAF9',

    neutral900: '#263238',
    neutral800: '#37474F',
    neutral700: '#455A64',
    neutral600: '#546E7A',
    neutral500: '#607D8B',
    neutral400: '#78909C',
    neutral300: '#90A4AE',
    neutral200: '#B0BEC5',
    neutral100: '#CFD8DC',
    neutral050: '#FFFFFF',

    warning500: '#FF6D00',
    warning400: '#FF9100',
    warning300: '#FFAB40',
    warning200: '#FFD180',
    warning100: '#FFE0B2',

    error500: '#DD2C00',
    error400: '#FF3D00',
    error300: '#FF6E40',
    error200: '#FF9E80',
    error100: '#FFCCBC',

    success500: '#00BFA5',
    success400: '#1DE9B6',
    success300: '#64FFDA',
    success200: '#A7FFEB',
    success100: '#B2DFDB',

    system500: '#37474F',
    system400: '#546E7A',
    system300: '#78909C',
    system200: '#B0BEC5',
    system100: '#CFD8DC',
  },
}

export default theme
