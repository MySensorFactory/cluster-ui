import styled from "styled-components";
import SvgResizer from "react-svg-resizer";
import Add from "../../assets/Add";
import React from "react";

const AddSensorButtonContainer = styled.div`
    background-color: #4CAF5080;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;
    font-size: 24px;
    transition: background-color 0.3s ease;
    min-height: 90px;

    &:hover {
        background-color: #45a049;
    }
`;
export const AddSensorButton = ({onButtonClicked}) =>
{
    return (
        <AddSensorButtonContainer onClick={onButtonClicked}>
            <SvgResizer size={45}>
                <Add/>
            </SvgResizer>
        </AddSensorButtonContainer>
    )
}
