import React from 'react';
import Layout from 'antd/es/layout/layout';
import {Dashboard} from "./home/Dashboard";
import ReportsDashboard from "./reports/ReportsDashboard";
import {useAppState} from "./AppStateContext";
import {useConfigContext} from "../datasource/ConfigContext";
import {theme} from "./styles/theme";
import type {Config} from "../datasource/ConfigClient";

const {Content} = Layout;

function MainContent() {
    const {activeMenu}: { activeMenu: string } = useAppState();
    const {config}: { config: Config } = useConfigContext()

    const renderContent = () => {
        switch (activeMenu) {
            case 'Home':
                return <Dashboard/>;
            case 'Reports':
                return <ReportsDashboard/>;
            default:
                return <div>Select a menu item</div>;
        }
    };

    return (
        config != null && (
            <Content
                style={{
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                    padding: theme.sizes.padding.large,
                    flex: 1,
                    overflowY: 'auto',
                }}
            >
                {renderContent()}
            </Content>
        )
    );
}

export default MainContent;