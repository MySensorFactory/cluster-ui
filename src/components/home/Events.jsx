import React from 'react';
import styled from 'styled-components';
import EventItem from './EventItem';

const EventsContainer = styled.div`
  margin-bottom: 20px;
`;

const events = [
    { title: 'Speed workout at the track', time: 'Thursday, 6:00 PM - 8:00 PM' },
    { title: 'Long run from the club house', time: 'Sunday, 8:00 AM - 10:00 AM' },
    { title: 'Hill repeats on 5th Street', time: 'Tuesday, 7:00 PM - 8:00 PM' },
];

const Events = () => {
    return (
        <EventsContainer>
            <h2>Events & alerts</h2>
            {events.map((event, index) => (
                <EventItem key={index} title={event.title} time={event.time} />
            ))}
        </EventsContainer>
    );
};

export default Events;
