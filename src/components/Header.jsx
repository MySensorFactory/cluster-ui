import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  background-color: #2e2e2e;
  color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Header() {
    return (
        <HeaderContainer>
            <h1>Factory Data Analytics</h1>
        </HeaderContainer>
    );
}

export default Header;
