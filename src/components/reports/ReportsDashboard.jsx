import React, {useState} from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import ReportsList from './ReportsList';

const DashboardContainer = styled.div`
    padding: 20px;
    background-color: #1C1C21;
    color: white;
    min-height: 100vh;
`;

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

const DateInput = styled.input`
    background-color: #2a2a36;
    border: none;
    color: white;
    padding: 10px;
    border-radius: 5px;
    width: 150px;

    &::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }
`;

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#2a2a36',
        borderColor: state.isFocused ? '#4caf50' : '#3a3a3a',
        boxShadow: 'none',
        '&:hover': {
            borderColor: '#4caf50',
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#1C1C21',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#3a3a3a' : '#1C1C21',
        color: 'white',
        '&:hover': {
            backgroundColor: '#2a2a36',
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white',
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#3a3a3a',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: 'white',
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: 'white',
        '&:hover': {
            backgroundColor: '#4a4a4a',
            color: 'white',
        },
    }),
    input: (provided) => ({
        ...provided,
        color: 'white',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#999',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: 'white',
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        backgroundColor: '#3a3a3a',
    }),
};


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

const ReportsDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [selectedSensorTypes, setSelectedSensorTypes] = useState([]);
    const [sortProperty, setSortProperty] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        // Implement search logic here
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        // Implement date filtering logic here
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
        // Implement date filtering logic here
    };

    const toggleSortDirection = () => {
        setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
    };

    const predefinedLabels = [
        { value: "Temperature before compressor", label: "Temperature before compressor" },
        { value: "Pressure after compressor", label: "Pressure after compressor" },
        { value: "Input flow rate", label: "Input flow rate" },
        { value: "Output flow rate", label: "Output flow rate" },
        { value: "Gas composition", label: "Gas composition" }
    ];

    const sensorTypes = [
        { value: "temperature", label: "Temperature" },
        { value: "pressure", label: "Pressure" },
        { value: "flow", label: "Flow Rate" },
        { value: "composition", label: "Gas Composition" }
    ];

    const sortOptions = [
        { value: "date", label: "Date" },
        { value: "sensorType", label: "Sensor Type" },
        { value: "label", label: "Sensor Label" },
        { value: "value", label: "Sensor Value" }
    ];

    return (
        <DashboardContainer>
            <Title>Reports</Title>
            <SearchContainer>
                <SearchInput
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
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
                <Select
                    isMulti
                    options={predefinedLabels}
                    value={selectedLabels}
                    onChange={setSelectedLabels}
                    placeholder="Select sensor labels"
                    styles={customStyles}
                />
                <Select
                    isMulti
                    options={sensorTypes}
                    value={selectedSensorTypes}
                    onChange={setSelectedSensorTypes}
                    placeholder="Select included sensor types"
                    styles={customStyles}
                />
                <Select
                    options={sortOptions}
                    value={sortProperty}
                    onChange={setSortProperty}
                    placeholder="Select sorting property"
                    styles={customStyles}
                />
                <SortDirectionButton onClick={toggleSortDirection}>
                    {sortDirection === 'asc' ? '↑' : '↓'}
                </SortDirectionButton>
            </SearchContainer>
            <ReportsList />
        </DashboardContainer>
    );
};

export default ReportsDashboard;