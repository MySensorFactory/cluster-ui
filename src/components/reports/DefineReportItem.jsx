import React, {useState} from 'react';
import styled from 'styled-components';
import {MultiSelect, SingleSelect} from "../controls/Select";

const FormContainer = styled.div`
    background-color: #1C1C21;
    color: white;
    padding: 20px;
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 500px; // Fixed width for Title input
    padding: 10px;
    margin-bottom: 15px;
    background-color: #2a2a36;
    color: white;
    border: 1px solid #3a3a3a;
    border-radius: 5px;
`;

const TextArea = styled.textarea`
    width: 500px;
    height: 100px;
    padding: 10px;
    margin-bottom: 15px;
    background-color: #2a2a36;
    color: white;
    border: 1px solid #3a3a3a;
    border-radius: 5px;
    resize: none; // This disables the resize functionality
`;

const DateInput = styled(Input)`
    width: auto;
`;

const Header = styled.div`
    display: flex;
`;

const ControlWrapper = styled.div`
    margin-bottom: 15px;
`;

const ControlLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    color: #a0a0a0;
`;


const DefineReportItem = ({onSave, initialData}) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [sensorLabel, setSensorLabel] = useState(initialData?.sensorLabel || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [fromDate, setFromDate] = useState(initialData?.fromDate || '');
    const [toDate, setToDate] = useState(initialData?.toDate || '');
    const [includedSensors, setIncludedSensors] = useState(initialData?.includedSensors || []);

    const sensorLabelOptions = [
        {value: 'Temperature before compressor', label: 'Temperature before compressor'},
        {value: 'Pressure after compressor', label: 'Pressure after compressor'},
        {value: 'Input flow rate', label: 'Input flow rate'},
        {value: 'Output flow rate', label: 'Output flow rate'},
        {value: 'Gas composition', label: 'Gas composition'},
    ];

    const includedSensorOptions = [
        {value: 'Temperature', label: 'Temperature'},
        {value: 'Pressure', label: 'Pressure'},
        {value: 'Flow Rate', label: 'Flow Rate'},
        {value: 'Gas Composition', label: 'Gas Composition'},
    ];

    const handleSave = () => {
        onSave({title, sensorLabel, description, fromDate, toDate, includedSensors});
    };

    return (
        <FormContainer>

            <Title>{initialData ? 'Edit Report' : 'Create Report'}</Title>
            <Input
                type="text"
                placeholder="Write title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Header>
                <ControlWrapper>
                    <ControlLabel>Sensor Label</ControlLabel>
                    <SingleSelect
                        options={sensorLabelOptions}
                        value={sensorLabelOptions.find(option => option.value === sensorLabel)}
                        onChange={(selected) => setSensorLabel(selected.value)}
                        placeholder="Select sensor label"
                    />
                </ControlWrapper>
                <ControlWrapper>
                    <ControlLabel>From Date</ControlLabel>
                    <DateInput
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </ControlWrapper>
                <ControlWrapper>
                    <ControlLabel>To Date</ControlLabel>
                    <DateInput
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </ControlWrapper>
                <ControlWrapper>
                    <ControlLabel>Included Sensor Types</ControlLabel>
                    <MultiSelect
                        options={includedSensorOptions}
                        value={includedSensors}
                        onChange={setIncludedSensors}
                        placeholder="Select included sensor types"
                    />
                </ControlWrapper>
            </Header>
            <TextArea
                placeholder="Write description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
        </FormContainer>
    );
};

export default DefineReportItem;