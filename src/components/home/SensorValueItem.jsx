import React, {useState} from 'react';
import Card from 'antd/es/card/Card'
import Typography from 'antd/es/typography/Typography'
import {useAppState} from '../AppStateContext';
import {theme} from '../styles/theme';
import Edit from "../../assets/Edit";
import Delete from "../../assets/Delete";
import Button from "antd/es/button";
import Space from "antd/es/space";

const {Text} = Typography;

export const SensorValueItem = ({label, value, onEdit, onDelete}) => {
    const {homeSubMenu} = useAppState();
    const [isHovered, setIsHovered] = useState(false);

    const renderEditBox = () => {
        if (homeSubMenu !== 'edit' || !isHovered) {
            return null;
        }

        return (
                <Space style={{position: 'absolute', top: 5, right: 5}}>
                    <Button
                        icon={<Edit/>}
                        onClick={onEdit}
                        type="primary"
                        ghost
                    />
                    <Button
                        icon={<Delete/>}
                        onClick={onDelete}
                        type="primary"
                        danger
                        ghost
                    />
                </Space>
        );
    };

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
            {renderEditBox()}
        </Card>
    );
};