import React, {useState} from 'react';
import Button from 'antd/es/button'
import Input from 'antd/es/input';
import Form from 'antd/es/form'
import Select from 'antd/es/select'
import DatePicker from 'antd/es/date-picker'
import {useConfigContext} from "../../datasource/ConfigContext";
import styled from 'styled-components';
import dayjs from 'dayjs';
import Apply from "../../assets/Apply";
import {theme} from "../styles/theme"
import Modal from "antd/es/modal/Modal";
import {GetReportDetailsResponse, TimeRange, UpsertReportRequest} from "../../datasource/ReportsClient";
import type {DataSource, SensorLabel} from "../../datasource/ConfigClient";
import Space from "antd/es/space";
import {DeleteOutlined} from '@ant-design/icons';
import message from 'antd/es/message';

const {TextArea} = Input;
const {RangePicker} = DatePicker;

const FormContainer = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    padding: ${theme.sizes.padding.xLarge};
    background-color: ${theme.colors.background};
    border-radius: ${theme.sizes.borderRadius};
`;

const StyledForm = styled(Form)`
    .ant-form-item-label > label {
        color: ${theme.colors.textMuted};
    }
`;

const SensorSelectionItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
`;

const DefineReportItem = ({onSave, initialData, isModal = false, onClose}: {
    onSave: (GetReportDetailsResponse) => void,
    initialData?: GetReportDetailsResponse,
    isModal: boolean,
    onClose?: () => void
}) => {
    const {config} = useConfigContext();
    const [form] = Form.useForm();
    const [sensorLabels, setSensorLabels] = useState(
        initialData?.sensorLabels || {}
    );

    let ControlsContainer = FormContainer;
    if (isModal) {
        ControlsContainer = Modal;
    }

    const handleRemoveSensor = (sensorType: string) => {
        setSensorLabels(prev => {
            const newLabels = {...prev};
            delete newLabels[sensorType];
            return newLabels;
        });
    };

    const handleAddSensor = () => {
        const newSensorType = '';
        setSensorLabels(prev => ({
            ...prev,
            [newSensorType]: []
        }));
    };

    const handleSensorTypeChange = (oldSensorType: string, newSensorType: string) => {
        setSensorLabels(prev => {
            const newLabels = {...prev};
            if (oldSensorType !== newSensorType) {
                delete newLabels[oldSensorType];
                newLabels[newSensorType] = [];
            }
            return newLabels;
        });
    };

    const handleSensorLabelChange = (sensorType: string, labels: string[]) => {
        setSensorLabels(prev => ({
            ...prev,
            [sensorType]: labels
        }));
    };

    const getAvailableSensorTypes = (currentSensorType: string) => {
        const selectedTypes = Object.keys(sensorLabels);
        return Object.values(config.dataSources)
            .filter(dataSource =>
                !selectedTypes.includes(dataSource.sensorType) ||
                dataSource.sensorType === currentSensorType
            );
    };


    const handleSave = (values) => {
        if (onSave) {
            onSave(
                new UpsertReportRequest(
                    new TimeRange(values.dateRange[0].unix() * 1000,
                        values.dateRange[1].unix() * 1000),
                    sensorLabels,
                    values.name,
                    values.description,
                    values.label
                )
            );

            message.success('Report saved successfully');

            if (isModal && onClose) {
                onClose();
            }
        }
    };

    const initialDateRange = initialData?.timeRange
        ? [dayjs(initialData.timeRange.from), dayjs(initialData.timeRange.to)]
        : undefined;

    return (
        <ControlsContainer
            visible={true}
            closeable={true}
            onCancel={onClose}
            footer={null}
        >
            <h2 style={{
                color: theme.colors.text,
                marginBottom: theme.sizes.marginBottom.large,
                fontFamily: theme.fonts.family
            }}>
                {initialData ? 'Edit Report' : 'Create Report'}
            </h2>
            <StyledForm
                form={form}
                layout="vertical"
                onFinish={handleSave}
                initialValues={{
                    name: initialData?.name || '',
                    label: initialData?.label || '',
                    dateRange: initialDateRange,
                    description: initialData?.description || ''
                }}
            >
                <Form.Item
                    name="name"
                    rules={[{required: true, message: 'Please input the title!'}]}>
                    <Input placeholder="Write title"/>
                </Form.Item>

                <Form.Item
                    name="label"
                    rules={[{required: true, message: 'Please input the label!'}]}>
                    <Input placeholder="Write label"/>
                </Form.Item>

                <Form.Item label="Sensor Configuration">
                    <Space direction="vertical" style={{width: '100%'}}>
                        {Object.entries(sensorLabels).map(([sensorType, labels]) => (
                            <SensorSelectionItem key={sensorType}>
                                <Select
                                    style={{width: '40%'}}
                                    value={sensorType === '' ? undefined : sensorType}
                                    onChange={(newSensorType) => handleSensorTypeChange(sensorType, newSensorType)}
                                    placeholder="Select sensor type"
                                >
                                    {getAvailableSensorTypes(sensorType).map((dataSource: DataSource) => (
                                        <Select.Option key={dataSource.sensorType} value={dataSource.sensorType}>
                                            {dataSource.displayName}
                                        </Select.Option>
                                    ))}
                                </Select>
                                <Select
                                    mode="multiple"
                                    style={{width: '40%'}}
                                    value={labels}
                                    onChange={(newLabels) => handleSensorLabelChange(sensorType, newLabels)}
                                    disabled={!sensorType}
                                    placeholder="Select labels"
                                >
                                    {config.dataSources[sensorType]?.availableLabels.map((labelInfo: SensorLabel) => (
                                        <Select.Option key={labelInfo.label} value={labelInfo.label}>
                                            {labelInfo.displayName}
                                        </Select.Option>
                                    ))}
                                </Select>
                                <Button
                                    type="text"
                                    icon={<DeleteOutlined/>}
                                    onClick={() => handleRemoveSensor(sensorType)}
                                    danger
                                />
                            </SensorSelectionItem>
                        ))}
                        <Button
                            type="dashed"
                            onClick={handleAddSensor}
                            disabled={Object.keys(sensorLabels).length === Object.keys(config.dataSources).length}
                        >
                            Add Sensor
                        </Button>
                    </Space>
                </Form.Item>

                <Form.Item
                    name="dateRange"
                    label="Date Range"
                    rules={[{type: 'array', required: true, message: 'Please select date range!'}]}>
                    <RangePicker style={{width: '100%'}}/>
                </Form.Item>

                <Form.Item
                    name="description"
                    rules={[{required: true, message: 'Please input the description!'}]}>
                    <TextArea rows={4} placeholder="Write description..."/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" icon={<Apply/>}>
                        Save
                    </Button>
                </Form.Item>
            </StyledForm>
        </ControlsContainer>
    );
};

export default DefineReportItem;