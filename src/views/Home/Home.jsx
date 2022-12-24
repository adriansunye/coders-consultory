import { Main } from "@components/layout/structuring/Home/Main"
import Layout from "@components/layout/Layout"
import usePage  from "@services/Providers/PageProvider"
import Header from "@components/layout/navigation/Header"
import Footer from "@components/layout/navigation/Footer"

const Home = () => {
    const { setPage } = usePage();
    setPage("home")

    return (
        <Layout>
            <Header />
            <Main />
            <Footer/>
        </Layout>
    )
}

export default Home