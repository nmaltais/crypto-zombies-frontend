import { createTheme } from '@mui/material/styles';
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '2px solid #1976d2',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained', 
      },
    },
  },
});
export default lightTheme

