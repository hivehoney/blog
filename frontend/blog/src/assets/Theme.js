import {createTheme} from '@mui/material/styles';

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

export const theme1 = createTheme({
    palette: {
        background: {
            default: '#F9F9F9',
        },
    },
});