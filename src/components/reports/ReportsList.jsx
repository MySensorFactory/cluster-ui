import React, {useState} from 'react';
import Table from 'antd/es/table';
import styled from 'styled-components';
import {ReportItemDetails} from "./ReportItemDetails";

const TableWithHoverableRows = styled(Table)`
    .ant-table-tbody > tr {
        cursor: pointer;
    }
`;

export const ReportsList = ({reports, onReportUpdate, onReportDelete, onReportDetailsShowRequest}) => {
    const [selectedReport, setSelectedReport] = useState(null);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Sensor label',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: 'Included sensors',
            dataIndex: 'includedSensors',
            key: 'includedSensors',
            render: (sensors) => sensors.join(', '),
        },
        {
            title: 'From date',
            dataIndex: ['timeRange', 'from'],
            key: 'fromDate',
            render: (date) => new Date(date).toDateString(),
        },
        {
            title: 'To date',
            dataIndex: ['timeRange', 'to'],
            key: 'toDate',
            render: (date) => new Date(date).toDateString(),
        },
    ];

    const handleReportClick = (record) => {
        onReportDetailsShowRequest(record.id, (reportDetails) => {
            setSelectedReport(reportDetails);
        });
    };

    const handleClosePopup = () => {
        setSelectedReport(null);
    };

    return (
        <>
            <TableWithHoverableRows
                columns={columns}
                dataSource={reports}
                bordered
                rowKey="id"
                pagination={false}
                onRow={(record, _) => ({
                    onClick: (_) => handleReportClick(record)
                })}
            />
            {selectedReport && (
                <ReportItemDetails
                    report={selectedReport}
                    onReportItemUpdate={(data) => {
                        onReportUpdate(selectedReport.id, data);
                    }}
                    onReportItemDelete={(id) => {
                        onReportDelete(id);
                        setSelectedReport(null);
                    }}
                    onClose={handleClosePopup}
                />
            )}
        </>
    );
};
