import useTheme  from "@services/Providers/ThemeProvider"
import { MainStyled } from "@components/layout/structuring/Edit/MainStyled"
import UpdateConsults from "@components/layout/structuring/Edit/UpdateConsult/UpdateConsult"

export const Main = () => {
    const { theme } = useTheme()

    return (
        <MainStyled fluid className={theme}>
            <UpdateConsults/>
        </MainStyled>
    )
}