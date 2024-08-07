import React from 'react';
import styled from 'styled-components';
import {ButtonWithIcon} from "./controls/ButtonWithIcon";
import Home from "../assets/Home";
import Report from "../assets/Reports";
import {UserProfile} from "./UserProfile";
import {useAppState} from "./AppStateContext";

const SidebarContainer = styled.div`
    width: 200px;
    height: 100vh;
    background-color: #1C1C21;
    color: white;
    padding: 10px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const SubMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-left: 20px;
`;

const SubMenuItem = styled.button`
    text-align: left;
    background-color: transparent;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 10px;
    font-family: Inter, monospace;
    font-size: 12px;

    &:hover {
        background-color: #3D404A;
    }
`;

function Sidebar() {
    const {
        activeMenu, setActiveMenu, homeSubMenu, setHomeSubMenu,
        setReportsSubMenu
    } = useAppState();

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        if (menu === 'Home') {
            setHomeSubMenu('view');
        }
        if (menu === 'Reports') {
            setReportsSubMenu('report_list');
        }
    };

    const renderSubMenu = () => {
        switch (activeMenu) {
            case 'Home':
                return (
                    <SubMenuContainer>
                        {homeSubMenu === 'view' && (
                            <SubMenuItem onClick={() => setHomeSubMenu('edit')}>Edit</SubMenuItem>
                        )}
                        {homeSubMenu === 'edit' && (
                            <>
                                <SubMenuItem onClick={() => setHomeSubMenu('view')}>Save</SubMenuItem>
                                <SubMenuItem onClick={() => setHomeSubMenu('view')}>Cancel</SubMenuItem>
                            </>
                        )}
                    </SubMenuContainer>
                );
            case 'Reports':
                return (
                    <SubMenuContainer>
                        <SubMenuItem onClick={() => setReportsSubMenu('report_list')}>Reports list</SubMenuItem>
                        <SubMenuItem onClick={() => setReportsSubMenu('define_report')}>Define report</SubMenuItem>
                    </SubMenuContainer>
                );
            default:
                return null;
        }
    };

    return (
        <SidebarContainer>
            <UserProfile/>
            <ButtonContainer>
                <ButtonWithIcon
                    svgComponent={<Home/>}
                    text={'Home'}
                    onClick={() => handleMenuClick('Home')}
                />
                {activeMenu === 'Home' && renderSubMenu()}
                <ButtonWithIcon
                    svgComponent={<Report/>}
                    text={'Reports'}
                    onClick={() => handleMenuClick('Reports')}
                />
                {activeMenu === 'Reports' && renderSubMenu()}
            </ButtonContainer>
        </SidebarContainer>
    );
}

export default Sidebar;