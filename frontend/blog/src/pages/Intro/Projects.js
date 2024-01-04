import React from 'react';
import Grid from '@mui/material/Grid';
import {Typography} from "@mui/material";
import {Stack} from "@mui/joy";
import Box from "@mui/material/Box";
import CardImageContainer from "../../components/util/CardImageContainer";

const projectsData = [
    {
        date: '2035 - Present',
        position: '에스원 ESP',
        company: 'JNESS(제이니스)',
        description: [
            "I'm a paragraph. Click here to add your own text and edit me.",
            "It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.",
            "I’m a great place for you to tell a story and let your users know a little more about you.",
            "I'm a paragraph. Click here to add your own text and edit me.",
            "It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.",
            "I’m a great place for you to tell a story and let your users know a little more about you.",
            "I'm a paragraph. Click here to add your own text and edit me.",
            "It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font.",
            "I’m a great place for you to tell a story and let your users know a little more about you.",
        ]
    }
];

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
                        <Typography component="h3" className="font" variant="h6" sx={{ mt: 10, mb: 10 }}>
                            I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. I’m a great place for you to tell a story and let your users know a little more about you.
                        </Typography>
                        <Box>
                            {projectsData.map((entry, index) => (
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