import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Events from './Events';
import SensorValues from './SensorValues';
import AverageMetrics from './AverageMetrics';
import Chart from "./Chart";

const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #1C1C21;
  color: white;
  min-height: 100vh;
`;

const Dashboard = () => {
    return (
        <DashboardContainer>
            <Header />
            <Events />
            <Chart/>
            <SensorValues />
            <AverageMetrics />
        </DashboardContainer>
    );
};

export default Dashboard;
