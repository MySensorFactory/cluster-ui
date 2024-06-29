import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Events from './Events';
import SensorValues from './SensorValues';
import AverageMetrics from './AverageMetrics';
import Charts from "./Charts";

const DashboardContainer = styled.div`
    padding: 20px;
    background-color: #1C1C21;
    padding-bottom: 150px;
    color: white;
    min-height: 100vh;
`;

const Dashboard = () => {
    return (
        <DashboardContainer>
            <Header/>
            <Events/>
            <Charts/>
            <SensorValues/>
            <AverageMetrics/>
        </DashboardContainer>
    );
};

export default Dashboard;
