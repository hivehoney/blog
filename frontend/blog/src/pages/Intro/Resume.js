import React from 'react';
import Grid from '@mui/material/Grid';
import {Button, Paper, Typography} from "@mui/material";
import {Stack} from "@mui/joy";
import CardContainer from "../../components/util/CardContainer";
import Box from "@mui/material/Box";
import {educationData, experienceData, skillData} from "../../api/resume";
import {axiosAPI} from "../../api/api";
import {API} from "../../config";

const Resume = () => {
    const downloadPdf = () => {
        axiosAPI.get(`${API.DownloadPdf}/resume`, {
            responseType: 'blob',
        }).then(response => {
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;

            link.setAttribute('download', '하태욱_이력서.pdf');

            document.body.appendChild(link);
            link.click();
            link.remove();
        });
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12} className="sub-bg-color" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Stack spacing={2} alignItems="center">
                        <Typography component="h3" className="font weight" variant="h3" sx={{ p: 15, display: "flex", alignItems: "center" }}>
                            <div className="flag-bullet" style={{ marginRight: "10px" }} />
                            Resume
                        </Typography>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
                                <Typography component="h5" className="font weight" variant="h5">
                                    Experience
                                </Typography>
                                <Button variant="contained" color="primary" onClick={downloadPdf} sx={{ borderRadius: 30 }}>
                                    Download Resume
                                </Button>
                            </Box>
                            {experienceData.map((entry, index) => (
                                <CardContainer key={index} {...entry} />
                            ))}
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <Typography component="h5" className="font weight" variant="h5" sx={{ alignSelf: 'flex-start', mt:5, mb:5 }}>
                                Education
                            </Typography>
                            {educationData.map((entry, index) => (
                                <CardContainer key={index} {...entry} />
                            ))}
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <Paper elevation={3} className="template-card">
                                <Grid container sx={{ padding: 5, mb: 5 }}>
                                    <Grid item xs={12}>
                                         <Typography variant="h5" className="font weight" sx={{ mb: 2 }}>
                                            Skillset
                                        </Typography>
                                    </Grid>
                                    {skillData.map((entry, index) => (
                                        <Grid item key={index} md={3} xs={12}>
                                            <Typography variant="h6" className="font weight" sx={{ mb: 2 }}>
                                                <Box component="ul" aria-labelledby="category-d" sx={{ pl: 2 }}>
                                                    <li>{entry.skill}</li>
                                                </Box>
                                            </Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Paper>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
};

export default Resume;