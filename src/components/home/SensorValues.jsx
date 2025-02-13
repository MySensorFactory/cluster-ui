import React from 'react';
import Col from 'antd/es/col'
import Row from 'antd/es/row'
import Typography from 'antd/es/typography'
import {SensorValueItem} from './SensorValueItem';
import {theme} from "../styles/theme";
import {AddButton} from "../controls/Buttons";
import {useConfigContext} from "../../datasource/ConfigContext";
import type {SensorValue} from "../../datasource/HomeClient";

const {Title} = Typography;

export const SensorValues = ({
                                 title,
                                 data,
                                 handleEditSensor,
                                 handleDeleteSensor,
                                 handleAddSensor,
                                 isAddSensorButtonVisible,
                                 getDisplayName
                             }: {
    title: string,
    data: SensorValue[],
    handleEditSensor: (sensorId: string) => void,
    handleDeleteSensor: (sensorId: string) => void,
    handleAddSensor: () => void,
    isAddSensorButtonVisible: boolean,
    getDisplayName: (sensor: SensorValue) => string
}) => {
    const {config} = useConfigContext()

    return (
        <div style={{marginBottom: theme.sizes.marginBottom.medium}}>
            <Title
                level={3}
                style={{
                    color: theme.colors.text,
                    marginBottom: theme.sizes.marginBottom.medium
                }}>
                {title}
            </Title>
            <Row gutter={[16, 16]}>
                {data.map((sensor: SensorValue) => {
                    const isSensorWide = config.wideSensors.includes(sensor.sensorType);
                    return (
                        <Col
                            key={sensor.id}
                            xs={isSensorWide ? 24 : 12}
                            sm={isSensorWide ? 24 : 12}
                            md={isSensorWide ? 16 : 8}
                            lg={isSensorWide ? 8 : 4}
                        >
                            <SensorValueItem
                                label={getDisplayName(sensor)}
                                value={Object.entries(sensor.values)
                                    .map(([key: string, value: number]): string =>
                                        `${key}: ${Math.round(value * 100) / 100} ${config.unitMapping[sensor.sensorType][key]} `)}
                                onEdit={() => handleEditSensor(sensor.id)}
                                onDelete={() => handleDeleteSensor(sensor.id)}
                            />
                        </Col>
                    )
                })}
                {isAddSensorButtonVisible && (
                    <Col xs={12} sm={12} md={8} lg={4}>
                        <AddButton
                            onButtonClicked={handleAddSensor}
                        />
                    </Col>
                )}
            </Row>
        </div>
    );
};