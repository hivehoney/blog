import React from 'react';
import { Box, Paper, Grid, Typography } from '@mui/material';

const CardContainer = ({ date, position, company, description }) => (
    <Box sx={{ width: '100%' }}>
        <Paper elevation={3} className="template-card">
            <Grid container sx={{ padding: 5, justifyContent: 'center', alignItems: "center", mb: 5 }}>
                <Grid item xs={6}>
                    <Typography variant="h6" className="font weight blue">
                        {date}
                    </Typography>
                    <Typography variant="h6" className="font weight">
                        {position}
                    </Typography>
                    <Typography variant="h6" className="font weight">
                        {company}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" className="font">
                        {Array.isArray(description)
                            ? description.map((sentence, index) => <React.Fragment key={index}>{sentence}</React.Fragment>)
                            : description}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    </Box>
);

export default CardContainer;
