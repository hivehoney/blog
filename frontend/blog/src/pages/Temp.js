import * as React from 'react';
import {CssBaseline, ThemeProvider, Typography} from "@mui/material";
import {theme1} from "../assets/Theme";

export default function Temp() {
    return (
        <>
            <ThemeProvider theme={theme1}>
                <CssBaseline />
                <div id="circle" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {/*<img width="100" height="100" src="https://img.icons8.com/emoji/96/hammer-and-wrench.png" alt="hammer-and-wrench" />*/}
                    <Typography gutterBottom variant="h2">
                        페이지
                    </Typography>
                    <Typography gutterBottom variant="h3">
                        <span style={{ color: 'red' }}>오픈 준비중</span>입니다.
                    </Typography>
                </div>
            </ThemeProvider>
        </>
    );
}
