import styled from "styled-components";
import { colorVariables } from '@utils/variables'
import { Container } from "react-bootstrap"

export const MainStyled = styled(Container)`
    .dark{
        background: ${colorVariables.grey};
        color: gray;
    }
`