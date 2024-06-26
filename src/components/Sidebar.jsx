import React from 'react';
import styled from 'styled-components';
import {ButtonWithIcon} from "./buttons/ButtonWithIcon";
import Home from "../assets/Home";
import Report from "../assets/Reports";
import Users from "../assets/Users";
import {UserProfile} from "./UserProfile";

const SidebarContainer = styled.div`
    width: 200px;
    background-color: #1C1C21;
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

function Sidebar() {
    return (
        <SidebarContainer>
            <UserProfile/>
            <ButtonContainer>
                <ButtonWithIcon
                    svgComponent={<Home/>}
                    text={'Home'}/>
                <ButtonWithIcon
                    svgComponent={<Report/>}
                    text={'Reports'}/>
                <ButtonWithIcon
                    svgComponent={<Users/>}
                    text={'Users Management'}/>
            </ButtonContainer>
        </SidebarContainer>
    );
}

export default Sidebar;