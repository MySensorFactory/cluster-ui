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
    min-height: 100px;
    grid-column: span 1; // Ensure it only takes up one column

    &:hover {
        background-color: #45a049;
    }
`;
export const AddSensorButton = ({onAddNewSensor}) =>
{
    return (
        <AddSensorButtonContainer onClick={onAddNewSensor}>
            <SvgResizer size={30}>
                <Add/>
            </SvgResizer>
        </AddSensorButtonContainer>
    )
}
