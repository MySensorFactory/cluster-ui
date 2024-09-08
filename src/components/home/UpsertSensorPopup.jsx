import React, { useState } from 'react';
import { Button, Input, PopupContainer, Title } from '../styles/CommonStyles';
import {SingleSelect} from "../controls/Select";

const UpsertSensorPopup = ({ onPopupClose, onSaveButtonClicked }) => {
    const [label, setLabel] = useState('');
    const [customLabel, setCustomLabel] = useState('');
    const [sensorType, setSensorType] = useState('');

    const handleSave = () => {
        const finalLabel = label === 'custom' ? customLabel : label;
        onSaveButtonClicked({ label: finalLabel, sensorType });
        onPopupClose();
    };

    const predefinedLabels = [
        { value: "Temperature before compressor", label: "Temperature before compressor" },
        { value: "Pressure after compressor", label: "Pressure after compressor" },
        { value: "Input flow rate", label: "Input flow rate" },
        { value: "Output flow rate", label: "Output flow rate" },
        { value: "Gas composition", label: "Gas composition" },
        { value: "custom", label: "Custom Label" },
    ];

    const sensorTypes = [
        { value: 'temperature', label: 'Temperature' },
        { value: 'pressure', label: 'Pressure' },
        { value: 'flow', label: 'Flow Rate' },
        { value: 'composition', label: 'Gas Composition' },
    ];

    return (
        <PopupContainer direction='column'>
            <Title>Modify data</Title>
            <SingleSelect
                options={predefinedLabels}
                value={label}
                onChange={setLabel}
                placeholder="Select Sensor Label"
            />
            {label === 'custom' && (
                <Input
                    type="text"
                    placeholder="Enter Custom Label"
                    value={customLabel}
                    onChange={(e) => setCustomLabel(e.target.value)}
                />
            )}
            <SingleSelect
                options={sensorTypes}
                value={sensorType}
                onChange={setSensorType}
                placeholder="Select Sensor Type"
            />
            <Button onClick={handleSave}>Ok</Button>
        </PopupContainer>
    );
};

export default UpsertSensorPopup;