import React, {useState} from 'react';
import styled from 'styled-components';
import {useAppState} from '../AppStateContext';
import Edit from "../../assets/Edit";
import Delete from "../../assets/Delete";
import SvgResizer from "react-svg-resizer";

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

const HoverOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(95, 36, 36, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;

    ${ItemContainer}:hover & {
        opacity: 1;
    }
`;

const OverlayButton = styled.button`
    width: 60px;
    height: 60px;
    background-color: #1C1C21;
    border: none;
    padding: 5px 10px;
    margin: 0 5px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background-color: #e0e0e0;
    }
`;

const SensorValueItem = ({label, value, onEdit, onDelete}) => {
    const {homeSubMenu} = useAppState();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <ItemContainer
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <SensorLabel>{label}</SensorLabel>
            <SensorValue dangerouslySetInnerHTML={{__html: value}}/>
            {homeSubMenu === 'edit' && isHovered && (
                <HoverOverlay>
                    <OverlayButton onClick={onEdit}>
                        <SvgResizer size={40}>
                            <Edit/>
                        </SvgResizer>
                    </OverlayButton>
                    <OverlayButton onClick={onDelete}>
                        <SvgResizer size={5}>
                            <Delete/>
                        </SvgResizer>
                    </OverlayButton>
                </HoverOverlay>
            )}
        </ItemContainer>
    );
};

export default SensorValueItem;