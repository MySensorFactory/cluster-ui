import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      Welcome back, Julie
    </HeaderContainer>
  );
};

export default Header;
