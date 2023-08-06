import * as React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Box, Button, Container, CssBaseline,
    Link,
    Toolbar,
    Typography, useScrollTrigger
} from "@mui/material";

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function Header(props) {
    const navItems = ['Intro', 'Blog', 'Contact', 'Memoirs'];

    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar id="page-header" sx={{ bgcolor: "Black" }}>
                    <Toolbar>
                        <Typography variant="h4" component="div"
                                    sx={{flexGrow: 0.9, display: { xs: 'none', sm: 'block' }, fontWeight: "bold"}}>
                            <Link href="/blog/tech" underline="none" color="White" sx={{ml:10}} >Hive</Link>
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item) => (
                                <Button key={item} variant="h5" sx={{ color: '#fff', fontSize: 16 }}>
                                 {item}
                                </Button>
                         ))}
                        </Box>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
        </React.Fragment>
    )
}
