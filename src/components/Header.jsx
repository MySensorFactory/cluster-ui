import React from 'react';
import styled from 'styled-components';
import DataCircle from "../assets/DataCircle";
import SvgResizer from "react-svg-resizer";

const HeaderContainer = styled.div`
    background-color: #1C1C21;
    color: white;
    padding: 30px;
    display: flex;
    gap: 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-family: Inter, sans-serif;
    height: 1%;
    border-bottom: 1px solid white;
`;

function Header() {
    return (
        <HeaderContainer>
            <SvgResizer size={25}>
                <DataCircle/>
            </SvgResizer>
            <h1>Factory Data Analytics</h1>
        </HeaderContainer>
    );
}

export default Header;
