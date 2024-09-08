import React, {useState} from 'react';
import styled from 'styled-components';
import {DeleteButton, EditButton} from "../controls/Buttons";
import DefineReportItem from "./DefineReportItem";
import {TimeChart} from "../controls/TimeChart";

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

const unitMap = {
    temperature: '°C',
    humidity: '%',
    pressure: 'hPa',
    flowRate: 'm3/s',
    windDirection: '°',
};

const DetailsViewContent = ({report, setEditReportState, onReportItemDelete}) => {
    return (<>
            <ButtonsContainer>
                <EditButton
                    onEdit={() => {
                        setEditReportState(true);
                    }}
                    iconSize={40}
                />
                <DeleteButton
                    onDelete={() => {
                        onReportItemDelete(report.id)
                    }}
                    iconSize={5}
                />
            </ButtonsContainer>
            <Title>{report.title}</Title>
            <p>Sensor label: {report.sensorLabel}</p>
            <Description>{report.description}</Description>

            {Object.entries(report.dataBySensorType).map(([sensorType, data]) => (
                <TimeChart
                    key={Math.floor(Math.random() * 100)}
                    data={data.map(d => {
                        return {time: d.timestamp, value: d.values.value}
                    }) || []}
                    title={sensorType}
                    dataKey="value"
                    yAxisUnit={unitMap[sensorType]}
                    days={Math.floor((report.timeRange.to - report.timeRange.from) / (24*60*60*1000))}
                    numTicks={10}
                />
            ))}
        </>
    );
}

export const ReportItemDetails = ({report, onReportItemUpdate, onReportItemDelete}) => {
    const [isEditReportState, setEditReportState] = useState(false)

    return (
        <DetailsContainer>
            {!isEditReportState &&
                <DetailsViewContent
                    report={report}
                    setEditReportState={setEditReportState}
                    onReportItemDelete={onReportItemDelete}
                />}
            {isEditReportState &&
                <DefineReportItem
                    initialData={report}
                    onSave={(data) => {
                        setEditReportState(false)
                        onReportItemUpdate(data)
                    }}
                />}
        </DetailsContainer>
    );
};