import React from "react";
import Add from "../../assets/Add";
import {theme} from "../styles/theme";
import Button from "antd/es/button/button";

export const AddButton = ({onButtonClicked}: {onButtonClicked: () => void}) => {
    return (
        <Button
            type="primary"
            icon={<Add/>}
            onClick={onButtonClicked}
            style={{
                width: '100%',
                height: '105px',
                backgroundColor: theme.colors.primary,
                borderColor: theme.colors.primary
            }}>
            Add
        </Button>
    );
};