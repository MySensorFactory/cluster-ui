import React from 'react';
import {HoverOverlay} from '../styles/CommonStyles';
import {DeleteButton, EditButton} from "../controls/Buttons";

export function tryRenderEditBox(homeSubMenu, isHovered, onEdit, onDelete, parentSelector = '') {
    if (homeSubMenu !== 'edit' || !isHovered) {
        return null;
    }

    const editIconSize = 40;
    const deleteIconSize = 5;

    return (
        <HoverOverlay parentSelector={parentSelector}>
            <EditButton onEdit={onEdit} iconSize={editIconSize}/>
            <DeleteButton onDelete={onDelete} iconSize={deleteIconSize}/>
        </HoverOverlay>
    );
}