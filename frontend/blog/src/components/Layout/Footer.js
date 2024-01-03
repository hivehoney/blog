import {Box, Container, Link, Typography} from "@mui/material";

export default function Footer() {

    return (
        <>
            <Box
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                    p: 5,
                }}
                component="footer"
            >
                <Container maxWidth="xs">
                    <Typography variant="body2" color="text.secondary" align="center">
                        {"Copyright © "}
                        <Link color="inherit" href="http://tae-uk.com">
                            http://tae-uk.com
                        </Link>{" "}
                        {new Date().getFullYear()}
                        {"."}
                    </Typography>
                </Container>
            </Box>
        </>
    )
};