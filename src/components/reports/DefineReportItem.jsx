import React from 'react';
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
import {GetReportDetailsResponse, TimeRange} from "../../datasource/ReportsClient";

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

const DefineReportItem = ({onSave, initialData, isModal = false, onClose}: {
    onSave: (GetReportDetailsResponse) => void,
    initialData: GetReportDetailsResponse,
    isModal: boolean,
    onClose: () => void
}) => {

    const {config} = useConfigContext();
    const [form] = Form.useForm();

    let ControlsContainer = FormContainer;

    if (isModal) {
        ControlsContainer = Modal
    }

    const handleSave = (values) => {
        if (onSave) {
            onSave(
                new GetReportDetailsResponse(
                    null,
                    values.name,
                    values.includedSensors,
                    values.sensorLabel,
                    new TimeRange(values.dateRange[0].unix(),
                        values.dateRange[1].unix()),
                    values.description,
                    null
                ))
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
                    sensorLabel: initialData?.label || undefined,
                    dateRange: initialDateRange,
                    includedSensors: initialData?.includedSensors || [],
                    description: initialData?.description || ''
                }}
            >
                <Form.Item
                    name="name"
                    rules={[{required: true, message: 'Please input the title!'}]}>
                    <Input placeholder="Write title"/>
                </Form.Item>

                <Form.Item
                    name="sensorLabel"
                    label="Sensor Label">
                    <Select
                        placeholder="Select sensor label"
                        options={config.availableLabels}
                    />
                </Form.Item>

                <Form.Item
                    name="dateRange"
                    label="Date Range"
                    rules={[{type: 'array', required: true, message: 'Please select date range!'}]}>
                    <RangePicker style={{width: '100%'}}/>
                </Form.Item>

                <Form.Item
                    name="includedSensors"
                    label="Included Sensor Types">
                    <Select
                        mode="multiple"
                        placeholder="Select sensor types"
                        options={config.availableSensors}
                    />
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