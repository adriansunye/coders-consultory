import ListCoders from "@components/layout/structuring/SelectCoder/ListCoders"
import Layout from "@components/layout/Layout"
import usePage from "@services/Providers/PageProvider"
import TopNavigation from "@components/layout/navigation/TopNavigation"
import MobileNavigation from "@components/layout/navigation/MobileNavigation"
import {CssBaseline } from "@mui/material"

const SelectCoder = () => {
    const { setPage } = usePage();
    setPage("create")

    return (
        <Layout>
            <TopNavigation />
            <CssBaseline />
            <ListCoders />
            <MobileNavigation />
        </Layout>
    )
}

export default SelectCoder;