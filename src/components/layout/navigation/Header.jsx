import useTheme  from "@services/Providers/ThemeProvider"
import { Form, Navbar, Nav, FormControl, Button } from "react-bootstrap"
import ThemeSwitcher from "@components/eventCallers/ThemeSwitcher"

const Header = () => {
    const { theme } = useTheme();
    return (
        <>
          <Navbar bg={theme} variant={theme}>
            <Navbar.Brand href="#home">Logo</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <ThemeSwitcher/>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info" className="search-button">
                Search
              </Button>
            </Form>
          </Navbar>
        </>
    )
}

export default Header;