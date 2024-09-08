import styled from "styled-components";
import {theme} from "./theme";

export const DateInput = styled.input`
    background-color: ${theme.colors.secondary};
    border: none;
    color: white;
    padding: 10px;
    border-radius: ${theme.sizes.borderRadius};
    width: 150px;

    &::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }
`;