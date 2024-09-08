import styled from "styled-components";
import {Button, FlexContainer} from "./CommonStyles";
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

export const AddButtonContainer = styled(FlexContainer)`
    align-items: center;
    justify-content: center;
    background: ${theme.colors.primary};
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${(props) => props.hoverBackground || theme.colors.primaryHover};
        cursor: pointer;
    }
`;