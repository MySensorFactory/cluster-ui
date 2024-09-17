import React, {useState} from 'react';
import Card from 'antd/es/card'
import Typography from 'antd/es/typography'
import Space from 'antd/es/space'
import Button from 'antd/es/button'
import Modal from 'antd/es/modal'
import DefineReportItem from "./DefineReportItem";
import {TimeChart} from "../controls/TimeChart";
import {useConfigContext} from "../../datasource/ConfigContext";
import Edit from "../../assets/Edit";
import Delete from "../../assets/Delete";

const {Title, Text, Paragraph} = Typography;

const DetailsViewContent = ({report, setEditReportState, onReportItemDelete}) => {
    const {config} = useConfigContext();

    const getDaysFromReport = () => Math.floor((report.timeRange.to - report.timeRange.from) / (24 * 60 * 60 * 1000))

    return (
        <>
            <Space style={{position: 'absolute', top: 20, right: 24}}>
                <Button
                    icon={<Edit/>}
                    onClick={() => setEditReportState(true)}
                    type="primary"
                    ghost
                />
                <Button
                    icon={<Delete/>}
                    onClick={() => onReportItemDelete(report.id)}
                    type="primary"
                    danger
                    ghost
                />
            </Space>
            <Title level={2}>{report.title}</Title>
            <Paragraph>
                <Text strong>Sensor label:</Text> {report.sensorLabel}
            </Paragraph>
            <Paragraph>{report.description}</Paragraph>

            <Space direction="vertical" size="large" style={{width: '100%'}}>
                {Object.entries(report.dataBySensorType).map(([sensorType, data]) => (
                    <TimeChart
                        key={sensorType}
                        data={data.map(d => ({time: d.timestamp, value: d.values.value}))}
                        title={sensorType}
                        dataKey="value"
                        yAxisUnit={config.unitMapping[sensorType]}
                        days={getDaysFromReport()}
                        numTicks={10}
                    />
                ))}
            </Space>
        </>
    );
}

export const ReportItemDetails = ({report, onReportItemUpdate, onReportItemDelete, onClose}) => {
    const [isEditReportState, setEditReportState] = useState(false);

    return (
        <>
            <Modal
                visible={true}
                footer={null}
                closable={true}
                onCancel={onClose}
                width="80%"
                bodyStyle={{maxHeight: '80vh', overflow: 'auto'}}
                style={{top: '10%'}}
                maskStyle={{backgroundColor: 'transparent'}}
            >
                <Card
                    bordered={false}
                    bodyStyle={{padding: 0}}
                >
                    {!isEditReportState && (
                        <DetailsViewContent
                            report={report}
                            setEditReportState={setEditReportState}
                            onReportItemDelete={onReportItemDelete}
                        />
                    )}
                    {isEditReportState && (
                        <DefineReportItem
                            initialData={report}
                            onSave={(data) => {
                                setEditReportState(false);
                                onReportItemUpdate(data);
                            }}
                            isModal={true}
                            onClose={() => setEditReportState(false)}
                        />
                    )}
                </Card>
            </Modal>
        </>
    );
};