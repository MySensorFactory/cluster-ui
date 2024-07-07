import React, {useState} from 'react';
import styled from 'styled-components';
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

const ReportsDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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
            </SearchContainer>
            <ReportsList/>
        </DashboardContainer>
    );
};

export default ReportsDashboard;