import { Button } from "react-bootstrap"
import  useTheme  from "@services/Providers/ThemeProvider"
import Moon from "@assets/moon.svg"
import Sun from "@assets/sun.svg"


function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="button-theme"
        >
            <img
                src={theme === "dark" ? Sun : Moon}
                className="theme-icon"
                alt="theme"
            />
        </Button>
    )
}

export default ThemeSwitcher