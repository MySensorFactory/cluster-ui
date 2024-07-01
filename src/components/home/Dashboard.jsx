// Dashboard.js
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Events from './Events';
import SensorValues from './SensorValues';
import AverageMetrics from './AverageMetrics';
import Charts from "./Charts";
import AddSensorPopup from './AddSensorPopup';

const DashboardContainer = styled.div`
    padding: 20px;
    background-color: #1C1C21;
    padding-bottom: 150px;
    color: white;
    min-height: 100vh;
    filter: ${props => props.isBlurred ? 'blur(5px)' : 'none'};
    transition: filter 0.3s ease;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Dashboard = () => {
    const [isAddingSensor, setIsAddingSensor] = useState(false);

    const handleAddSensor = () => {
        setIsAddingSensor(true);
    };

    const handleClosePopup = () => {
        setIsAddingSensor(false);
    };

    const handleAddNewSensor = (newSensor) => {
        // Implement logic to add the new sensor
        console.log('New sensor:', newSensor);
    };

    return (
        <>
            <DashboardContainer isBlurred={isAddingSensor}>
                <Header />
                <Events />
                <Charts onAddSensor={handleAddSensor} />
                <SensorValues onAddSensor={handleAddSensor} />
                <AverageMetrics onAddSensor={handleAddSensor} />
            </DashboardContainer>
            {isAddingSensor && (
                <>
                    <Overlay onClick={handleClosePopup} />
                    <AddSensorPopup onClose={handleClosePopup} onAdd={handleAddNewSensor} />
                </>
            )}
        </>
    );
};

export default Dashboard;