import useTheme  from "@services/Providers/ThemeProvider"
import { MainStyled } from "@components/layout/structuring/Home/MainStyled"
import ListConsults from "@components/layout/structuring/Home/ListConsults/ListConsults"
import CreateConsults from "@components/layout/structuring/Home/CreateConsults/CreateConsults"

export const Main = () => {
    const { theme } = useTheme()

    return (
        <MainStyled fluid className={theme}>
            <CreateConsults/>
            <ListConsults/>
        </MainStyled>
    )
}