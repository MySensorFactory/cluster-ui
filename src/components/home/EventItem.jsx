import React from 'react';
import {Container, Text} from "../styles/CommonStyles";
import {theme} from "../styles/theme";

export const EventItem = ({title, time, isAlert = false}) => {
    return (
        <Container background={isAlert ? theme.colors.negative : theme.colors.secondary}>
            <Text>{title}</Text>
            <Text size={theme.fonts.sizes.small} color={theme.colors.textMuted}>
                {time.toLocaleString()}
            </Text>
        </Container>
    );
};
