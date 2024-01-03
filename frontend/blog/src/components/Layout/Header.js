import * as React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    SwipeableDrawer,
    Toolbar,
    Typography,
    useMediaQuery,
    useScrollTrigger
} from "@mui/material";
import {NavLink as RouterNavLink} from "react-router-dom";
import {useRecoilState} from "recoil";
import {tokenState} from "../../common/recoil/GlobalState";
import SegmentIcon from '@mui/icons-material/Segment';
import {Stack} from "@mui/joy";

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
    const [state, setState] = React.useState({ right: false });
    const navItems = [
        {name: 'ABOUT ME', path: '/intro/about'},
        {name: 'RESUME', path: '/intro/resume'},
        {name: 'BLOG', path: '/blog/tech'},
        {name: 'PROJECTS', path: '/intro/projects'},
    ];

    const logoutToken = () => {
        setToken('');
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    // 모바일 영역
    const query = '(min-width:0px) and (max-width:600px)';
    const isMobile = useMediaQuery(query, { noSsr: false });

    const list = (anchor) => (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw'
            }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            className="main-bg-color02"
        >
            <Stack spacing={2} className="main-bg-color02">
                {navItems.map((item) => (
                    <a key={item.name} href={item.path} className="font_bar02">
                        {item.name}
                    </a>
                ))}
            </Stack>
        </Box>
    );

    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll>
                <AppBar id="page-header">
                    <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={RouterNavLink} to="/intro/about">
                            <Typography variant="h4" className="font weight">
                                Hive
                            </Typography>
                        </Button>
                        {isMobile ? (
                            <>
                                <Button onClick={toggleDrawer('right', true)}><SegmentIcon /></Button>
                                <SwipeableDrawer
                                    anchor={'right'}
                                    open={state['right']}
                                    onClose={toggleDrawer('right', false)}
                                    onOpen={toggleDrawer('right', true)}
                                    className="main-bg-color02"
                                >
                                    {list('right')}
                                </SwipeableDrawer>
                            </>
                        ) : (
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                {navItems.map((item, index) => (
                                    <a key={item.name} href={item.path} className="font_bar">
                                        {item.name}
                                    </a>
                                ))}
                                {token ? (
                                    <Button variant="contained" component={RouterNavLink} onClick={logoutToken} className="" style={{ backgroundColor: '#000000', color: '#FFFFFF', borderRadius: '30px' }}>
                                        LOGOUT
                                    </Button>
                                ) : (
                                    <Button variant="contained" component={RouterNavLink} to='/login' className="button" style={{ borderRadius: '30px' }}>
                                        Login
                                    </Button>
                                )}
                            </Box>
                        )}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
        </React.Fragment>
    )
}
