import styled from 'styled-components';
import {theme} from './theme';

export const Button = styled.button`
    background-color: ${props => props.background || theme.colors.primary};
    color: ${theme.colors.text};
    border: none;
    border-radius: ${theme.sizes.borderRadius};
    cursor: pointer;
    font-size: ${theme.fonts.sizes.medium};
    font-weight: bold;
    font-family: Inter, monospace;
    transition: background-color 0.3s ease;
    padding: 10px 20px;

    &:hover {
        background-color: ${props => props.hoverBackground || theme.colors.primaryHover};
    }
`;
