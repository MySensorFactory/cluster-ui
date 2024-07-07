import React, {useState} from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
    width: 100%;
`;

const ColumnHeaders = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 2fr 0.5fr;
    gap: 10px;
    padding: 10px 15px;
    font-weight: bold;
    border-bottom: 1px solid #444;
    margin-bottom: 10px;
`;

const ReportItem = styled.div`
    background-color: #2a2a36;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 2fr 0.5fr;
    gap: 10px;
    align-items: center;
`;

const ReportInfo = styled.div`
    font-size: 14px;
`;

const MoreButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 20px;
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const PageButton = styled.button`
    background-color: #2a2a36;
    color: white;
    border: none;
    padding: 5px 10px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 3px;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background-color: #3a3a46;
    }
`;

const PageInfo = styled.span`
    margin: 0 10px;
    color: white;
`;

const PageInput = styled.input`
    background-color: #2a2a36;
    color: white;
    border: 1px solid #3a3a46;
    padding: 5px;
    width: 50px;
    margin: 0 5px;
    text-align: center;
    border-radius: 3px;

    &:focus {
        outline: none;
        border-color: #4a4a56;
    }
`;

const reports = [
    {
        name: 'Very important report from compressor',
        dateRange: '7/2/2024 8:00 - 8/3/2024 8:00',
        description: 'Lorem ipsum etc ...',
        sensorLabel: 'Before compressor',
        includedSensors: 'Temperature, Pressure, Flow rate',
    },
    {
        name: 'Very important report from compressor',
        dateRange: '7/2/2024 8:00 - 8/3/2024 8:00',
        description: 'Lorem ipsum etc ...',
        sensorLabel: 'Before compressor',
        includedSensors: 'Temperature, Pressure, Flow rate',
    },
    {
        name: 'Very important report from compressor',
        dateRange: '7/2/2024 8:00 - 8/3/2024 8:00',
        description: 'Lorem ipsum etc ...',
        sensorLabel: 'Before compressor',
        includedSensors: 'Temperature, Pressure, Flow rate',
    },
    {
        name: 'Very important report from compressor',
        dateRange: '7/2/2024 8:00 - 8/3/2024 8:00',
        description: 'Lorem ipsum etc ...',
        sensorLabel: 'Before compressor',
        includedSensors: 'Temperature, Pressure, Flow rate',
    },
    {
        name: 'Very important report from compressor',
        dateRange: '7/2/2024 8:00 - 8/3/2024 8:00',
        description: 'Lorem ipsum etc ...',
        sensorLabel: 'Before compressor',
        includedSensors: 'Temperature, Pressure, Flow rate',
    },
    {
        name: 'Very important report from compressor',
        dateRange: '7/2/2024 8:00 - 8/3/2024 8:00',
        description: 'Lorem ipsum etc ...',
        sensorLabel: 'Before compressor',
        includedSensors: 'Temperature, Pressure, Flow rate',
    },
    {
        name: 'Very important report from compressor',
        dateRange: '7/2/2024 8:00 - 8/3/2024 8:00',
        description: 'Lorem ipsum etc ...',
        sensorLabel: 'Before compressor',
        includedSensors: 'Temperature, Pressure, Flow rate',
    },
    {
        name: 'Very important report from compressor',
        dateRange: '7/2/2024 8:00 - 8/3/2024 8:00',
        description: 'Lorem ipsum etc ...',
        sensorLabel: 'Before compressor',
        includedSensors: 'Temperature, Pressure, Flow rate',
    },
    {
        name: 'Very important report from compressor',
        dateRange: '7/2/2024 8:00 - 8/3/2024 8:00',
        description: 'Lorem ipsum etc ...',
        sensorLabel: 'Before compressor',
        includedSensors: 'Temperature, Pressure, Flow rate',
    },
    {
        name: 'Very important report from compressor',
        dateRange: '7/2/2024 8:00 - 8/3/2024 8:00',
        description: 'Lorem ipsum etc ...',
        sensorLabel: 'Before compressor',
        includedSensors: 'Temperature, Pressure, Flow rate',
    },
    {
        name: 'Very important report from compressor',
        dateRange: '7/2/2024 8:00 - 8/3/2024 8:00',
        description: 'Lorem ipsum etc ...',
        sensorLabel: 'Before compressor',
        includedSensors: 'Temperature, Pressure, Flow rate',
    },
    // Add more report objects as needed
];

const ReportsList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState('');
    const itemsPerPage = 10; // You can adjust this number as needed

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReports = reports.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(reports.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setInputPage('');
    };

    const handleInputChange = (e) => {
        setInputPage(e.target.value);
    };

    const handleInputSubmit = (e) => {
        e.preventDefault();
        const pageNumber = parseInt(inputPage, 10);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            setInputPage('');
        }
    };

    return (
        <ListContainer>
            <ColumnHeaders>
                <div>Name & date range</div>
                <div>Description</div>
                <div>Sensor label</div>
                <div>Included sensors</div>
                <div></div>
            </ColumnHeaders>
            {currentReports.map((report, index) => (
                <ReportItem key={index}>
                    <ReportInfo>{report.name}<br/>{report.dateRange}</ReportInfo>
                    <ReportInfo>{report.description}</ReportInfo>
                    <ReportInfo>{report.sensorLabel}</ReportInfo>
                    <ReportInfo>{report.includedSensors}</ReportInfo>
                    <MoreButton>...</MoreButton>
                </ReportItem>
            ))}
            <PaginationContainer>
                <PageButton
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </PageButton>
                <PageInfo>
                    Page {currentPage} of {totalPages}
                </PageInfo>
                <PageButton
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </PageButton>
                <form onSubmit={handleInputSubmit}>
                    <PageInput
                        type="text"
                        min="1"
                        max={totalPages}
                        value={inputPage}
                        onChange={handleInputChange}
                        placeholder="Go to"
                    />
                    <PageButton type="submit">Go</PageButton>
                </form>
            </PaginationContainer>
        </ListContainer>
    );
};

export default ReportsList;