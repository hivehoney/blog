import React from 'react';
import Grid from '@mui/material/Grid';
import {Typography} from "@mui/material";
import {Stack} from "@mui/joy";
import Box from "@mui/material/Box";
import CardImageContainer from "../../components/util/CardImageContainer";
import {projectsData1, projectsData2, projectsData3} from "../../api/resume";

const Projects = () => {
    return (
        <>
            <Grid container>
                <Grid item xs={12} className="sub-bg-color" sx={{ display: "flex", justifyContent: "center" }}>
                    <Stack alignItems="center" sx={{ width: "800px" }}>
                        <Typography className="font weight" component="h3" variant="h3" sx={{ mt: 15, display: "flex", alignItems: "center" }}>
                            <div className="flag-bullet" style={{ marginRight: "10px" }} />
                            Projects
                        </Typography>
                        <Box sx={{ width: '100%' }}>
                            <Typography className="font weight blue" variant="h5" sx={{ mt: 10, mb: 2 }}>
                                2021.01 - 2022.09
                            </Typography>
                            <Typography className="font weight" variant="h5" sx={{ mb: 2 }}>
                                (주) 제이니스
                            </Typography>
                            <Typography className="font weight" variant="subtitle1" sx={{ alignSelf: 'flex-start', mb:3 }}>
                                350여 고객사, 약 60만대 PC를 제어하는 근태관리 시스템(PC-OFF) <br />
                                음란물 차단 및 PC 사용시간을 제어하는 자녀보호 프로그램
                            </Typography>
                            {projectsData1.map((entry, index) => (
                                <CardImageContainer sx={{ width: '100%' }} key={index} {...entry} />
                            ))}
                            {projectsData2.map((entry, index) => (
                                <CardImageContainer sx={{ width: '100%' }} key={index} {...entry} />
                            ))}
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <Typography className="font weight" variant="h5" sx={{ mt: 10, mb: 2 }}>
                                개인 프로젝트
                            </Typography>
                            {projectsData3.map((entry, index) => (
                                <CardImageContainer sx={{ width: '100%' }} key={index} {...entry} />
                            ))}
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};

export default Projects;