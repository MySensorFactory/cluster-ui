import React, {useState} from 'react';
import {Button, Input, PopupContainer, Select, Title} from '../styles/CommonStyles';

const UpsertSensorPopup = ({onPopupClose, onSaveButtonClicked}) => {
    const [label, setLabel] = useState('');
    const [customLabel, setCustomLabel] = useState('');
    const [sensorType, setSensorType] = useState('');

    const handleSave = () => {
        const finalLabel = label === 'custom' ? customLabel : label;
        onSaveButtonClicked({label: finalLabel, sensorType});
        onPopupClose();
    };

    const predefinedLabels = [
        "Temperature before compressor",
        "Pressure after compressor",
        "Input flow rate",
        "Output flow rate",
        "Gas composition"
    ];

    return (
        <PopupContainer direction='column'>
            <Title>Modify data</Title>
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
            <Button onClick={handleSave}>Ok</Button>
        </PopupContainer>
    );
};

export default UpsertSensorPopup;