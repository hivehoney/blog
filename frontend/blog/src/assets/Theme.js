import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    typography: {
        poster: {
            color: "#fff",
            wordWrap: "break-word",
            whiteSpace: 'pre-line'
        }
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    poster: 'h1',
                },
            },
        },
    }
});

export default theme;

export const theme1 = createTheme({
    palette: {
        background: {
            default: '#F9F9F9',
        },
    },
});

export const darkTheme = createTheme({
    HEADER: "#000000",
    MAIN: "#dbd7ff",
    SUB: "#6868AD",
    BACKGROUND: "#202124",
    SUBBACKGROUND: "#30373e",
    TEXT: "#FFFFFF",
})

export const lightTheme = {
    HEADER: "#FFFFFF",
    MAIN: "#6868AD",
    SUB: "#dbd7ff",
    BACKGROUND: "#fdfdff",
    SUBBACKGROUND: "rgb(242, 240, 253)",
    TEXT: "#000000",
}
