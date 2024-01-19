import React from 'react';
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {Button, Card, Typography} from "@mui/material";
import myImage from '../../img/taeuk.jpg';
import Divider from "@mui/material/Divider";
import {NavLink as RouterNavLink} from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";

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
                    <Card elevation={24} className="template-card" style={{ position: 'absolute', transform: 'translate(-80%)' }}>
                        <Box className="avatar-container" >
                            <Avatar src={myImage} sx={{ width: 230, height: 230, margin: '0 auto' }} />
                            <Typography component="h3" className="font weight" variant="h3" sx={{ p: 3 }}>
                                하태욱
                            </Typography>
                            <Divider sx={{ borderTop: '2px solid #0050FF', width: '20%', margin: '0 auto' }} orientation="horizontal" />
                            <Box>
                                <Typography component="h5" className="font weight" variant="h5" sx={{ p: 3, letterSpacing: '5px' }}>
                                    JAVA DEVELOPER
                                </Typography>
                            </Box>
                            <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white', p: 1 }}>
                                <Link href="https://github.com/hivehoney" target="_blank" underline="none" color="inherit">
                                    <GitHubIcon sx={{ fontSize: 40 }} />
                                </Link>
                            </Box>
                        </Box>
                    </Card>
                    <Box sx={{ paddingLeft: 20 }}>
                        <Typography component="h1" className="font weight" variant="h1" sx={{ mb:5, width: 500 }}>
                            안녕하세요.
                        </Typography>
                        <Typography component="h5" className="font" variant="h5" sx={{ mb:5, width: 550 }}>
                            깊은 지식을 습득하여 지속적인 성장을 위해 일과 학교를 병행하고 있습니다.
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
                        <Typography component="h6" className="font" variant="h6" sx={{ mt: 2, width: 550 }} >
                            적극적인 커뮤니케이션을 추구하여 다양한 직군과 비즈니스 문제를 협업을 통해 정확히 이해하고 프로젝트를 안정적으로 진행합니다.
                        </Typography>
                        <Typography component="h6" className="font" variant="h6" sx={{ mt: 2, width: 550 }}>
                            도전을 두려워하지 않으며 때로는 어려움에 직면하기도 하지만, 이를 소중한 성장의 기회로 여기며 다음 프로젝트의 성공을 위한 발판이라고 생각합니다.
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </>
    );
};

export default About;