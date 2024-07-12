import React from 'react';
import styled from 'styled-components';
import {ListDashboard} from "./ListDashboard";

const DashboardContainer = styled.div`
    padding: 20px;
    background-color: #1C1C21;
    color: white;
    min-height: 100vh;
`;

const ReportsDashboard = () => {

    return (
        <DashboardContainer>
            <ListDashboard/>
        </DashboardContainer>
    );
};

export default ReportsDashboard;