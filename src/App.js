import './App.css';
import {Layout} from 'antd';
import {Sidebar} from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import {AppStateProvider} from "./components/AppStateContext";
import {ApiProvider} from "./datasource/ApiContext";
import {theme} from "./components/styles/theme";
import {ConfigProvider as ConfigContextProvider} from "./datasource/ConfigContext";
import ConfigProvider from "antd/es/config-provider";
import {ErrorProvider} from "./components/ErrorContext";
import React from "react";
import {KeycloakInterface} from "./datasource/KeycloakInterface";
import Alert from "antd/es/alert";
import Button from "antd/es/button";

const {Content} = Layout;

function App() {
    const isPermissionAllowed = KeycloakInterface.hasRole(['DATA_ACCESSOR', 'ADMIN'])

    if (!isPermissionAllowed) {
        return <Alert
            message="This user is not allowed to access this page. It has not sufficied roles"
            type="error"
            showIcon
            action={
                <Button size="small" danger onClick={KeycloakInterface.doLogout}>
                    Logout
                </Button>
            }
        />
    }

    return (
        <ErrorProvider>
            <ConfigContextProvider>
                <ApiProvider>
                    <AppStateProvider>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Table: {
                                        rowHoverBg: theme.colors.primaryHover,
                                        borderColor: theme.colors.border
                                    }
                                },
                                token: {
                                    // Seed Token
                                    colorPrimary: theme.colors.primary,
                                    fontFamily: theme.fonts.family,
                                    borderRadius: theme.sizes.borderRadius,

                                    // Alias Token
                                    colorBgContainer: theme.colors.secondary,
                                    colorBgElevated: theme.colors.secondary,
                                    colorText: theme.colors.text,
                                    colorTextQuaternary: theme.colors.textMuted,
                                    colorPrimaryBg: theme.colors.primaryHover,
                                    colorIcon: theme.colors.textMuted,
                                    colorFillSecondary: theme.colors.primary
                                }
                            }}
                        >
                            <Layout style={{height: '100vh', overflow: 'hidden'}}>
                                <Header/>
                                <Layout>
                                    <Sidebar/>
                                    <Content style={{display: 'flex', flexDirection: 'column'}}>
                                        <MainContent/>
                                    </Content>
                                </Layout>
                            </Layout>
                        </ConfigProvider>
                    </AppStateProvider>
                </ApiProvider>
            </ConfigContextProvider>
        </ErrorProvider>
    );
}

export default App;