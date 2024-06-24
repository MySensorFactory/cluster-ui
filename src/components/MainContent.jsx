import React from 'react';
import styled from 'styled-components';

const MainContentContainer = styled.div`
  background-color: #1e1e1e;
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
