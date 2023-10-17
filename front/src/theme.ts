import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'white',
          },
          '& .MuiOutlinedInput-input': {
            color: 'white',
          },
        },
      },
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
  },
});

export default theme;
