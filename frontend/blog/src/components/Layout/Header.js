import * as React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Box, Button, CssBaseline,
    Divider,
    Drawer,
    IconButton, Link,
    List,
    ListItem, ListItemButton,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";

const drawerWidth = 240;
const navItems = ['Intro', 'Blog', 'Contact'];

function Header(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    /*const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                하태욱1
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );*/
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="static" component="nav" sx={{ bgcolor: "Black", height: '70px' }}>
                <Toolbar color="Black">
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{flexGrow: 0.9, display: { xs: 'none', sm: 'block' }, fontWeight: "bold"}}
                    >
                        <Link href="/blog/tech" underline="none" color="White" sx={{ml:10}}>Hive</Link>
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#fff', fontSize: 16 }}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>


           {/* <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
                </Typography>
            </Box>*/}
        </Box>
    );
}

Header.propTypes = {
    window: PropTypes.func,
};

export default Header;
