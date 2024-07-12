import React from 'react';
import styled from 'styled-components';
import {ListDashboard} from "./ListDashboard";
import {useAppState} from "../AppStateContext";
import DefineReportItem from "./DefineReportItem";

const DashboardContainer = styled.div`
    padding: 20px;
    background-color: #1C1C21;
    color: white;
    min-height: 100vh;
`;

const ReportsDashboard = () => {
    const {homeSubMenu} = useAppState();

    return (
        <DashboardContainer>
            {homeSubMenu === 'define_report' && <DefineReportItem/>}
            {homeSubMenu === 'report_list' && <ListDashboard/>}
        </DashboardContainer>
    );
};

export default ReportsDashboard;