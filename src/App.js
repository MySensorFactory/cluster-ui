import './App.css';
import styled from 'styled-components';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import {AppStateProvider} from "./components/AppStateContext";
import {ApiProvider} from "./datasource/ApiContext";
import {theme} from "./components/styles/theme";
import {ConfigProvider as ConfigConextProvider} from "./datasource/ConfigContext";
import ConfigProvider from "antd/es/config-provider"

const AppContainer = styled.div`
    display: flex;
    flex-flow: column;
    height: 100vh;
    overflow: hidden;
`;

const MainSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    height: 100vh;
`;

function App() {
    return (
        <ConfigConextProvider>
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
                        <AppContainer>
                            <Header/>
                            <MainSection>
                                <Sidebar/>
                                <MainContent/>
                            </MainSection>
                        </AppContainer>
                    </ConfigProvider>
                </AppStateProvider>
            </ApiProvider>
        </ConfigConextProvider>
    );
}


export default App;
