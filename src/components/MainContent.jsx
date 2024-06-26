import React from 'react';
import styled from 'styled-components';

const MainContentContainer = styled.div`
  background-color: #1C1C21;
  color: white;
  padding: 20px;
  flex: 1;
`;

function MainContent() {
    return (
        <MainContentContainer>
            <h2>Reports</h2>
        </MainContentContainer>
    );
}

export default MainContent;
