
import { Typography, Menu, MenuItem } from '@mui/material';
import { useTheme } from "@mui/material";
import { BsSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import useColorMode from "@services/Providers/ColorModeProvider";
import usePage from "@services/Providers/PageProvider"
import { Link as RouterLink } from "react-router-dom";


function UserMenu(props) {
    const theme = useTheme();
    const colorMode = useColorMode();
    const {setPage} = usePage();

    return (
        <Menu
            
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={props.anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(props.anchorElUser)}
            onClose={props.handleCloseUserMenu}
        >
            {props.settings.map((setting) => (
                <MenuItem key={setting} onClick={props.handleCloseUserMenu}>
                    {setting === "Theme" ? <Typography textAlign="center">
                        {
                            theme.palette.mode === "light" ? <BsSunFill /> : <BsFillMoonStarsFill />
                        }
                    </Typography> : null}
                    <Typography sx={{textDecoration: 'none'}} color="text.primary" textAlign="center" 
                        onClick={setting === "Theme" || setting === "Logout"  ? setting === "Theme" 
                            ? colorMode.toggleColorMode 
                            : () => setPage("registration")
                            : null} 
                            component={setting === "Logout"  ? RouterLink : null}
                            to={setting === "Logout"  ? "/login" : null}>
                                {setting}
                    </Typography> 
                </MenuItem>
            ))}
        </Menu>
    );
}

export default UserMenu; 