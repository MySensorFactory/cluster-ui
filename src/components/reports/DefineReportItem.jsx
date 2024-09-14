import React, {useLayoutEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {MultiSelect, SingleSelect} from "../controls/Select";
import {ButtonWithIcon} from "../controls/Buttons";
import Apply from "../../assets/Apply";
import {useConfigContext} from "../../datasource/ConfigContext";

const FormContainer = styled.div`
    background-color: #1C1C21;
    color: white;
    padding: 20px;
    width: 1000px; 
    border-radius: 10px;
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: ${props => props.width}px;
    padding: 10px 0;
    margin-bottom: 15px;
    background-color: #2a2a36;
    color: white;
    border: 1px solid #3a3a3a;
    border-radius: 5px;
`;

const TextArea = styled.textarea`
    width: ${props => props.width}px;
    height: 100px;
    padding: 10px 0;
    margin-bottom: 15px;
    margin-right: 20px;
    background-color: #2a2a36;
    color: white;
    border: 1px solid #3a3a3a;
    border-radius: 5px;
    resize: none;
`;

const ControlsContainer = styled.div`
    display: flex;
    width: 95%;
    justify-content: space-between;
    margin-bottom: 15px;
    gap: 20px;
`;

const ControlWrapper = styled.div`
    flex: 1;
    margin-right: 10px;

    &:last-child {
        margin-right: 0;
    }
`;

const DateInput = styled(Input)`
    width: 100%;
`;

const ControlLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    font-size: 14px;
    color: #a0a0a0;
`;


const DefineReportItem = ({onSave, initialData}) => {
    const {config} = useConfigContext();
    const [title, setTitle] = useState(initialData?.name || '');
    const [sensorLabel, setSensorLabel] = useState(initialData?.label || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [fromDate, setFromDate] = useState(initialData?.timeRange.from || '');
    const [toDate, setToDate] = useState(initialData != null ? new Date(initialData.timeRange.to) : '');
    const [includedSensors, setIncludedSensors] = useState(initialData?.includedSensors || []);


    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({ width:0, height: 0 });

    useLayoutEffect(() => {
        if (targetRef.current) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            });
        }
    }, []);

    const handleSave = () => {
        if (onSave !== undefined) {
            onSave({title, sensorLabel, description, fromDate, toDate, includedSensors: includedSensors.map(s => s.value)});
        }
    };

    return (
        <FormContainer>
            <Title>{initialData ? 'Edit Report' : 'Create Report'}</Title>
            <Input
                width={dimensions.width}
                type="text"
                placeholder="Write title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <ControlsContainer ref={targetRef}>
                <ControlWrapper>
                    <ControlLabel>Sensor Label</ControlLabel>
                    <SingleSelect
                        options={config.availableLabels}
                        value={config.availableLabels.find(option => option.value === sensorLabel)}
                        onChange={setSensorLabel}
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
                        options={config.availableSensors}
                        value={includedSensors}
                        onChange={setIncludedSensors}
                        placeholder="Select sensor types"
                    />
                </ControlWrapper>
            </ControlsContainer>
            <TextArea
                width={dimensions.width}
                placeholder="Write description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <ButtonWithIcon
                svgComponent={<Apply/>}
                text={'Save'}
                onClick={handleSave}
            />
        </FormContainer>
    );
};

export default DefineReportItem;