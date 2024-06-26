import styled from "styled-components";
import React from "react";


const UserProfileImage = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #3D404A;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: white;
    font-family: Inter, monospace;

    &:hover {
        background-color: #3A3D43;
    }
`;

const UserProfileContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

function UserFrontData () {
    return (
        <div>
            <p>Name Surname</p>
            <p>Administrator</p>
        </div>
    )
}

export function UserProfile() {
    return (
        <UserProfileContainer>
            <UserProfileImage>US</UserProfileImage>
            <UserFrontData/>
        </UserProfileContainer>
    )
}
