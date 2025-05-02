import React, {useState} from 'react';
import Table from 'antd/es/table';
import styled from 'styled-components';
import {ReportItemDetails} from "./ReportItemDetails";
import type {GetReportDetailsResponse} from "../../datasource/ReportsClient";
import {ReportPreview} from "../../datasource/ReportsClient";
import {useConfigContext} from "../../datasource/ConfigContext";

const TableWithHoverableRows = styled(Table)`
    .ant-table-tbody > tr {
        cursor: pointer;
    }
`;

export const ReportsList = ({reports, onReportUpdate, onReportDelete, onReportDetailsShowRequest}: {
    reports: ReportPreview[],
    onReportUpdate: (id: string, data: GetReportDetailsResponse) => void,
    onReportDelete: (id: string) => void,
    onReportDetailsShowRequest: (id: string, onComplete: (GetReportDetailsResponse) => void) => void
}) => {
    const [selectedReport, setSelectedReport] = useState(null);
    const {config} = useConfigContext();

    const formatSensorLabels = (sensorLabels: Record<string, string[]>) => {
        return Object.entries(sensorLabels)
            .map(([sensorType, labels]) => {
                const dataSource = config.dataSources[sensorType];
                const displaySensorType = dataSource?.displayName || sensorType;
                return `${displaySensorType}: [ ${labels} ]`;
            })
            .join(', ');
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Sensors',
            key: 'sensors',
            render: (_, record: ReportPreview) => {
                return formatSensorLabels(record.sensorLabels)
            }
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

    const handleReportClick = (record: ReportPreview) => {
        onReportDetailsShowRequest(record.id, (reportDetails: GetReportDetailsResponse) => {
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
                onRow={(record: ReportPreview) => ({
                    onClick: () => handleReportClick(record)
                })}
            />
            {selectedReport && (
                <ReportItemDetails
                    report={selectedReport}
                    onReportItemUpdate={(data: GetReportDetailsResponse) => {
                        onReportUpdate(selectedReport.id, data);
                    }}
                    onReportItemDelete={(id: string) => {
                        onReportDelete(id);
                        setSelectedReport(null);
                    }}
                    onClose={handleClosePopup}
                />
            )}
        </>
    );
};