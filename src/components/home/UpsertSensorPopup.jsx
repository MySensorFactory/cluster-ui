import React, { useState } from 'react';
import { Button, Input, PopupContainer, Title } from '../styles/CommonStyles';
import {SingleSelect} from "../controls/Select";
import {useConfigContext} from "../../datasource/ConfigContext";

const UpsertSensorPopup = ({ onPopupClose, onSaveButtonClicked }) => {
    const [label, setLabel] = useState('');
    const [customLabel, setCustomLabel] = useState('');
    const [sensorType, setSensorType] = useState('');
    const {config} = useConfigContext();

    const handleSave = () => {
        const finalLabel = label === 'custom' ? customLabel : label;
        onSaveButtonClicked({ label: finalLabel, sensorType });
        onPopupClose();
    };

    return (
        <PopupContainer direction='column'>
            <Title>Modify data</Title>
            <SingleSelect
                options={config.availableLabels}
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
                options={config.availableSensors}
                value={sensorType}
                onChange={setSensorType}
                placeholder="Select Sensor Type"
            />
            <Button onClick={handleSave}>Ok</Button>
        </PopupContainer>
    );
};

export default UpsertSensorPopup;