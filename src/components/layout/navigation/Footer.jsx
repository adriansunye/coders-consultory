import useTheme from "@services/Providers/ThemeProvider"
import { Navbar, Nav, Row, Col } from "react-bootstrap"
import { BiHomeCircle, BiSearch, BiAddToQueue, BiHeart, BiUserCircle } from "react-icons/bi";

const Header = () => {
    const { theme } = useTheme();
    return (
        <>
        <div className="fixed-bottom" bg={theme} variant={theme}>
            <Nav fill defaultActiveKey="/" className="py-5">
                <Nav.Item>
                    <Nav.Link to="/">
                        <BiHomeCircle 
                            size="2em" 
                            color="linear-gradient(rgba(136, 139, 244, 1), rgba(81, 81, 198, 1)"
                        />
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">
                        <BiSearch 
                            size="2em" 
                            color="linear-gradient(rgba(136, 139, 244, 1), rgba(81, 81, 198, 1)"
                        />
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="consult/create" eventKey="link-2">
                        <BiAddToQueue 
                            size="2em" 
                            color="linear-gradient(rgba(136, 139, 244, 1), rgba(81, 81, 198, 1)"
                        />
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="gradient" eventKey="link-2">
                        <BiHeart 
                            size="2em" 
                            color="linear-gradient(rgba(136, 139, 244, 1), rgba(81, 81, 198, 1)"
                        />
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">
                        <BiUserCircle 
                            size="2em" 
                            color="linear-gradient(rgba(136, 139, 244, 1), rgba(81, 81, 198, 1)"
                        />
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            </div>
        </>
    )
}

export default Header;

