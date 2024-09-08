import React, {useEffect, useState} from 'react';
import {Container, FlexContainer, Input, ScrollContainer, StyledCheckbox, Text, Title} from '../styles/CommonStyles';
import {EventItem} from './EventItem';
import {useApiContext} from "../../datasource/ApiContext";
import {theme} from '../styles/theme';
import {LabeledDateInput} from "../controls/Inputs";

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
                <FlexContainer gap={theme.sizes.padding.small}
                               align={'center'}>
                    <Input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <LabeledDateInput
                        label={'Start date'}
                        onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                        value={dateRange.start}
                    />
                    <LabeledDateInput
                        label={'End date'}
                        onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                        value={dateRange.end}
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