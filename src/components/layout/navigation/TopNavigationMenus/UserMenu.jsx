
import { Typography, Menu, MenuItem } from '@mui/material';
import { useTheme } from "@mui/material";
import { BsSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import useColorMode from "@services/Providers/ColorModeProvider";

function UserMenu(props) {
    const theme = useTheme();
    const colorMode = useColorMode();

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
                    <Typography textAlign="center" onClick={setting === "Theme" ? colorMode.toggleColorMode : null}>
                        {setting}
                    </Typography>
                </MenuItem>
            ))}
        </Menu>
    );
}

export default UserMenu; 