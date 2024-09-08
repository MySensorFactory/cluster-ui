import React from 'react';
import styled from 'styled-components';
import {ListPlaceholder} from "./ListPlaceholder";
import {useAppState} from "../AppStateContext";
import DefineReportItem from "./DefineReportItem";
import {useApiContext} from "../../datasource/ApiContext";
import {createUpsertReportRequest, TimeRange} from "../../datasource/ReportsClient";

const DashboardContainer = styled.div`
    padding: 20px;
    background-color: #1C1C21;
    color: white;
    min-height: 100vh;
`;

const ReportsDashboard = () => {
    const {reportsSubMenu} = useAppState();
    const {reportsApi} = useApiContext()

    return (
        <DashboardContainer>
            {reportsSubMenu === 'define_report' &&
                <DefineReportItem
                    onSave={data => {
                        reportsApi.createReport(createUpsertReportRequest(
                            new TimeRange(
                                new Date(data.fromDate).valueOf(),
                                new Date(data.toDate).valueOf()
                            ),
                            data.includedSensors,
                            data.sensorLabel,
                            data.title,
                            data.description,
                        ), null);
                    }}
                />}
            {reportsSubMenu === 'report_list' && <ListPlaceholder/>}
        </DashboardContainer>
    );
};

export default ReportsDashboard;