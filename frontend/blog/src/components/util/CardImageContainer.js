import React from 'react';
import {Grid, Paper, Typography} from '@mui/material';

const CardImageContainer = ({ date, position, company, description, color }) => (
    <Paper elevation={24} className="template-card4">
        <Grid container sx={{ justifyContent: 'flex-start', mb: 8 }}>
            <div className="flag-indicator" style={{ position: 'absolute', transform: 'translateY(100%)', backgroundColor: color }} />
            <Grid item xs={4} sx={{ padding: 5 }}>
                <Typography variant="h6" className={`font weight blue`}>
                    {date}
                </Typography>
                <Typography variant="h6" className="font weight" dangerouslySetInnerHTML={{ __html: position }} />
                <Typography variant="h6" className="font" dangerouslySetInnerHTML={{ __html: company }}></Typography>
            </Grid>
            <Grid item xs={8} sx={{ padding: 5 }}>
                <Typography variant="body1" className="font" sx={{'& li': { marginBottom: '0.5em'}}} dangerouslySetInnerHTML={{ __html: description }} />
            </Grid>
        </Grid>
    </Paper>
);

export default CardImageContainer;