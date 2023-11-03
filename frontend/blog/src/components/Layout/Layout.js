import * as React from "react";
import {Outlet} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "../../assets/Theme";
import StyledDiv from "../../assets/styles";

export default function Layout() {
    const showFooter = true;

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <StyledDiv>
                    <Outlet showFooter={showFooter} />
                </StyledDiv>
                {showFooter && <Footer />}
            </ThemeProvider>
        </>
    )
};