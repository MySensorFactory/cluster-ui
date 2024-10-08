import React from 'react';
import Typography  from 'antd/es/typography';
import {theme} from "../styles/theme";
import {KeycloakInterface} from "../../datasource/KeycloakInterface";

const { Title } = Typography;

export const Header = () => {
    return (
        <Title level={2} style={{ color: theme.colors.text, marginBottom: theme.sizes.marginBottom.large }}>
            Welcome back, {KeycloakInterface.getUsername()}
        </Title>
    );
};