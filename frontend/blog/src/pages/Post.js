import {Box, CircularProgress, Container, CssBaseline, ThemeProvider} from "@mui/material";
import React from "react";
import {createTheme, styled} from "@mui/material/styles";
import usePostQuery from "../quires/usePostQuery";
import ErrorPage from "./errorPage";
import {useParams} from "react-router-dom";

export default function Post() {
    const { code } = useParams();
    const { data, error, isLoading } = usePostQuery({ data: code });

    if (error) return <ErrorPage error />

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <CustomContainer maxWidth="md" sx={{ paddingTop: 10 }}>
                    <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress />
                    </Box>
                </CustomContainer>
            </ThemeProvider>
        </>
    );
}

const CustomContainer = styled(Container)(({ theme }) => ({
    backgroundColor: '#FFFFFF',
}));

const theme = createTheme({
    palette: {
        background: {
            default: '#F9F9F9',
        },
    },
});