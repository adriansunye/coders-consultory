
import { MainStyled } from "@components/layout/structuring/Home/MainStyled"
import ListConsults from "@components/layout/structuring/Home/ListConsults/ListConsults"

export const Main = () => {

    return (
        <MainStyled fluid className={`mt-5 p-3`} >
            <ListConsults />
        </MainStyled>
    )
}