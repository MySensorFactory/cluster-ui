import React, {useState} from 'react';
import Modal from 'antd/es/modal/Modal';
import Select from 'antd/es/select';
import Button from 'antd/es/button';
import Typography from 'antd/es/typography';
import Space from 'antd/es/space';
import {useConfigContext} from "../../datasource/ConfigContext";
import {theme} from "../styles/theme";

const { Title } = Typography;
const { Option } = Select;

export const UpsertSensorPopup = ({ onPopupClose, onSaveButtonClicked }) => {
    const [label, setLabel] = useState(null);
    const [sensorType, setSensorType] = useState(null);
    const { config } = useConfigContext();

    const handleSave = () => {
        onSaveButtonClicked({ label, sensorType });
        onPopupClose();
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
                <Button key="submit" type="primary" onClick={handleSave}>
                    Ok
                </Button>,
            ]}
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                    style={selectStyle}
                    value={label}
                    onChange={setLabel}
                    placeholder="Select Sensor Label"
                >
                    {config.availableLabels.map((option) => (
                        <Option key={option.value} value={option.value} style={{ color: theme.colors.text }}>
                            {option.label}
                        </Option>
                    ))}
                </Select>

                <Select
                    style={selectStyle}
                    value={sensorType}
                    onChange={setSensorType}
                    placeholder="Select Sensor Type"
                >
                    {config.availableSensors.map((option) => (
                        <Option key={option.value} value={option.value}>
                            {option.label}
                        </Option>
                    ))}
                </Select>
            </Space>
        </Modal>
    );
};
