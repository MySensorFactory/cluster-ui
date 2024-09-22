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

const {Content} = Layout;

function App() {
    return (
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
    );
}

export default App;