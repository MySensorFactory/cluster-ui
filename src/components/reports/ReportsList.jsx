import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
    width: 100%;
`;

const ColumnHeaders = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 2fr 0.5fr;
    gap: 10px;
    padding: 10px 15px;
    font-weight: bold;
    border-bottom: 1px solid #444;
    margin-bottom: 10px;
`;

const ReportItem = styled.div`
    background-color: #2a2a36;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 2fr 0.5fr;
    gap: 10px;
    align-items: center;
`;

const ReportInfo = styled.div`
    font-size: 14px;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 20px;
`;


const reports = [
    {
        name: 'Very important report from compressor',
        dateRange: '7/2/2024 8:00 - 8/3/2024 8:00',
        description: 'Lorem ipsum etc ...',
        sensorLabel: 'Before compressor',
        includedSensors: 'Temperature, Pressure, Flow rate',
    },
    // Add more report objects as needed
];

const ReportsList = () => {
    return (
        <ListContainer>
            <ColumnHeaders>
                <div>Name & date range</div>
                <div>Description</div>
                <div>Sensor label</div>
                <div>Included sensors</div>
                <div></div>
            </ColumnHeaders>
            {reports.map((report, index) => (
                <ReportItem key={index}>
                    <ReportInfo>{report.name}<br />{report.dateRange}</ReportInfo>
                    <ReportInfo>{report.description}</ReportInfo>
                    <ReportInfo>{report.sensorLabel}</ReportInfo>
                    <ReportInfo>{report.includedSensors}</ReportInfo>
                    <MoreButton>...</MoreButton>
                </ReportItem>
            ))}
        </ListContainer>
    );
};

export default ReportsList;