import styled from "styled-components";
import {Button} from "./CommonStyles";
import {theme} from "./theme";

export const ButtonWithIconContainer = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: transparent;
    font-size: 12px;

    &:hover {
        background-color: ${theme.colors.secondaryHover};
    }
`;