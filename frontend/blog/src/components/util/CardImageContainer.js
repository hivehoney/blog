import React from 'react';
import {Grid, Paper, Typography} from '@mui/material';

const CardImageContainer = ({ date, position, company, description }) => (
    <Paper elevation={3}>
        <Grid container sx={{ justifyContent: 'flex-start', mb: 10 }}>
            <div className="flag-indicator" style={{ position: 'absolute', transform: 'translateY(100%)' }} />
            <Grid item xs={5} sx={{ padding: 5 }}>
                <Typography variant="h6" className="font weight blue">
                    {date}
                </Typography>
                <Typography variant="h6">{position}</Typography>
                <Typography variant="h6">{company}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body1">
                    {Array.isArray(description) ? (
                        description.map((sentence, index) => <p key={index}>{sentence}</p>)
                    ) : (
                        description
                    )}
                </Typography>
            </Grid>
        </Grid>
    </Paper>
);


export default CardImageContainer;