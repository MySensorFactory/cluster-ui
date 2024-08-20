import React, {useEffect, useState} from 'react';
import {Container, FlexContainer, Input, ScrollContainer, StyledCheckbox, Text, Title} from '../styles/CommonStyles';
import {EventItem} from './EventItem';
import {useApiContext} from "../../datasource/ApiContext";
import {theme} from '../styles/theme';

export const Events = () => {
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [showOnlyAlerts, setShowOnlyAlerts] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateRange, setDateRange] = useState({start: '', end: ''});
    const {homeApi} = useApiContext();

    useEffect(() => {
        homeApi.getEvents({
            showOnlyAlerts,
            searchTerm,
            startDate: dateRange.start,
            endDate: dateRange.end
        }, setFilteredEvents);
    }, [showOnlyAlerts, searchTerm, dateRange]);

    return (
        <Container>
            <Title>Events & alerts</Title>
            <FlexContainer
                direction="column"
                gap={theme.sizes.gap.tight}
                padding={theme.sizes.padding.small}
            >
                <label>
                    <FlexContainer gap={theme.sizes.gap.tight}>
                        <StyledCheckbox
                            type="checkbox"
                            checked={showOnlyAlerts}
                            onChange={(e) => setShowOnlyAlerts(e.target.checked)}
                        />
                        <Text>Show only alerts</Text>
                    </FlexContainer>
                </label>
                <FlexContainer gap={theme.sizes.padding.small}>
                    <Input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    />
                    <Input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    />
                </FlexContainer>
            </FlexContainer>
            <ScrollContainer>
                {filteredEvents.map((event, index) => (
                    <EventItem
                        key={index}
                        title={event.title}
                        time={event.time}
                        isAlert={event.isAlert}
                    />
                ))}
            </ScrollContainer>
        </Container>
    );
};