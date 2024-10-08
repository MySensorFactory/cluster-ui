import React from "react";
import Avatar from 'antd/es/avatar';
import Space from 'antd/es/space';
import Typography from 'antd/es/typography';
import {theme} from "./styles/theme";
import {KeycloakInterface} from "../datasource/KeycloakInterface";

const { Text } = Typography;

function UserFrontData() {
    return (
        <Space direction="vertical" size={0}>
            <Text style={{ color: theme.colors.text }}>{KeycloakInterface.getUsername()}</Text>
            <Text style={{ color: theme.colors.text }}>{KeycloakInterface.hasRole(['ADMIN'])? 'Administrator' : 'Data Accessor' }</Text>
        </Space>
    );
}

export function UserProfile() {
    return (
        <Space size={10} align="center">
            <Avatar
                size={60}
                style={{
                    backgroundColor: theme.colors.secondaryHover,
                    color: theme.colors.text,
                    fontSize: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.colors.textMuted}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.colors.secondaryHover}
            >
                {KeycloakInterface.getUsername().substring(0,2)}
            </Avatar>
            <UserFrontData />
        </Space>
    );
}