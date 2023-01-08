import { Helmet } from "react-helmet"
import {useTheme }from '@mui/material/styles'

const Layout = ({ children }) => {
    
    return (
        <>
            <Helmet>
                
            </Helmet>
            {children}
        </>
    )
}

export default Layout