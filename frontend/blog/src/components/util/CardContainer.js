import React from 'react';
import { Box, Paper, Grid, Typography } from '@mui/material';

const CardContainer = ({ date, position, company, description }) => (
    <Box>
        <Paper elevation={24} className="template-card4">
            <Grid container sx={{ padding: 5, justifyContent: 'center', alignItems: "center", mb: 8 }}>
                <Grid item xs={5}>
                    <Typography variant="h5" className="font weight blue" sx={{mb:1}}>
                        {date}
                    </Typography>
                    <Typography variant="h5" className="font weight">
                        {position}
                    </Typography>
                    <Typography variant="h6" className="font">
                        {company}
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography variant="body1" className="font" dangerouslySetInnerHTML={{ __html: description }} />
                </Grid>
            </Grid>
        </Paper>
    </Box>
);

export default CardContainer;
