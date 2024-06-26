import React from 'react';
import styled from 'styled-components';
import Dashboard from "./home/Dashboard";

const MainContentContainer = styled.div`
    background-color: #1C1C21;
    color: white;
    padding: 20px;
    flex: 1;
    overflow-y: auto;
`;

function MainContent() {
    return (
        <MainContentContainer>
            <Dashboard/>
        </MainContentContainer>
    );
}

export default MainContent;
