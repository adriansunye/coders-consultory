import { Main } from "@components/layout/structuring/Create/Main"
import Layout from "@components/layout/Layout"
import usePage  from "@services/Providers/PageProvider"
import Header from "@components/layout/navigation/Header"
import Footer from "@components/layout/navigation/Footer"

const Create = () => {
    const { setPage } = usePage();
    setPage("create")

    return (
        <Layout>
             <Header />
            <Main />
            <Footer/>
        </Layout>
    )
}

export default Create;