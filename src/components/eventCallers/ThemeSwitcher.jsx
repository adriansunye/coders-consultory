import { Button } from "react-bootstrap"
import { useTheme } from "@mui/material";
import { BsSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import React from "react";
import useColorMode from "@services/Providers/ColorModeProvider";


function ThemeSwitcher() {
    const theme = useTheme();
    const colorMode = useColorMode();

    return (
        <Button
        onClick={colorMode.toggleColorMode}
            className="button-theme"
        >
            {theme.palette.mode === "dark" ? <BsFillMoonStarsFill/> : <BsSunFill/>}
        </Button>
    )
}

export default ThemeSwitcher