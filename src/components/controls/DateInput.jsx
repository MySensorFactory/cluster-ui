import styled from "styled-components";

export const DateInput = styled.input`
    background-color: #2a2a36;
    border: none;
    color: white;
    padding: 10px;
    border-radius: 5px;
    width: 150px;

    &::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }
`;
