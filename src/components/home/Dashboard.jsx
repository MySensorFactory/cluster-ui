// Dashboard.js
import React, {useState} from 'react';
import styled from 'styled-components';
import Header from './Header';
import Events from './Events';
import CurrentSensorValues from './CurrentSensorValues';
import AverageSensorValues from './AverageSensorValues';
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
    const [isEditingSensor, setIsEditingSensor] = useState(false);

    const handleAddButtonClicked = () => {
        setIsAddingSensor(true);
    };

    const handleEditButtonClicked = () => {
        setIsEditingSensor(true);
    };

    const handleDeleteButtonClicked = (newSensor) => {
        // TODO Implement logic to delete the sensor
        console.log('Delete sensor:', newSensor);
    }

    const handleClosePopup = () => {
        setIsAddingSensor(false);
        setIsEditingSensor(false);
    };

    const handleAddNewSensor = (newSensor) => {
        //TODO Implement logic to add the new sensor
    };

    return (
        <>
            <DashboardContainer isBlurred={isAddingSensor || isEditingSensor}>
                <Header/>
                <Events/>
                <Charts
                    onAddChartButtonClicked={handleAddButtonClicked}
                    onEditChartButtonClicked={handleEditButtonClicked}
                    onDeleteButtonClicked={handleDeleteButtonClicked}
                />
                <CurrentSensorValues
                    onAddSensorValueItem={handleAddButtonClicked}
                    onEditSensorValueItem={handleEditButtonClicked}
                    onDeleteButtonClicked={handleDeleteButtonClicked}
                />
                <AverageSensorValues
                    onAddSensorValueItem={handleAddButtonClicked}
                    onEditSensorValueItem={handleEditButtonClicked}
                    onDeleteButtonClicked={handleDeleteButtonClicked}
                />
            </DashboardContainer>
            {(isAddingSensor || isEditingSensor) && (
                <>
                    <Overlay onClick={handleClosePopup}/>
                    <AddSensorPopup onClose={handleClosePopup} onAdd={handleAddNewSensor}/>
                </>
            )}
        </>
    );
};

export default Dashboard;