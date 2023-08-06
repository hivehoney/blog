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
                    p: 6,
                }}
                component="footer"
            >
                <Container maxWidth="sm">
                    <Typography variant="body2" color="text.secondary" align="center">
                        {"Copyright © "}
                        <Link color="inherit" href="https://www.hive.com/">
                            https://www.hive.com/
                        </Link>{" "}
                        {new Date().getFullYear()}
                        {"."}
                    </Typography>
                </Container>
            </Box>
        </>
    )
};