import React, {useState} from 'react';
import styled from 'styled-components';
import {ReportItemDetails} from "./ReportItemDetails";

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
    grid-template-columns: 2fr 2fr 1fr 2fr;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const ReportsContainer = styled.div`
    filter: ${props => props.isBlurred ? 'blur(5px)' : 'none'};
    transition: filter 0.3s ease;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const ReportInfo = styled.div`
    font-size: 14px;
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

const ReportsList = ({reports, onReportUpdate, onReportDelete, onReportDetailsShowRequest}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState('');
    const [selectedReport, setSelectedReport] = useState(null);
    const itemsPerPage = 10; // You can adjust this number as needed

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

    const handleReportClick = (report) => {
        onReportDetailsShowRequest(report.id,
            (reportDetails) => {
                setSelectedReport(reportDetails)
            });
    };

    const handleClosePopup = () => {
        setSelectedReport(null);
    };

    return (
        <>
            <ReportsContainer isBlurred={selectedReport !== null}>
                <ColumnHeaders>
                    <div>Name</div>
                    <div>Sensor label</div>
                    <div>Included sensors</div>
                    <div>From date</div>
                    <div>To date</div>
                </ColumnHeaders>
                {reports.map((report, _) => (
                    <ReportItem key={report.id} onClick={() => handleReportClick(report)}>
                        <ReportInfo>{report.name}</ReportInfo>
                        <ReportInfo>{report.label}</ReportInfo>
                        <ReportInfo>{report.includedSensors.join(',')}</ReportInfo>
                        <ReportInfo>{new Date(report.timeRange.from).toDateString()}</ReportInfo>
                        <ReportInfo>{new Date(report.timeRange.to).toDateString()}</ReportInfo>
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
            </ReportsContainer>
            {selectedReport && (
                <>
                    <Overlay onClick={handleClosePopup}/>
                    <ReportItemDetails
                        report={selectedReport}
                        onReportItemUpdate={(data) => {
                            onReportUpdate(selectedReport.id, data)
                        }}
                        onReportItemDelete={id => {
                            onReportDelete(id)
                            setSelectedReport(null)
                        }}
                    >
                    </ReportItemDetails>
                </>
            )}
        </>
    );
};

export default ReportsList;