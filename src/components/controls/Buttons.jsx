import styled from 'styled-components';
import SvgResizer from 'react-svg-resizer';
import Edit from "../../assets/Edit";
import Delete from "../../assets/Delete";
import React from "react";
import {Button, FlexContainer, OverlayButton} from "../styles/CommonStyles";
import Add from "../../assets/Add";
import {theme} from "../styles/theme";

export const ButtonWithIconContainer = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: transparent;
    font-size: 12px;

    &:hover {
        background-color: ${theme.colors.secondaryHover};
    }

`;

const AddButtonContainer = styled(FlexContainer)`
    align-items: center;
    justify-content: center;
    background: ${theme.colors.primary};
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: ${props => props.hoverBackground || theme.colors.primaryHover};
        cursor: pointer;
    }
`;

export const ButtonWithIcon = ({ svgComponent, text, onClick, iconSize = 20 }) => {
    const marginBetweenTextAndIcon = '7px';

    return (
        <ButtonWithIconContainer onClick={onClick}>
            <SvgResizer size={iconSize}>
                {svgComponent}
            </SvgResizer>
            <span style={{
                marginLeft: marginBetweenTextAndIcon
            }}>
                {text}
            </span>
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
export const AddButton = ({onButtonClicked}) => {
    return (
        <AddButtonContainer onClick={onButtonClicked}>
            <SvgResizer size={45}>
                <Add/>
            </SvgResizer>
        </AddButtonContainer>
    );
};
