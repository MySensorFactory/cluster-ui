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
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }

    &:last-child {
        grid-column: span 2;
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

    .fraction {
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        font-size: 0.8em;
    }
    .fraction > span {
        display: block;
    }
    .fraction span.bottom {
        border-top: 1px solid;
        padding-top: 2px;
    }
`;

const formatUnit = (value) => {
    return value
        .replace(/\^3/, '³')
        .replace(/CO2/g, 'CO₂')
        .replace(/H2/g, 'H₂')
        .replace(/O2/g, 'O₂')
        .replace(/N2/g, 'N₂')
        .replace(/NH3/g, 'NH₃')
        .replace(/m³\/min/g, '<span class="fraction"><span>m³</span><span class="bottom">min</span></span>');
};

const SensorValueItem = ({ label, value }) => {
    return (
        <SensorValueItemContainer>
            <SensorLabel>{label}</SensorLabel>
            <SensorValue dangerouslySetInnerHTML={{ __html: formatUnit(value) }} />
        </SensorValueItemContainer>
    );
};

export default SensorValueItem;