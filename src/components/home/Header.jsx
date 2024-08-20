import React from 'react';
import {Text} from '../styles/CommonStyles';
import {theme} from '../styles/theme';

export const Header = () => {
    return (
        <Text
            size={theme.fonts.sizes.large}
            marginBottom={theme.sizes.padding.medium}>
            Welcome back, Julie
        </Text>
    );
};