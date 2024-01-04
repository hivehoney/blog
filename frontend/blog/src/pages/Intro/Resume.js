import React from 'react';
import Grid from '@mui/material/Grid';
import {Paper, Typography} from "@mui/material";
import {Stack} from "@mui/joy";
import CardContainer from "../../components/util/CardContainer";
import Box from "@mui/material/Box";

const experienceData = [
    {
        date: '2035 - Present',
        position: '사원',
        company: '사원',
        description: [
            "I'm a paragraph. Click here to add your own text and edit me.",
            "It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.",
            "I’m a great place for you to tell a story and let your users know a little more about you."
        ]
    },{
        date: '2035 - Present',
        position: '사원',
        company: '사원(사원)',
        description: [
            "I'm a paragraph. Click here to add your own text and edit me.",
            "It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.",
            "I’m a great place for you to tell a story and let your users know a little more about you."
        ]
    },
];

const educationData = [
    {
        date: '2035 - Present',
        position: '사원',
        company: '사원(사원)',
        description: [
            "I'm a paragraph. Click here to add your own text and edit me.",
            "It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.",
            "I’m a great place for you to tell a story and let your users know a little more about you."
        ]
    },{
        date: '2035 - Present',
        position: '사원',
        company: '사원(사원)',
        description: [
            "I'm a paragraph. Click here to add your own text and edit me.",
            "It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.",
            "I’m a great place for you to tell a story and let your users know a little more about you."
        ]
    },
];

const skillData = [
    { skill: 'Java' },
    { skill: 'Spring' },
    { skill: 'React' },
];

const Resume = () => {
    return (
        <>
            <Grid container>
                <Grid item xs={12} className="sub-bg-color" sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Stack spacing={2} alignItems="center" sx={{ width: '800px' }}>
                        <Typography component="h3" className="font weight" variant="h3" sx={{ p: 15, display: "flex", alignItems: "center" }}>
                            <div className="flag-bullet" style={{ marginRight: "10px" }} />
                            Resume
                        </Typography>
                        <Box>
                            <Typography component="h5" className="font weight" variant="h5" sx={{ alignSelf: 'flex-start', mb:5 }}>
                                Experience
                            </Typography>
                            {experienceData.map((entry, index) => (
                                <CardContainer sx={{ width: '100%' }} key={index} {...entry} />
                            ))}
                        </Box>
                        <Box>
                            <Typography component="h5" className="font weight" variant="h5" sx={{ alignSelf: 'flex-start', mt:5, mb:5 }}>
                                Education
                            </Typography>
                            {educationData.map((entry, index) => (
                                <CardContainer sx={{ width: '100%' }} key={index} {...entry} />
                            ))}
                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <Paper elevation={3} className="template-card">
                                <Grid container sx={{ padding: 5, justifyContent: 'center', mb: 5 }}>
                                    <Grid item xs={12}>
                                         <Typography variant="h5" className="font weight" sx={{ mb: 2 }}>
                                            Skillset
                                        </Typography>
                                    </Grid>
                                    {skillData.map((entry, index) => (
                                        <Grid item xs={2} sm={4} md={4} key={index} className="font">
                                            {entry.skill}
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