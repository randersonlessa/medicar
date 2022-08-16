import { DefaultTheme } from 'styled-components';

const Default: DefaultTheme = {
  colors: {
    background: '#FFFFFF', // ? '#E5E5E5',
    white: '#FFFFFF',
    gray1: '#F8F8F8',
    gray2: '#A8A8A8',
    black: '#444444',
    primary: '#49B4BB',
    primaryHover: '#90D3D7',
    secondaryHover: '#D9F1F3',
  },

  breakpoints: {
    mobile: 'max-width: 480px',
    tablet: 'min-width: 481px',
    laptop: 'min-width: 769px',
    desktop: 'min-width: 1025px',
  },
};

export { Default };
