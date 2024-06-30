import React from 'react';
import styled from 'styled-components';
import Dashboard from "./home/Dashboard";
import {useAppState} from "./AppStateContext";

const MainContentContainer = styled.div`
    background-color: #1C1C21;
    color: white;
    padding: 20px;
    flex: 1;
    overflow-y: auto;
`;

function MainContent() {
    const { activeMenu } = useAppState();

    const renderContent = () => {
        switch (activeMenu) {
            case 'Home':
                return <Dashboard />;
            case 'Reports':
                return <div>Reports Content</div>;
            case 'Users Management':
                return <div>Users Management Content</div>;
            default:
                return <div>Select a menu item</div>;
        }
    };

    return (
        <MainContentContainer>
            {renderContent()}
        </MainContentContainer>
    );
}

export default MainContent;
