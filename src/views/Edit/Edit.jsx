import UpdateConsults from "@components/layout/structuring/Edit/UpdateConsult"
import Layout from "@components/layout/Layout"
import TopNavigation from "@components/layout/navigation/TopNavigation"
import MobileNavigation from "@components/layout/navigation/MobileNavigation"
import usePage  from "@services/Providers/PageProvider"
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';


const Edit = () => {
    const { setPage } = usePage();
    setPage("edit")

    return (
        <Layout>
            <TopNavigation />
            <CssBaseline />
            <Box sx={{ m: 1, pb:8 }}>
                <UpdateConsults />
            </Box>
            <MobileNavigation/>
        </Layout>
    )
}

export default Edit;