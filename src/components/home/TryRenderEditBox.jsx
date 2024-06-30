import SvgResizer from "react-svg-resizer";
import Edit from "../../assets/Edit";
import Delete from "../../assets/Delete";
import React from "react";
import styled from "styled-components";

const HoverOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(95, 36, 36, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;

    ${props => props.parentSelector}:hover & {
        opacity: 1;
    }
`;

const OverlayButton = styled.button`
    width: 60px;
    height: 60px;
    background-color: #1C1C21;
    border: none;
    padding: 5px 10px;
    margin: 0 5px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background-color: #e0e0e0;
    }
`;

export function tryRenderEditBox(homeSubMenu, isHovered, onEdit, onDelete, parentSelector = '') {
    if (homeSubMenu !== 'edit' || !isHovered) {
        return null;
    }

    const editIconSize = 40;
    const deleteIconSize = 5;

    return (
        <HoverOverlay parentSelector={parentSelector}>
            <OverlayButton onClick={onEdit}>
                <SvgResizer size={editIconSize}>
                    <Edit/>
                </SvgResizer>
            </OverlayButton>
            <OverlayButton onClick={onDelete}>
                <SvgResizer size={deleteIconSize}>
                    <Delete/>
                </SvgResizer>
            </OverlayButton>
        </HoverOverlay>
    );
}