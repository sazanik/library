import { createTheme } from '@mui/material';
import { indigo } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[300],
    },
  },
});

export default {
  theme,
  box: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as const,
};
