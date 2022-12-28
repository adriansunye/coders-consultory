import SignUp from "@components/layout/structuring/Registration/SignUp"
import Layout from "@components/layout/Layout"
import usePage from "@services/Providers/PageProvider"
import TopNavigation from "@components/layout/navigation/TopNavigation"
import MobileNavigation from "@components/layout/navigation/MobileNavigation"
import { CssBaseline } from "@mui/material"

const Registration = () => {
    const { setPage } = usePage();
    setPage("registration")

    return (
        <Layout>
            <CssBaseline />
            <SignUp />
        </Layout>
    )
}

export default Registration