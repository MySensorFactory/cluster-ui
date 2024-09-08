import SvgResizer from "react-svg-resizer";
import Edit from "../../assets/Edit";
import Delete from "../../assets/Delete";
import React from "react";
import {ButtonWithIconContainer, AddButtonContainer} from "../styles/ButtonStyles";
import Add from "../../assets/Add";
import {OverlayButton} from "../styles/CommonStyles";

export const ButtonWithIcon = ({svgComponent, text, onClick, iconSize = 20}) => {
    const marginBetweenTextAndIcon = "7px";

    return (
        <ButtonWithIconContainer onClick={onClick}>
            <SvgResizer size={iconSize}>{svgComponent}</SvgResizer>
            <span style={{marginLeft: marginBetweenTextAndIcon}}>{text}</span>
        </ButtonWithIconContainer>
    );
};

export const EditButton = ({onEdit, iconSize}) => (
    <OverlayButton onClick={onEdit}>
        <SvgResizer size={iconSize}>
            <Edit/>
        </SvgResizer>
    </OverlayButton>
);

export const DeleteButton = ({onDelete, iconSize}) => (
    <OverlayButton onClick={onDelete}>
        <SvgResizer size={iconSize}>
            <Delete/>
        </SvgResizer>
    </OverlayButton>
);

export const AddButton = ({onButtonClicked, iconSize = 45}) => {
    return (
        <AddButtonContainer onClick={onButtonClicked}>
            <SvgResizer size={iconSize}>
                <Add/>
            </SvgResizer>
        </AddButtonContainer>
    );
};