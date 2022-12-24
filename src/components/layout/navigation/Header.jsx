import useTheme from "@services/Providers/ThemeProvider"
import usePage from "@services/Providers/PageProvider"

import ThemeSwitcher from "@components/eventCallers/ThemeSwitcher"
import { IoIosArrowBack, IoIosArrowUp } from "react-icons/io";
import { ReactComponent as Logo } from '@assets/icons8-old-vmware-logo.svg'
import { NavStyled } from "@components/layout/navigation/HeaderStyled";

const Header = () => {
    const { theme } = useTheme();
    const { page } = usePage();
    return (
        <>
            <div className={`py-2 fixed-top bg-${theme} navbar-${theme}`}>
                <NavStyled fill defaultActiveKey="/">
                    <NavStyled.Item>
                        <NavStyled.Link href={page ==="home" ? "/" : "/"}>
                            {page === "home" ?  
                                <IoIosArrowUp 
                                    size="2em" 
                                    color={theme === "dark" ? "rgba(136, 139, 244, 1)" : "rgba(81, 81, 198, 1)"}
                                /> : 
                                <IoIosArrowBack
                                    size="2em"
                                    color={theme === "dark" ? "rgba(136, 139, 244, 1)" : "rgba(81, 81, 198, 1)"}
                                />}
                        </NavStyled.Link>
                    </NavStyled.Item>
                    <NavStyled.Item className={page ==="home" ? "" : "align-center"} color={theme === "dark" ? "rgba(136, 139, 244, 1)" : "rgba(81, 81, 198, 1)"}>
                        {page === "home" ? <Logo /> : page}
                    </NavStyled.Item>
                    <NavStyled.Item>
                        <ThemeSwitcher />
                    </NavStyled.Item>
                </NavStyled>
            </div>
        </>
    )
}

export default Header;