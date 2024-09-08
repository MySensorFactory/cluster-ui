import React, {useEffect, useState} from "react";
import ReportsList from "./ReportsList";
import styled from "styled-components";
import {MultiSelect, SingleSelect} from "../controls/Select";
import {DateInput} from "../styles/DateInputStyles";
import {useApiContext} from "../../datasource/ApiContext";
import {
    createFilter,
    createSearchReportsRequest,
    createSorting,
    createUpsertReportRequest, GetReportListResponse
} from "../../datasource/ReportsClient";

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
`;

const SearchContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

const SearchInput = styled.input`
    background-color: #2a2a36;
    border: none;
    color: white;
    padding: 10px;
    border-radius: 5px;
    width: 300px;
`;


const SortDirectionButton = styled.button`
    background-color: #2a2a36;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #3a3a46;
    }
`;

export const ListPlaceholder = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [selectedSensorTypes, setSelectedSensorTypes] = useState([]);
    const [sortProperty, setSortProperty] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [currentReports, setCurrentReports] = useState([])

    const {reportsApi} = useApiContext()

    const searchReports = () => {
        reportsApi.searchReports(
            createSearchReportsRequest(
                createFilter(searchTerm,
                    {
                        "label": selectedLabels.map(l => l.value),
                        "sensorTypes": selectedSensorTypes.map(t => t.value)
                    },
                    ['title', 'description'],
                    new Date(startDate).valueOf(),
                    new Date(endDate).valueOf()),
                itemsPerPage,
                currentPage,
                createSorting(sortDirection, sortProperty)),
            (data: GetReportListResponse) => {
                setCurrentReports(data.results)
            })
    }

    useEffect(() => {
        searchReports();
    }, [itemsPerPage, currentPage, sortDirection, sortProperty, searchTerm, selectedLabels, selectedSensorTypes, startDate, endDate]);

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

    const deleteReport = (id) => {
        reportsApi.deleteReport(id, (_) => searchReports())
    }

    const handleGetReportDetails = (id, onComplete) => {
        reportsApi.getReportDetails(id, onComplete)
    }

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const toggleSortDirection = () => {
        setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
    };

    const predefinedLabels = [
        {value: "Temperature before compressor", label: "Temperature before compressor"},
        {value: "Pressure after compressor", label: "Pressure after compressor"},
        {value: "Input flow rate", label: "Input flow rate"},
        {value: "Output flow rate", label: "Output flow rate"},
        {value: "Gas composition", label: "Gas composition"}
    ];

    const sensorTypes = [
        {value: "temperature", label: "Temperature"},
        {value: "pressure", label: "Pressure"},
        {value: "flow", label: "flowRate"},
        {value: "composition", label: "Gas Composition"}
    ];

    const sortOptions = [
        {value: "date", label: "Date"},
        {value: "sensorType", label: "Sensor Type"},
        {value: "label", label: "Sensor Label"},
        {value: "value", label: "Sensor Value"}
    ];

    return (
        <>
            <Title>Reports</Title>
            <SearchContainer>
                <SearchInput
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <DateInput
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                />
                <DateInput
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                />
                <MultiSelect
                    isMulti
                    options={predefinedLabels}
                    value={selectedLabels}
                    onChange={labels => {
                        if (labels != null) {
                            setSelectedLabels(labels)
                            return;
                        }

                        setSelectedLabels([])
                    }}
                    placeholder="Select sensor labels"
                />
                <MultiSelect
                    isMulti
                    options={sensorTypes}
                    value={selectedSensorTypes}
                    onChange={sensorTypes => {
                        console.log(sensorTypes)
                        if (sensorTypes != null) {
                            console.log(sensorTypes)
                            setSelectedSensorTypes(sensorTypes)
                            console.log(selectedSensorTypes)
                            return;
                        }

                        setSelectedSensorTypes([])
                    }}
                    placeholder="Select included sensor types"
                />
                <SingleSelect
                    options={sortOptions}
                    value={sortProperty}
                    onChange={setSortProperty}
                    placeholder="Select sorting property"
                />
                <SortDirectionButton onClick={toggleSortDirection}>
                    {sortDirection === 'asc' ? '↑' : '↓'}
                </SortDirectionButton>
            </SearchContainer>
            <ReportsList
                reports={currentReports}
                onReportDetailsShowRequest={handleGetReportDetails}
                onReportUpdate={updateReport}
                onReportDelete={deleteReport}
            />
        </>
    );
}
