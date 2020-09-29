import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import createBreakpoints from './createBreakpoints';

// Create a theme instance.
const theme = createMuiTheme({
    breakpoints: createBreakpoints({
    values: {
      xs: 0,
      sm: 700,
      md: 1024,
      lg: 1440,
      xl: 1920,
    },
  }),
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;