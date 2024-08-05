import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import EventItem from './EventItem';
import {useApiContext} from "../../datasource/ApiContext";


const EventsContainer = styled.div`
    margin-bottom: 20px;
    color: #ffffff;
    background-color: #1C1C21;
    padding: 20px;
`;

const EventsScrollContainer = styled.div`
    max-height: 300px;
    overflow-y: auto;
    padding-right: 10px;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #2c2c2c;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #444;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    scrollbar-width: thin;
    scrollbar-color: #444 #2c2c2c;
`;

const FilterContainer = styled.div`
    margin-bottom: 10px;
`;

const SearchContainer = styled.div`
    margin-bottom: 10px;
    display: flex;
    gap: 10px;
`;

const StyledInput = styled.input`
    background-color: #2c2c2c;
    border: 1px solid #444;
    color: #ffffff;
    padding: 5px 10px;
    border-radius: 4px;

    &:focus {
        outline: none;
        border-color: #007bff;
    }

    &[type="date"] {
        color: #ffffff;

        &::-webkit-calendar-picker-indicator {
            filter: invert(1);
        }
    }
`;

const StyledCheckbox = styled.input`
    margin-right: 5px;
    accent-color: #007bff;
`;

const StyledLabel = styled.label`
    display: flex;
    align-items: center;
    font-size: 14px;
`;

const Events = () => {
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [showOnlyAlerts, setShowOnlyAlerts] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState({start: '', end: ''});
    const {homeApi} = useApiContext();

    useEffect(() =>
        homeApi.getEvents({
            showOnlyAlerts,
            searchTerm,
            startDate: dateRange.start,
            endDate: dateRange.end
        }, setFilteredEvents), [showOnlyAlerts, searchTerm, dateRange]);

    return (
        <EventsContainer>
            <h2>Events & alerts</h2>
            <FilterContainer>
                <StyledLabel>
                    <StyledCheckbox
                        type="checkbox"
                        checked={showOnlyAlerts}
                        onChange={(e) => setShowOnlyAlerts(e.target.checked)}
                    />
                    Show only alerts
                </StyledLabel>
            </FilterContainer>
            <SearchContainer>
                <StyledInput
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <StyledInput
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                />
                <StyledInput
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                />
            </SearchContainer>
            <EventsScrollContainer>
                {filteredEvents.map((event, index) => (
                    <EventItem
                        key={index}
                        title={event.title}
                        time={event.time}
                        isAlert={event.isAlert}
                    />
                ))}
            </EventsScrollContainer>
        </EventsContainer>
    );
};

export default Events;