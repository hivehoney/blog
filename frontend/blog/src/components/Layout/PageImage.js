import * as React from "react";
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function PageImage({ imgSrc, title, date, author }) {
    return (
        <Grid
            item
            xs={12}
            sm={4}
            md={12}
            sx={{
                backgroundImage: ` linear-gradient(to right, 
                    rgba(0, 0, 0, 0.5),
                    rgba(0, 0, 0, 0.5)
                  ),
              url(${imgSrc})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                minWidth: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{ width: '600px', mx: 'auto', textAlign: 'center' }}>
                <Typography variant="poster">
                    {title}
                </Typography>
                <Typography className="image_font">
                    {date} | {author}
                </Typography>
            </Box>
        </Grid>
    )
};

