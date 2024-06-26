import React from 'react';
import styled from 'styled-components';

const SensorValueItemContainer = styled.div`
    background: #2a2a36;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

const SensorLabel = styled.div`
    font-size: 14px;
    color: #9a9ab0;
    margin-bottom: 5px;
    text-align: center;
`;

const SensorValue = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: white;
`;

const SensorValueItem = ({ label, value }) => {
    return (
        <SensorValueItemContainer>
            <SensorLabel>{label}</SensorLabel>
            <SensorValue>{value}</SensorValue>
        </SensorValueItemContainer>
    );
};

export default SensorValueItem;
