import React, {useState} from 'react';
import styled from 'styled-components';
import {useAppState} from '../AppStateContext';
import {tryRenderEditBox} from "./TryRenderEditBox";

const ItemContainer = styled.div`
    background: #2a2a36;
    padding: 20px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
`;

const SensorLabel = styled.div`
    font-size: 14px;
    color: #9a9ab0;
    margin-bottom: 5px;
`;

const SensorValue = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: white;
`;

const SensorValueItem = ({label, value, onEdit, onDelete}) => {
    const {homeSubMenu} = useAppState();
    const [isHovered, setIsHovered] = useState(false);

    const sensorValueItemContainerClassName = "sensor-value-item-container"
    const parentSelector = ".".concat(sensorValueItemContainerClassName)

    return (
        <ItemContainer
            className={sensorValueItemContainerClassName}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <SensorLabel>{label}</SensorLabel>
            <SensorValue dangerouslySetInnerHTML={{__html: value}}/>
            {tryRenderEditBox(homeSubMenu, isHovered, onEdit, onDelete, parentSelector)}
        </ItemContainer>
    );
};

export default SensorValueItem;