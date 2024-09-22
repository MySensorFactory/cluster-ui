import React from "react";
import Avatar from 'antd/es/avatar';
import Space from 'antd/es/space';
import Typography from 'antd/es/typography';
import {theme} from "./styles/theme";

const { Text } = Typography;

function UserFrontData() {
    return (
        <Space direction="vertical" size={0}>
            <Text style={{ color: theme.colors.text }}>Name Surname</Text>
            <Text style={{ color: theme.colors.text }}>Administrator</Text>
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
                US
            </Avatar>
            <UserFrontData />
        </Space>
    );
}