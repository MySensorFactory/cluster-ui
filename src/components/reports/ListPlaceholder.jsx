import React, {useEffect, useState} from "react";
import {ReportsList} from "./ReportsList";
import {useApiContext} from "../../datasource/ApiContext";
import {
    createFilter,
    createSearchReportsRequest,
    createSorting,
    createUpsertReportRequest,
    GetReportListResponse
} from "../../datasource/ReportsClient";
import {useConfigContext} from "../../datasource/ConfigContext";
import Button from 'antd/es/button';
import Col from 'antd/es/col';
import DatePicker from 'antd/es/date-picker'
import Select from 'antd/es/select';
import Input from 'antd/es/input';
import Pagination from 'antd/es/pagination'
import Row from 'antd/es/row';
import Typography from 'antd/es/typography'
import Layout from 'antd/es/layout'
import {theme} from "../styles/theme";

const {Title} = Typography;
const {Content} = Layout;

export const ListPlaceholder = () => {
    const {config} = useConfigContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [dateRange, setDateRange] = useState([null, null]);
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [selectedSensorTypes, setSelectedSensorTypes] = useState([]);
    const [sortProperty, setSortProperty] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const [currentPage, setCurrentPage] = useState(1);
    const [currentReports, setCurrentReports] = useState([])
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const {reportsApi} = useApiContext()

    const searchReports = () => {
        reportsApi.searchReports(
            createSearchReportsRequest(
                createFilter(searchTerm,
                    {
                        "label": selectedLabels,
                        "sensorTypes": selectedSensorTypes
                    },
                    ['title', 'description'],
                    dateRange[0]?.valueOf(),
                    dateRange[1]?.valueOf()),
                pageSize,
                currentPage,
                createSorting(sortDirection, sortProperty)),
            (data: GetReportListResponse) => {
                setCurrentReports(data.results);
                setTotalItems(data.totalItems);
            })
    }

    useEffect(() => {
        searchReports();
    }, [pageSize, currentPage, sortDirection, sortProperty, searchTerm, selectedLabels, selectedSensorTypes, dateRange]);

    const updateReport = (id, data) => {
        const request = createUpsertReportRequest(
            {
                from: new Date(data.fromDate).valueOf(),
                to: new Date(data.toDate).valueOf(),
            },
            data.includedSensors,
            data.sensorLabel,
            data.title,
            data.description,
        )
        reportsApi.updateReport(id, request, (_) => searchReports())
    }

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const deleteReport = (id) => {
        reportsApi.deleteReport(id, (_) => searchReports())
    }

    const handleGetReportDetails = (id, onComplete) => {
        reportsApi.getReportDetails(id, onComplete)
    }

    const toggleSortDirection = () => {
        setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
    };

    return (
        <Content style={{
            padding: theme.sizes.padding.large,
            backgroundColor: theme.colors.background,
            minHeight: '100vh'
        }}>
            <Title level={2} style={{color: 'white', marginBottom: theme.sizes.marginBottom.medium}}>
                Reports
            </Title>
            <Row gutter={[16, 16]} style={{marginBottom: theme.sizes.marginBottom.medium}}>
                <Col>
                    <Input
                        placeholder="Search"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{width: 200}}
                    />
                </Col>
                <Col>
                    <DatePicker.RangePicker
                        value={dateRange}
                        onChange={setDateRange}
                    />
                </Col>
                <Col flex="auto">
                    <Select
                        mode="multiple"
                        style={{width: '100%'}}
                        placeholder="Select sensor labels"
                        value={selectedLabels}
                        onChange={setSelectedLabels}
                        options={config.availableLabels}/>
                </Col>
                <Col flex="auto">
                    <Select
                        mode="multiple"
                        style={{width: '100%'}}
                        placeholder="Select included sensor types"
                        value={selectedSensorTypes}
                        onChange={setSelectedSensorTypes}
                        options={config.availableSensors}/>
                </Col>
                <Col>
                    <Select
                        style={{width: 200}}
                        value={sortProperty}
                        onChange={setSortProperty}
                        placeholder="Select sorting property"
                        options={config.sortOptions}/>
                </Col>
                <Col>
                    <Button
                        onClick={toggleSortDirection}
                        style={{padding: '4px 15px'}}
                    >
                        {sortDirection === 'asc' ? '↑' : '↓'}
                    </Button>
                </Col>
            </Row>
            <ReportsList
                reports={currentReports}
                onReportDetailsShowRequest={handleGetReportDetails}
                onReportUpdate={updateReport}
                onReportDelete={deleteReport}
            />
            <Pagination
                current={currentPage}
                total={totalItems}
                pageSize={pageSize}
                onChange={handlePageChange}
                onShowSizeChange={handlePageChange}
                showSizeChanger={true}
                showQuickJumper
                pageSizeOptions={['5', '10', '20', '50']}
                style={{marginTop: theme.sizes.marginTop, textAlign: 'center'}}
            />
        </Content>
    );

}
