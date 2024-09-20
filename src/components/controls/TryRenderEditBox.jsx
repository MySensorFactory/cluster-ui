import React from 'react';
import Space from "antd/es/space";
import Button from "antd/es/button";
import Edit from "../../assets/Edit";
import Delete from "../../assets/Delete";

export function tryRenderEditBox(homeSubMenu, isHovered, onEdit, onDelete) {
    if (homeSubMenu !== 'edit' || !isHovered) {
        return null;
    }

    return (
        <Space style={{position: 'absolute', top: 5, right: 5}}>
            <Button
                icon={<Edit/>}
                onClick={onEdit}
                type="primary"
                ghost
            />
            <Button
                icon={<Delete/>}
                onClick={onDelete}
                type="primary"
                danger
                ghost
            />
        </Space>
    );
}