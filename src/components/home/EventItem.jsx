import React from 'react';
import styled from 'styled-components';

const EventItemContainer = styled.div`
    background: #2a2a36;
    padding: 10px 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const EventTitle = styled.div`
    font-size: 16px;
`;

const EventTime = styled.div`
    font-size: 14px;
    color: #9a9ab0;
`;

const EventItem = ({title, time, isAlert = false }) => {

    return (
        <EventItemContainer
            style = {isAlert ? {background: '#5f2424'} : {}}
        >
            <EventTitle>{title}</EventTitle>
            <EventTime>{time}</EventTime>
        </EventItemContainer>
    );
};

export default EventItem;
