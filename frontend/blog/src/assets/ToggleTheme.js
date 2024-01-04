import React from 'react';
import {useDarkMode} from "./useDarkMode";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from "@mui/material/IconButton";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/material";

export default function ToggleTheme() {
    const { darkMode, toggleDarkMode } = useDarkMode();

    // 동적으로 변경될 테마
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: darkMode ? "#ffffff" : '#000', // primary 색상 변경
            },
        },
        typography: {
            fontSize: 18,
        },
    });

    const handleToggle = () => {
        toggleDarkMode();
    };

    return (
        <ThemeProvider theme={theme}>
            <IconButton
                onClick={handleToggle}
                color="primary"
                aria-label="toggle dark mode"
            >
                {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
        </ThemeProvider>
    );
}