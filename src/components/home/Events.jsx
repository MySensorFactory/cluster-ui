import React, {useEffect, useState} from 'react';
import Checkbox from 'antd/es/checkbox/Checkbox'
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import Space from 'antd/es/space';
import DatePicker from 'antd/es/date-picker';
import Input from 'antd/es/input';
import Typography from 'antd/es/typography'
import {EventItem} from './EventItem';
import {useApiContext} from "../../datasource/ApiContext";
import {theme} from "../styles/theme"
import List from "antd/es/list";
import {Event, HomeApi} from "../../datasource/HomeClient"
import dayjs from "dayjs";
import {CheckboxChangeEvent} from "antd/es/checkbox/Checkbox";

const {Title} = Typography;
const {Search} = Input;

export const Events = () => {
    const [filteredEvents: Event[], setFilteredEvents: (Event[])=> void] = useState([]);
    const [showOnlyAlerts: boolean, setShowOnlyAlerts: (boolean)=> void] = useState(false);
    const [searchTerm: string, setSearchTerm: (string) => void] = useState('');
    const [dateRange: dayjs[], setDateRange: (dayjs[]) => void] = useState([null, null]);
    const {homeApi}: { homeApi: HomeApi } = useApiContext();

    useEffect(() => {
        homeApi.getEvents({
            showOnlyAlerts,
            searchTerm,
            startDate: dateRange[0]?.format('YYYY-MM-DD'),
            endDate: dateRange[1]?.format('YYYY-MM-DD')
        }, setFilteredEvents);
    }, [showOnlyAlerts, searchTerm, dateRange]);

    return (
        <div style={{
            backgroundColor: theme.colors.background,
            padding: theme.sizes.padding.large,
            borderRadius: theme.sizes.borderRadius
        }}>
            <Title level={3} style={{color: theme.colors.text, marginBottom: theme.sizes.marginBottom.medium}}>
                Events & alerts
            </Title>
            <Row gutter={[16, 16]} align="middle" style={{marginBottom: theme.sizes.marginBottom.medium}}>
                <Col>
                    <Checkbox
                        checked={showOnlyAlerts}
                        onChange={(e: CheckboxChangeEvent) => setShowOnlyAlerts(e.target.checked)}
                        style={{color: theme.colors.text}}
                    >
                        Show only alerts
                    </Checkbox>
                </Col>
                <Col flex="auto">
                    <Search
                        placeholder="Search events..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{width: '100%'}}
                    />
                </Col>
                <Col>
                    <Space>
                        <DatePicker.RangePicker
                            value={dateRange}
                            onChange={setDateRange}
                        />
                    </Space>
                </Col>
            </Row>
            <List
                dataSource={filteredEvents}
                renderItem={(event: Event) => (
                    <EventItem
                        title={event.title}
                        time={event.time}
                        isAlert={event.isAlert}
                    />
                )}
                style={{maxHeight: '300px', overflowY: 'auto'}}
            />
        </div>
    );
};