import React from 'react';
import Layout from 'antd/es/layout';
import { ListPlaceholder } from "./ListPlaceholder";
import { useAppState } from "../AppStateContext";
import DefineReportItem from "./DefineReportItem";
import { useApiContext } from "../../datasource/ApiContext";
import { createUpsertReportRequest, TimeRange } from "../../datasource/ReportsClient";
import {theme} from "../styles/theme";

const { Content } = Layout;

const ReportsDashboard = () => {
    const { reportsSubMenu } = useAppState();
    const { reportsApi } = useApiContext();

    return (
        <Layout>
            <Content style={{
                padding: theme.sizes.padding.large,
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                minHeight: '100vh'
            }}>
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
                {reportsSubMenu === 'report_list' && <ListPlaceholder />}
            </Content>
        </Layout>
    );
};

export default ReportsDashboard;