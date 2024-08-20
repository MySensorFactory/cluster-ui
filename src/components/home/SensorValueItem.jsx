import React, {useState} from 'react';
import {Container, Text} from '../styles/CommonStyles';
import {useAppState} from '../AppStateContext';
import {tryRenderEditBox} from "./TryRenderEditBox";
import {theme} from '../styles/theme';

export const SensorValueItem = ({label, value, onEdit, onDelete}) => {
    const {homeSubMenu} = useAppState();
    const [isHovered, setIsHovered] = useState(false);

    const sensorValueItemContainerClassName = "sensor-value-item-container";
    const parentSelector = ".".concat(sensorValueItemContainerClassName);

    return (
        <Container
            background={theme.colors.secondary}
            className={sensorValueItemContainerClassName}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            position={'relative'}
            overflow={'hidden'}
        >
            <Text color={theme.colors.textMuted}>{label}</Text>
            <Text size={theme.fonts.sizes.large} dangerouslySetInnerHTML={{__html: value}}/>
            {tryRenderEditBox(homeSubMenu, isHovered, onEdit, onDelete, parentSelector)}
        </Container>
    );
};