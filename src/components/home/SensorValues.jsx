import {SensorValueItem} from "./SensorValueItem";
import {AddButton} from "../controls/Buttons";
import React from "react";
import {Container, FlexContainer, GridFlexItemWrapper, Title} from "../styles/CommonStyles";
import {theme} from "../styles/theme"

export const SensorValues = ({
                                 title,
                                 data,
                                 handleEditSensor,
                                 handleDeleteSensor,
                                 handleAddSensor,
                                 isAddSensorButtonVisible
                             }) => {
    return (
        <Container>
            <Title>{title}</Title>
            <FlexContainer
                wrap="wrap"
                gap={theme.sizes.gap.large}
            >
                {data.map((sensor, _) => (
                    <GridFlexItemWrapper
                        key={sensor.id}
                        className={sensor.label === 'composition' ? 'wide' : ''}
                    >
                        <SensorValueItem
                            label={sensor.label}
                            value={sensor.value}
                            onEdit={() => handleEditSensor(sensor.id)}
                            onDelete={() => handleDeleteSensor(sensor.id)}
                        />
                    </GridFlexItemWrapper>
                ))}
                {isAddSensorButtonVisible && (
                    <GridFlexItemWrapper>
                        <AddButton onButtonClicked={handleAddSensor}/>
                    </GridFlexItemWrapper>
                )}
            </FlexContainer>
        </Container>
    );
}