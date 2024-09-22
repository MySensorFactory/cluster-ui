import React from 'react';
import Col from 'antd/es/col'
import Row from 'antd/es/row'
import Typography from 'antd/es/typography'
import {SensorValueItem} from './SensorValueItem';
import {theme} from "../styles/theme";
import {AddButton} from "../controls/Buttons";

const {Title} = Typography;

export const SensorValues = ({
                                 title,
                                 data,
                                 handleEditSensor,
                                 handleDeleteSensor,
                                 handleAddSensor,
                                 isAddSensorButtonVisible
                             }) => {
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
                {data.map((sensor) => (
                    <Col
                        key={sensor.id}
                        xs={sensor.isWide ? 24 : 12}
                        sm={sensor.isWide ? 24 : 12}
                        md={sensor.isWide ? 16 : 8}
                        lg={sensor.isWide ? 8 : 4}
                    >
                        <SensorValueItem
                            label={sensor.label}
                            value={sensor.value}
                            onEdit={() => handleEditSensor(sensor.id)}
                            onDelete={() => handleDeleteSensor(sensor.id)}
                        />
                    </Col>
                ))}
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