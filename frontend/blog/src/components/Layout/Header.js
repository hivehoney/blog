import * as React from 'react';
import PropTypes from 'prop-types';
import {AppBar, Box, Button, CssBaseline, Link, Toolbar, Typography, useScrollTrigger} from "@mui/material";
import {NavLink as RouterNavLink} from "react-router-dom";
import {useRecoilState} from "recoil";
import {tokenState} from "../../common/recoil/GlobalState";

function ElevationScroll(props) {
    const {children, window} = props;
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
    const [token, setToken] = useRecoilState(tokenState);
    const navItems = [
        {name: 'Intro', path: '/intro'},
        {name: 'Blog', path: '/blog/tech'},
        {name: 'Contact', path: '/contact'},
        {name: 'Memoirs', path: '/memoirs'},
    ];
    const logoutToken = () => {
        setToken('');
    };

    return (
        <React.Fragment>
            <CssBaseline/>
            <ElevationScroll>
                <AppBar id="page-header" sx={{bgcolor: "Black", height: '80px', justifyContent: 'center'}}>
                    <Toolbar>
                        <Typography variant="h4" component="div"
                                    sx={{flexGrow: 0.9, display: {xs: 'none', sm: 'block'}, fontWeight: "bold"}}>
                            <Link component={RouterNavLink} to="/" underline="none" color="White" sx={{ml: 10}}>
                                Hive
                            </Link>
                        </Typography>
                        <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.name}
                                    variant="h5"
                                    sx={{color: '#fff', fontSize: 16}}
                                    component={RouterNavLink}
                                    to={item.path}
                                    color="inherit"
                                    underline="none"
                                >
                                    {item.name}
                                </Button>
                            ))}
                            {token ? (
                                <Button variant="contained" component={RouterNavLink} onClick={logoutToken}
                                        style={{backgroundColor: '#FFFFFF', color: '#000000', borderRadius: '30px'}}>
                                    LOGOUT
                                </Button>
                            ) : (
                                <Button variant="contained" component={RouterNavLink} to='/login'
                                        style={{backgroundColor: '#FFFFFF', color: '#000000', borderRadius: '30px'}}>
                                    Login
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar/>
        </React.Fragment>
    )
}
