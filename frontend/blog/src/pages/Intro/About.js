import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {Button, Typography} from "@mui/material";
import myImage from '../../img/taeuk.jpg';
import Divider from "@mui/material/Divider";
import {NavLink as RouterNavLink} from "react-router-dom";

const About = () => {
    return (
        <>
            <Grid container className="main-bg-color">
                <Grid item xs={5} className="sub-bg-color" />
                <Box
                    sx={{ position: 'relative', display: 'flex',
                        '& > :not(style)': {
                            m: 1,
                            width: 400,
                            height: 550,
                        },
                    }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Paper elevation={3} className="template-card" style={{ position: 'absolute', transform: 'translate(-90%)' }}>
                        <Box className="avatar-container">
                            <Avatar src={myImage} sx={{ width: 230, height: 230 }} />
                            <Typography component="h3" className="font weight" variant="h3" sx={{ p: 5 }}>
                                하태욱
                            </Typography>
                            <Divider sx={{ borderTop: '2px solid #0050FF', width: '20%' }} orientation="horizontal" />
                            <Typography component="h5" className="font weight" variant="h5" sx={{ p: 3, letterSpacing: '5px' }} >
                                JAVA DEVELOPER
                            </Typography>
                        </Box>
                    </Paper>
                    <Box sx={{ paddingLeft: 10 }}>
                        <Typography component="h1" className="font weight" variant="h1" sx={{ mb:3 }}>
                            Hello
                        </Typography>
                        <Typography component="h4" className="font" variant="h4" sx={{ mb:5 }}>
                            Here's who I am & what I do
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Button
                                variant="contained"
                                component={RouterNavLink}
                                to="/intro/resume"
                                className="button"
                                sx={{ borderRadius: '30px', fontSize: '18px', padding: '1px 50px', marginRight: '10px' }}
                            >
                                RESUME
                            </Button>
                            <Button
                                variant="contained"
                                component={RouterNavLink}
                                to="/intro/projects"
                                className="button"
                                sx={{ borderRadius: '30px', fontSize: '18px', padding: '1px 50px' }}
                            >
                                PROJECT
                            </Button>
                        </Box>
                        <Typography component="h5" className="font" variant="h5" sx={{ mt: 3 }} >
                            Here's who I am & what I do
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </>
    );
};

export default About;