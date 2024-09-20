import SvgResizer from "react-svg-resizer";
import React from "react";
import {ButtonWithIconContainer} from "../styles/ButtonStyles";
import Add from "../../assets/Add";
import {theme} from "../styles/theme";
import Button from "antd/es/button/button";

export const ButtonWithIcon = ({svgComponent, text, onClick, iconSize = 20}) => {
    const marginBetweenTextAndIcon = "7px";

    return (
        <ButtonWithIconContainer onClick={onClick}>
            <SvgResizer size={iconSize}>{svgComponent}</SvgResizer>
            <span style={{marginLeft: marginBetweenTextAndIcon}}>{text}</span>
        </ButtonWithIconContainer>
    );
};

export const AddButton = ({onButtonClicked}) => {
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