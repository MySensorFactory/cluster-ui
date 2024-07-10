import React from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const DetailsContainer = styled.div`
  background-color: #1C1C21;
  color: white;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  margin-bottom: 20px;
`;

const ChartContainer = styled.div`
  margin-bottom: 30px;
`;

const ChartTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const EditDeleteButtons = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ReportItemDetails = ({ title, sensorLabel, description, temperatureData, flowRateCO2Data, flowRateNH3Data }) => {
    return (
        <DetailsContainer>
            <EditDeleteButtons>
                {/* Add edit and delete buttons here */}
            </EditDeleteButtons>
            <Title>{title}</Title>
            <p>Sensor label: {sensorLabel}</p>
            <Description>{description}</Description>

            <ChartContainer>
                <ChartTitle>Temperature value</ChartTitle>
                <LineChart width={600} height={300} data={temperatureData}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
            </ChartContainer>

            <ChartContainer>
                <ChartTitle>Flow rate CO2</ChartTitle>
                <LineChart width={600} height={300} data={flowRateCO2Data}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                </LineChart>
            </ChartContainer>

            <ChartContainer>
                <ChartTitle>Flow rate NH3</ChartTitle>
                <LineChart width={600} height={300} data={flowRateNH3Data}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#ffc658" />
                </LineChart>
            </ChartContainer>
        </DetailsContainer>
    );
};

export default ReportItemDetails;