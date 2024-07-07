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

// const Select = styled.select`
//     width: 100%;
//     padding: 10px;
//     background-color: #1C1C21;
//     color: white;
//     border: 1px solid #3a3a3a;
//     border-radius: 5px;
//     font-size: 14px;
//     box-sizing: border-box;
//
//     &:focus {
//         outline: none;
//         border-color: #4caf50;
//     }
// `;

const StyledSelect = styled(Select)`
  width: 300px;

  .react-select__control {
    background-color: #2a2a36;
    border: none;
    border-radius: 5px;
  }

  .react-select__menu {
    background-color: #2a2a36;
    color: white;
  }

  .react-select__option {
    background-color: #2a2a36;
    &:hover {
      background-color: #3a3a46;
    }
  }

  .react-select__single-value {
    color: white;
  }

  .react-select__multi-value {
    background-color: #3a3a46;
  }

  .react-select__multi-value__label {
    color: white;
  }
`;

const ReportsDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [selectedSensorTypes, setSelectedSensorTypes] = useState([]);

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
                <StyledSelect
                    isMulti
                    options={predefinedLabels}
                    value={selectedLabels}
                    onChange={setSelectedLabels}
                    placeholder="Select sensor labels"
                />
                <StyledSelect
                    isMulti
                    options={sensorTypes}
                    value={selectedSensorTypes}
                    onChange={setSelectedSensorTypes}
                    placeholder="Select included sensor types"
                />
            </SearchContainer>
            <ReportsList />
        </DashboardContainer>
    );
};

export default ReportsDashboard;