import React from 'react';
import Card from 'antd/es/card/Card';
import Typography from 'antd/es/typography/Typography';
import {theme} from "../styles/theme"

const {Text} = Typography;

export const EventItem = ({title, time, isAlert = false}) => {
    return (
        <Card
            style={{
                backgroundColor: isAlert ? theme.colors.negative : theme.colors.secondary,
                marginBottom: theme.sizes.marginBottom.small,
                borderRadius: theme.sizes.borderRadius,
                border: 'none'
            }}
            bodyStyle={{padding: theme.sizes.padding.medium}}
        >
            <Text style={{color: theme.colors.text, display: 'block'}}>{title}</Text>
            <Text style={{color: theme.colors.textMuted, fontSize: theme.fonts.sizes.small}}>
                {time.toLocaleString()}
            </Text>
        </Card>
    );
};