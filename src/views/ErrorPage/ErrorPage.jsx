
import Layout from "@components/layout/Layout"
import usePage from "@services/Providers/PageProvider"
import { Box, CssBaseline, Typography } from "@mui/material"

const Login = () => {
    const { setPage } = usePage();
    setPage("error")

    return (
        <Layout>
            <CssBaseline />
            <Box alignItems="center" sx={{ mt:30, backgroundColor: "background.default" }}>
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography gutterBottom variant="title" component="div" color="red">PAGE NOT FOUND</Typography>
                </Box>
            </Box>
        </Layout>
    )
}

export default Login