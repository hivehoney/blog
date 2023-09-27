import {Box, CircularProgress, Container, CssBaseline, ThemeProvider} from "@mui/material";
import { Paper, Typography } from '@mui/material';
import React from "react";
import {createTheme, styled} from "@mui/material/styles";
import usePostQuery from "../quires/usePostQuery";
import ErrorPage from "./errorPage";
import {useParams} from "react-router-dom";
import {API} from "../config";
import PostTitle from "../components/Blog/Title";

export default function Post() {
    const { code } = useParams();

    const { data, isLoading, error } = usePostQuery('POST', API.POST, code);

    if (error) return <ErrorPage error />

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <CustomContainer maxWidth="md" sx={{ paddingTop: 10 }}>
                        {isLoading ? (
                            <Box sx={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <PostTitle title={data.title} author={data.author} date={data.postsDate} />
                                <Typography
                                    variant="body1"
                                    dangerouslySetInnerHTML={{
                                        __html: data.contents
                                    }}
                                    sx={{ minHeight: '100vh'}}
                                ></Typography>
                            </>
                        )}
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