import usePage from "@services/Providers/PageProvider"

import ThemeSwitcher from "@components/eventCallers/ThemeSwitcher"
import { IoIosArrowBack, IoIosArrowUp } from "react-icons/io";
import { ReactComponent as Logo } from '@assets/icons8-old-vmware-logo.svg'
import { NavStyled } from "@components/layout/navigation/HeaderStyled";

const Header = () => {
    const { page } = usePage();
    return (
        <>
            <div className={`py-2 fixed-top`}>
                <NavStyled fill defaultActiveKey="/">
                    <NavStyled.Item>
                        <NavStyled.Link href={page ==="home" ? "/" : "/"}>
                            {page === "home" ?  
                                <IoIosArrowUp 
                                    size="2em" 
                                    
                                /> : 
                                <IoIosArrowBack
                                    size="2em"
                                />}
                        </NavStyled.Link>
                    </NavStyled.Item>
                    <NavStyled.Item className={page ==="home" ? "" : "align-center"} >
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