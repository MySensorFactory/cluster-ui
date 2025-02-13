import React, {useState} from 'react';
import Modal from 'antd/es/modal/Modal';
import Select from 'antd/es/select';
import Button from 'antd/es/button';
import Typography from 'antd/es/typography';
import Space from 'antd/es/space';
import {useConfigContext} from "../../datasource/ConfigContext";
import {theme} from "../styles/theme";
import type {DataSource, SensorLabel} from "../../datasource/ConfigClient";

const {Title} = Typography;
const {Option} = Select;

export const UpsertSensorPopup = ({onPopupClose, onSaveButtonClicked}: {
    onPopupClose: () => void,
    onSaveButtonClicked: ({ sensorType: string, label: string }) => void,
}) => {
    const [selectedSensorType, setSelectedSensorType] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const {config} = useConfigContext();

    const handleSave = () => {
        onSaveButtonClicked({
            sensorType: selectedSensorType,
            label: selectedLabel
        });
        onPopupClose();
    };

    const handleSensorTypeChange = (value: string) => {
        setSelectedSensorType(value);
        setSelectedLabel(null); // Reset label when sensor type changes
    };

    const selectStyle = {
        width: '100%'
    };

    return (
        <Modal
            visible={true}
            title={<Title level={4}>Modify/save data</Title>}
            onCancel={onPopupClose}
            footer={[
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleSave}
                    disabled={!selectedSensorType || !selectedLabel}
                >
                    Ok
                </Button>,
            ]}
        >
            <Space direction="vertical" style={{width: '100%'}}>
                <Select
                    style={selectStyle}
                    value={selectedSensorType}
                    onChange={handleSensorTypeChange}
                    placeholder="Select Sensor Type"
                >
                    {Object.entries(config.dataSources).map(([sensorType, dataSource]: [string, DataSource]) => (
                        <Option
                            key={sensorType}
                            value={sensorType}
                            style={{color: theme.colors.text}}
                        >
                            {dataSource.displayName}
                        </Option>
                    ))}
                </Select>

                <Select
                    style={selectStyle}
                    value={selectedLabel}
                    onChange={setSelectedLabel}
                    placeholder="Select Sensor Label"
                    disabled={!selectedSensorType}
                >
                    {selectedSensorType && config.dataSources[selectedSensorType].availableLabels.map((labelInfo: SensorLabel) => (
                        <Option
                            key={labelInfo.label}
                            value={labelInfo.label}
                            style={{color: theme.colors.text}}
                        >
                            {labelInfo.displayName}
                        </Option>
                    ))}
                </Select>
            </Space>
        </Modal>
    );
};