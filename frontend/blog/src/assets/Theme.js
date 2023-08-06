import { createTheme } from '@mui/material/styles';

const theme  = createTheme({
    palette: {
        primary: {
            main: '#007BFF',
        },
        secondary: {
            main: '#FFC107',
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
    },
});

export default theme;