import { Button } from "react-bootstrap"
import { useTheme } from "@mui/material";
import { BsSunFill, BsFillMoonStarsFill } from "react-icons/bs";


function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="button-theme"
        >
            {theme === "dark" ? <BsFillMoonStarsFill/> : <BsSunFill/>}
        </Button>
    )
}

export default ThemeSwitcher