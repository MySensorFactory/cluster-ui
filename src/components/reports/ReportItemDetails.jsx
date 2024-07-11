import React from 'react';
import styled from 'styled-components';
import {Chart} from "../home/Charts";
import {generateData} from "../data/DataSource";
import {DeleteButton, EditButton} from "../home/TryRenderEditBox";

const DetailsContainer = styled.div`
    background-color: #2a2a36;
    color: white;
    padding: 20px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    z-index: 1000;
    max-height: 80%;
    overflow-y: auto;
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
`;

const Description = styled.p`
    margin-bottom: 20px;
`;

const ButtonsContainer = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ReportItemDetails = ({title, sensorLabel, description}) => {

    return (
        <DetailsContainer>
            <ButtonsContainer>
                    <EditButton
                        onEdit={() => {}}
                        iconSize={40}
                    />
                    <DeleteButton
                        onDelete={() => {}}
                        iconSize={5}
                    />
            </ButtonsContainer>
            <Title>{title}</Title>
            <p>Sensor label: {sensorLabel}</p>
            <Description>{description}</Description>

            <Chart
                data={generateData(15, 25, 1)}
                title="Temperature value"
                dataKey="value"
                stroke="#4fc3f7"
                domain={[5, 40]}
                yAxisUnit="K"
                days={1}
                numTicks={10} // Set the number of ticks you want to show
            />

            <Chart
                data={generateData(15, 25, 1)}
                title="Temperature value"
                dataKey="value"
                stroke="#4fc3f7"
                domain={[5, 40]}
                yAxisUnit="K"
                days={1}
                numTicks={10} // Set the number of ticks you want to show
            />
            <Chart
                data={generateData(15, 25, 1)}
                title="Temperature value"
                dataKey="value"
                stroke="#4fc3f7"
                domain={[5, 40]}
                yAxisUnit="K"
                days={1}
                numTicks={10} // Set the number of ticks you want to show
            />
        </DetailsContainer>
    );
};

export default ReportItemDetails;