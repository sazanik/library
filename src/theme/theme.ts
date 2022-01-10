import { createTheme } from '@mui/material';
import { indigo } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: indigo[300],
    },
  },
  shape: {
    borderRadius: 6,
  },

  typography: {
    fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
});
