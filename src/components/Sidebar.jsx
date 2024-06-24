import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #2e2e2e;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UserProfile = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const UserProfileImage = styled.img`
  border-radius: 50%;
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin: 15px 0;
  }
`;

function Sidebar() {
    return (
        <SidebarContainer>
            <UserProfile>
                <UserProfileImage src="https://via.placeholder.com/40" alt="User" />
                <div>
                    <p>Username</p>
                    <p>View profile</p>
                </div>
            </UserProfile>
            <Nav>
                <ul>
                    <li>Home</li>
                    <li>Reports</li>
                    <li>Users management</li>
                </ul>
            </Nav>
        </SidebarContainer>
    );
}

export default Sidebar;
