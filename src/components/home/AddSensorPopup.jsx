import React, { useState } from 'react';
import styled from 'styled-components';

const PopupContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #2a2a36;
    padding: 24px;
    border-radius: 10px;
    z-index: 1000;
    width: 300px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    color: white;
    margin-bottom: 20px;
    font-size: 20px;
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    background-color: #1C1C21;
    color: white;
    border: 1px solid #3a3a3a;
    border-radius: 5px;
    font-size: 14px;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #4caf50;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    background-color: #1C1C21;
    color: white;
    border: 1px solid #3a3a3a;
    border-radius: 5px;
    font-size: 14px;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #4caf50;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #45a049;
    }
`;

const AddSensorPopup = ({ onClose, onAdd }) => {
    const [label, setLabel] = useState('');
    const [customLabel, setCustomLabel] = useState('');
    const [sensorType, setSensorType] = useState('');

    const handleAdd = () => {
        const finalLabel = label === 'custom' ? customLabel : label;
        onAdd({ label: finalLabel, sensorType });
        onClose();
    };

    const predefinedLabels = [
        "Temperature before compressor",
        "Pressure after compressor",
        "Input flow rate",
        "Output flow rate",
        "Gas composition"
    ];

    return (
        <PopupContainer>
            <Title>Add New Sensor</Title>
            <Select
                value={label}
                onChange={(e) => setLabel(e.target.value)}
            >
                <option value="">Select Sensor Label</option>
                {predefinedLabels.map((l, index) => (
                    <option key={index} value={l}>{l}</option>
                ))}
                <option value="custom">Custom Label</option>
            </Select>
            {label === 'custom' && (
                <Input
                    type="text"
                    placeholder="Enter Custom Label"
                    value={customLabel}
                    onChange={(e) => setCustomLabel(e.target.value)}
                />
            )}
            <Select
                value={sensorType}
                onChange={(e) => setSensorType(e.target.value)}
            >
                <option value="">Select Sensor Type</option>
                <option value="temperature">Temperature</option>
                <option value="pressure">Pressure</option>
                <option value="flow">Flow Rate</option>
                <option value="composition">Gas Composition</option>
            </Select>
            <Button onClick={handleAdd}>Add Sensor</Button>
        </PopupContainer>
    );
};

export default AddSensorPopup;