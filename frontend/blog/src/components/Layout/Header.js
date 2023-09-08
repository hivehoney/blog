import * as React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Box, Button, Container, CssBaseline,
    Link,
    Toolbar,
    Typography, useScrollTrigger
} from "@mui/material";
import { useDispatch } from "react-redux";
import { NavLink as RouterNavLink } from "react-router-dom";
import { pageId } from "../../redux/slice/pageInfoSlice";

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

export default function Header() {
    const dispatch = useDispatch();

    const handlePageIdChange = (page) => {
        dispatch(pageId(page));
    };

    const navItems = [
        { name: 'Intro', path: '/intro' },
        { name: 'Blog', path: '/blog/tech' },
        { name: 'Contact', path: '/contact' },
        { name: 'Memoirs', path: '/memoirs' },
    ];

    return (
        <React.Fragment>
            <CssBaseline/>
            <ElevationScroll>
                <AppBar id="page-header" sx={{bgcolor: "Black"}}>
                    <Toolbar>
                        <Typography variant="h4" component="div"
                                    sx={{flexGrow: 0.9, display: {xs: 'none', sm: 'block'}, fontWeight: "bold"}}>
                            <Link component={RouterNavLink} to="/" underline="none" color="White" sx={{ml: 10}}
                                  onClick={() => handlePageIdChange("home")}>
                                Hive
                            </Link>
                        </Typography>
                        <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.name}
                                    variant="h5"
                                    sx={{ color: '#fff', fontSize: 16 }}
                                    onClick={() => handlePageIdChange(item.name)}
                                >
                                    <Link
                                        component={RouterNavLink}
                                        to={item.path}
                                        color="inherit"
                                        underline="none"
                                    >
                                        {item.name}
                                    </Link>
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar/>
        </React.Fragment>
    )
}
