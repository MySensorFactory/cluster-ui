import {FlexContainer, Text} from "../styles/CommonStyles";
import {theme} from "../styles/theme";
import {DateInput} from "../styles/DateInputStyles";
import React from "react";

export const LabeledDateInput = ({label, onChange, value}) => (
    <FlexContainer gap={theme.sizes.gap.small}
                   direction={'column'}
                   align={'center'}>
        <Text>{label}</Text>
        <DateInput
            type={'date'}
            value={value}
            onChange={onChange}
        />
    </FlexContainer>
)
