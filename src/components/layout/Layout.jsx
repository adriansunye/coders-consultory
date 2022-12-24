import Header from "@components/layout/navigation/Header"
import Footer from "@components/layout/navigation/Footer"
import { Helmet } from "react-helmet"
import useTheme from "@services/Providers/ThemeProvider"

const Layout = ({ children }) => {
    const { theme } = useTheme()
    const bg =
        theme === "dark"
            ? "body {background-color: #404042; color: gray;}"
            : "body {background-color: #fff; color: #000;}"
    return (
        <>
            <Helmet>
                <style>{bg}</style>
            </Helmet>
            <Header />
            {children}
            <Footer/>
        </>
    )
}

export default Layout