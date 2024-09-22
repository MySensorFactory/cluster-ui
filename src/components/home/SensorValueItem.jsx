import React, {useState} from 'react';
import Card from 'antd/es/card/Card'
import Typography from 'antd/es/typography/Typography'
import {useAppState} from '../AppStateContext';
import {theme} from '../styles/theme';
import {tryRenderEditBox} from "../controls/TryRenderEditBox";

const {Text} = Typography;

export const SensorValueItem = ({label, value, onEdit, onDelete}) => {
    const {homeSubMenu} = useAppState();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Card
            hoverable
            style={{
                marginBottom: theme.sizes.marginBottom.small,
                position: 'relative',
                backgroundColor: theme.colors.secondary,
                borderColor: theme.colors.border,
                height: '105px'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Text style={{color: theme.colors.textMuted, display: 'block'}}>{label}</Text>
            <Text style={{color: theme.colors.text, fontSize: theme.fonts.sizes.medium}}>
                {value}
            </Text>
            {tryRenderEditBox(homeSubMenu, isHovered, onEdit, onDelete)}
        </Card>
    );
};