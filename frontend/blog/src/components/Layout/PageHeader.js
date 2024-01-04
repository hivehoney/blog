import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";

export default function PageHeader({ title }) {
    return (
        <Grid container minHeight={280} alignItems="center">
            <Grid item xs={12}>
                <Typography component="h3" variant="h3" className="font weight" sx={{p: 5, textAlign: 'center'}}>
                    {title}
                </Typography>
            </Grid>
        </Grid>
    )
};

