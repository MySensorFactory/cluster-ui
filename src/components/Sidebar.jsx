import React from 'react';
import Layout from 'antd/es/layout';
import Menu from 'antd/es/menu';
import {UserProfile} from "./UserProfile";
import {useAppState} from "./AppStateContext";
import Home from "../assets/Home";
import Reports from "../assets/Reports";
import {theme} from "./styles/theme";

const {Sider} = Layout;

export const Sidebar = () => {
    const {
        activeMenu, setActiveMenu, homeSubMenu, setHomeSubMenu,
        reportsSubMenu, setReportsSubMenu
    } : {
        activeMenu: string,
        setActiveMenu: (activeMenu: string) => void,
        homeSubMenu: string,
        setHomeSubMenu: (homeSubMenu: string) => void,
        reportsSubMenu: string,
        setReportsSubMenu: (reportsSubMenu: string) => void,
    }= useAppState();

    const handleMenuClick = (menu: string) => {
        setActiveMenu(menu);
        if (menu === 'Home') {
            setHomeSubMenu('view');
        }
        if (menu === 'Reports') {
            setReportsSubMenu('report_list');
        }
    };

    return (
        <Sider
            width={250}
            style={{
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                padding: '10px 20px 20px',
            }}
        >
            <UserProfile/>
            <Menu
                mode="inline"
                selectedKeys={[activeMenu, homeSubMenu, reportsSubMenu]}
                style={{backgroundColor: 'transparent', color: theme.colors.text, border: 'none'}}
            >
                <Menu.Item key="Home" icon={<Home/>} onClick={() => handleMenuClick('Home')}>
                    Home
                </Menu.Item>
                {activeMenu === 'Home' && (
                    <Menu.ItemGroup key="HomeSubMenu" style={{marginLeft: theme.sizes.marginLeft.large}}>
                        {homeSubMenu === 'view' ? (
                            <Menu.Item key="edit" onClick={() => setHomeSubMenu('edit')}>Edit</Menu.Item>
                        ) : (
                            <Menu.Item key="view" onClick={() => setHomeSubMenu('view')}>View</Menu.Item>
                        )}
                    </Menu.ItemGroup>
                )}
                <Menu.Item key="Reports" icon={<Reports/>} onClick={() => handleMenuClick('Reports')}>
                    Reports
                </Menu.Item>
                {activeMenu === 'Reports' && (
                    <Menu.ItemGroup key="ReportsSubMenu" style={{marginLeft: theme.sizes.marginLeft.large}}>
                        <Menu.Item key="report_list" onClick={() => setReportsSubMenu('report_list')}>Reports
                            list</Menu.Item>
                        <Menu.Item key="define_report" onClick={() => setReportsSubMenu('define_report')}>Define
                            report</Menu.Item>
                    </Menu.ItemGroup>
                )}
            </Menu>
        </Sider>
    );
}