import SignIn from "@components/layout/structuring/Login/SignIn"
import Layout from "@components/layout/Layout"
import usePage from "@services/Providers/PageProvider"
import { CssBaseline } from "@mui/material"

const Login = () => {
    const { setPage } = usePage();
    setPage("login")

    return (
        <Layout>
            <CssBaseline />
            <SignIn />
        </Layout>
    )
}

export default Login