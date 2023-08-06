import Editor from "../components/Blog/Editor";
import { Container, CssBaseline, ThemeProvider, Typography} from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import * as React from "react";

const CustomContainer = styled(Container)(({ theme }) => ({
    backgroundColor: '#FFFFFF', // 원하는 배경색을 지정
}));

const theme = createTheme({
    palette: {
        background: {
            default: '#F9F9F9', // 원하는 배경색을 지정
        },
    },
});

export default function PostEditor() {
    return (
        <>
        <ThemeProvider theme={theme} >
            <CssBaseline />
            <CustomContainer maxWidth="lg" sx={{ paddingTop: 10 }}>
                <Editor />
            </CustomContainer>
        </ThemeProvider>
        </>
    )
};