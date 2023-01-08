import SignUp from "@components/layout/structuring/Registration/SignUp"
import Layout from "@components/layout/Layout"
import usePage from "@services/Providers/PageProvider"
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