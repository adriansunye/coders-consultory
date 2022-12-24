import useTheme  from "@services/Providers/ThemeProvider"
import { MainStyled } from "@components/layout/structuring/Create/MainStyled"
import CreateConsult from "@components/layout/structuring/Create/CreateConsult/CreateConsult"

export const Main = () => {
    const { theme } = useTheme()

    return (
        <MainStyled fluid className={theme}>
            <CreateConsult/>
        </MainStyled>
    )
}