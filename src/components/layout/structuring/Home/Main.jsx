import useTheme  from "@services/Providers/ThemeProvider"
import { MainStyled } from "@components/layout/structuring/Home/MainStyled"
import ListConsults from "@components/layout/structuring/Home/ListConsults/ListConsults"

export const Main = () => {
    const { theme } = useTheme()

    return (
        <MainStyled fluid className={theme}>
            <ListConsults/>
        </MainStyled>
    )
}