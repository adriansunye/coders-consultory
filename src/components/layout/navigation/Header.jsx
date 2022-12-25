import usePage from "@services/Providers/PageProvider"
import { Nav } from "react-bootstrap"
import { BiHomeCircle, BiSearch, BiAddToQueue, BiHeart, BiUserCircle } from "react-icons/bi";
import { BottomNavigation, BottomNavigationAction, Paper, Link } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import ThemeSwitcher from "@components/eventCallers/ThemeSwitcher"
import { IoIosArrowBack, IoIosArrowUp } from "react-icons/io";
import { ReactComponent as Logo } from '@assets/icons8-old-vmware-logo.svg'



const Header = () => {
    const { page, setPage } = usePage();
    const [value, setValue] = useState(page);

    const handleChange = (event, newValue) => {
        setPage(newValue);
        setValue(newValue);
    };

    return (
        <>
            
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={handleChange}
                >
                    <BottomNavigationAction component={RouterLink} value="home" icon={<IoIosArrowBack />} />
                    <BottomNavigationAction label={page} value="home" />
                    <ThemeSwitcher/>
                </BottomNavigation>
            
        </>
    )
}

export default Header;

