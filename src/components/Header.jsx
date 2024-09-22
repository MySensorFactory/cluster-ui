import React from 'react';
import Layout from 'antd/es/layout';
import Typography from 'antd/es/typography';
import Space from 'antd/es/space';
import DataCircle from "../assets/DataCircle";
import SvgResizer from "react-svg-resizer";
import {theme} from "./styles/theme";

const {Header: AntHeader} = Layout;
const {Title} = Typography;

function Header() {
    return (
        <AntHeader
            style={{
                backgroundColor: theme.colors.background,
                padding: theme.sizes.padding.large,
                height: 'auto',
                borderBottom: '1px solid white',
            }}
        >
            <Space size={10}>
                <SvgResizer size={30}>
                    <DataCircle/>
                </SvgResizer>
                <Title level={2} style={{marginBottom: theme.sizes.marginBottom.xLarge}}>
                    Factory Data Analytics
                </Title>
            </Space>
        </AntHeader>
    );
}

export default Header;