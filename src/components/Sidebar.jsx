import React from 'react';
import styled from 'styled-components';
import {Button} from "./buttons/Button";

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #1C1C21;
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

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
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
            <ButtonContainer>
                <Button>Home</Button>
                <Button>Reports</Button>
                <Button>Users management</Button>
            </ButtonContainer>
        </SidebarContainer>
    );
}

export default Sidebar;
