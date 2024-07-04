import styled from 'styled-components';
import SvgResizer from 'react-svg-resizer';

export const ButtonWithIconContainer = styled.button`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: transparent;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 10px;
    font-family: Inter, monospace;
    font-size: 12px;

    &:hover {
        background-color: #3D404A;
    }

`;

export const ButtonWithIcon = ({ svgComponent, text, onClick }) => {
    const iconSize = 20;
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