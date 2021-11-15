import { createTheme } from '@mui/material/styles';
const darkTheme = createTheme({
  palette: {
    mode:'dark',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #a4ffa1',
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
export default darkTheme

