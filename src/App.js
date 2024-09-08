import './App.css';
import styled from 'styled-components';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import {AppStateProvider} from "./components/AppStateContext";
import {ApiProvider} from "./datasource/ApiContext";

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
        <ApiProvider>
            <AppStateProvider>
                <AppContainer>
                    <Header/>
                    <MainSection>
                        <Sidebar/>
                        <MainContent/>
                    </MainSection>
                </AppContainer>
            </AppStateProvider>
        </ApiProvider>
    );
}


export default App;
