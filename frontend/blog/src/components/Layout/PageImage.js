import * as React from "react";
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid";

export default function PageImage({ imgSrc, title }) {
    return (
        <Grid
            item
            alignItems="center"
            xs={12}
            sm={4}
            md={12}
            sx={{
                backgroundImage: `
              linear-gradient(
                    to right, 
                    rgba(0, 0, 0, 0.5),
                    rgba(0, 0, 0, 0.5)
                  ),
              url(${imgSrc})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                minWidth: '100vw',
                position: 'relative',
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    position: 'absolute',
                    color: '#fff',
                    fontSize: '45px',
                    fontWeight: '700',
                    lineHeight: '46px',
                    top: '50%',
                    left: '50%',
                    maxWidth: '500px',
                    wordWrap: 'break-word',
                    textAlign: 'center',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {title}
            </Typography>
        </Grid>
    )
};

