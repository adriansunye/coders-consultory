import CreateConsult from "@components/layout/structuring/Create/CreateConsult"
import Layout from "@components/layout/Layout"
import usePage from "@services/Providers/PageProvider"
import TopNavigation from "@components/layout/navigation/TopNavigation"
import MobileNavigation from "@components/layout/navigation/MobileNavigation"
import Box from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

const Create = () => {
    const { setPage } = usePage();
    setPage("create")

    return (
        <Layout>
            <TopNavigation />
            <CssBaseline />
            <Box sx={{ m: 1, pb:8 }}>
                <CreateConsult />
            </Box>
            <MobileNavigation />
        </Layout>
    )
}

export default Create;