import React, {useEffect, useState} from "react";
import {ReportsList} from "./ReportsList";
import {useApiContext} from "../../datasource/ApiContext";
import {
    createFilter,
    createSearchReportsRequest,
    createSorting,
    GetReportDetailsResponse,
    GetReportListResponse,
    ReportPreview,
    ReportsApi,
    UpsertReportRequest
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
import Space from "antd/es/space";
import type {Config} from "../../datasource/ConfigClient";
import dayjs from "dayjs";
import Spin from "antd/es/spin";

const {Title} = Typography;
const {Content} = Layout;

const LoadingSpinner = <Spin size="large" fullscreen={true}/>;

export const ListPlaceholder = () => {
    const {config}: { config: Config } = useConfigContext();
    const [searchTerm: string, setSearchTerm: (string) => void] = useState("");
    const [dateRange: dayjs[], setDateRange: (dayjs[]) => void] = useState([null, null]);
    const [selectedLabels: string[], setSelectedLabels: (string[]) => void] = useState([]);
    const [selectedSensorTypes: string[], setSelectedSensorTypes: (string[]) => void] = useState([]);
    const [sortProperty: string, setSortProperty: (string) => void] = useState(null);
    const [sortDirection: string, setSortDirection: (string) => void] = useState('asc');

    const [currentPage: number, setCurrentPage: (number) => void] = useState(1);
    const [currentReports: ReportPreview[], setCurrentReports: (ReportPreview[]) => void] = useState([])
    const [totalItems: number, setTotalItems: (number) => void] = useState(0);
    const [pageSize: number, setPageSize: (number) => void] = useState(10);

    const {reportsApi}: { reportsApi: ReportsApi } = useApiContext()

    const [isLoading, setIsLoading: (boolean) => void] = useState(true);

    const searchReports = () => {
        setIsLoading(true);
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
                setIsLoading(false);
            })
    }

    useEffect(() => {
        searchReports();
    }, [pageSize, currentPage, sortDirection, sortProperty, searchTerm, selectedLabels, selectedSensorTypes, dateRange]);

    const updateReport = (id: string, data: GetReportDetailsResponse) => {
        const request = new UpsertReportRequest(
            data.timeRange,
            data.includedSensors,
            data.label,
            data.name,
            data.description,
        )
        reportsApi.updateReport(id, request, (_) => searchReports())
    }

    const handlePageChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const deleteReport = (id: string) => {
        reportsApi.deleteReport(id, (_) => searchReports())
    }

    const handleGetReportDetails = (id: string, onComplete: (GetReportDetailsResponse) => void) => {
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
            <Space direction="vertical" size="middle" style={{display: 'flex'}}>
                {isLoading? LoadingSpinner :
                    <ReportsList
                    reports={currentReports}
                    onReportUpdate={updateReport}
                    onReportDelete={deleteReport}
                    onReportDetailsShowRequest={handleGetReportDetails}
                />}
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
            </Space>
        </Content>
    );

}
