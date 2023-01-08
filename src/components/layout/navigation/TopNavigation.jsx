import usePage from "@services/Providers/PageProvider"
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import AdbIcon from '@mui/icons-material/Adb'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { BiGridHorizontal } from "react-icons/bi";
import {AppBar, Box, Toolbar, IconButton, Typography, Container, Avatar, Tooltip} from '@mui/material';
import UserMenu from "@components/layout/navigation/TopNavigationMenus/UserMenu";
import useUserData from "@services/Providers/useUserData";

const settings = ['Profile', 'Account', 'Theme', 'Logout'];

const TopNavigation = () => {
    const { page, setPage } = usePage();
    const { userData, fetchUser } = useUserData();


    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <AppBar position="static" color="default" >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {page}
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            
                            
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    component={RouterLink}
                                    color="inherit"
                                    to="/"
                                    onClick={() => setPage("home")}
                                >
                                    {page !== "home" ? 
                                    <ArrowBackIosNewIcon />
                                    : <BiGridHorizontal/>}
                                </IconButton> 
                            
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            {page}
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={userData && userData.username} src={userData && userData.profile_picture_path} />
                                </IconButton>
                            </Tooltip>
                            <UserMenu settings={settings} handleCloseUserMenu={handleCloseUserMenu} anchorElUser={anchorElUser} />

                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default TopNavigation;

