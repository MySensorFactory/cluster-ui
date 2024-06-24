import './App.css';
import styled from 'styled-components';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./components/MainContent";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
      <AppContainer>
        <Sidebar />
        <MainSection>
          <Header />
          <MainContent />
        </MainSection>
      </AppContainer>
  );
}


export default App;
