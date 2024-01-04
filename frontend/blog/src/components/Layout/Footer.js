import {Box, Container, Link, Typography} from "@mui/material";

export default function Footer() {

    return (
        <>
            <Box component="footer">
                <Container maxWidth="lg">
                    <Typography variant="body2" className="font weight" align="center">
                        {"Copyright © by Taeuk Ha"}<br />
                        <Link href="http://tae-uk.com" className="font weight" sx={{textDecoration: 'none'}}>
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