import * as React from "react";
import {Outlet, ScrollRestoration} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "../../assets/Theme";
import {useQueryErrorResetBoundary} from "@tanstack/react-query";
import ErrorFallback from "../../common/ErrorFallback";
import {ErrorBoundary} from "react-error-boundary";
import StyledDiv from "../../assets/styles";
import {DarkModeProvider} from "../../assets/useDarkMode";
import {BrowserView, MobileView} from "react-device-detect";
import MobilePage from "../../pages/Mobile/MobilePage";
import {Suspense} from "react";

export default function Layout() {
    const { reset } = useQueryErrorResetBoundary();
    const showFooter = true;

    return (
        <>
            <MobileView>
                <MobilePage />
            </MobileView>
            <BrowserView>
                <DarkModeProvider>
                    <ThemeProvider theme={theme}>
                        <ScrollRestoration />
                        <CssBaseline />
                        <Header />
                        <StyledDiv>
                            <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Outlet showFooter={showFooter} />
                                </Suspense>
                            </ErrorBoundary>
                        </StyledDiv>
                        {showFooter && <Footer />}
                    </ThemeProvider>
                </DarkModeProvider>
            </BrowserView>
        </>
    )
};