import styled from 'styled-components';
import {theme} from './theme';

export const Container = styled.div`
    background-color: ${props => props.background || theme.colors.background};
    color: ${theme.colors.text};
    border-radius: ${theme.sizes.borderRadius};
    padding: ${props => props.padding || theme.sizes.padding.medium};
    margin-bottom: ${props => props.marginBottom || '10px'};
    position: ${props => props.position || 'static'};
    overflow: ${props => props.overflow || 'visible'};
    font-family: Inter, monospace;
    transition: filter 0.3s ease;
    filter: ${props => props.isBlurEnabled ? 'blur(5px)' : 'none'}
    min-height: ${props => props.isInfinitelyHigh ? '100vh' : 'auto'};
`;

export const FlexContainer = styled(Container)`
    display: flex;
    flex-direction: ${props => props.direction || 'row'};
    justify-content: ${props => props.justify || 'flex-start'};
    align-items: ${props => props.align || 'stretch'};
    flex-wrap: ${props => props.wrap || 'nowrap'};
    gap: ${props => props.gap || '5px'};
`;

export const PopupContainer = styled(FlexContainer)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    width: 300px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
    color: ${theme.colors.text};
    font-size: ${theme.fonts.sizes.large};
    margin-bottom: ${theme.sizes.padding.medium};
    font-family: Inter, monospace;
`;

export const Text = styled.div`
    font-size: ${props => props.size || theme.fonts.sizes.small};
    color: ${props => props.color || theme.colors.text};
    font-family: Inter, monospace;
`;

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

export const OverlayButton = styled(Button)`
    width: 60px;
    height: 60px;
    padding: 5px 10px;
    margin: 0 5px;
    background-color: ${theme.colors.background};

    &:hover {
        background-color: ${theme.colors.secondary};
    }
`;

export const Overlay = styled.div`
    position: ${props => props.position || 'fixed'};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

export const HoverOverlay = styled(Overlay)`
    position: absolute;
    background-color: ${props => props.hoverColor || theme.colors.hoverNegative};
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    font-family: Inter, monospace;
    transition: opacity 0.3s ease;

    ${props => props.parentSelector}:hover & {
        opacity: 1;
    }
`;

export const GridFlexItemWrapper = styled.div`
    flex: 0 0 calc(20.0% - 20px);

    &.wide {
        flex: 0 0 calc(40.00% - 20px);
    }
`;

const InputStyle = `
    width: 100%;
    padding: ${theme.sizes.padding.small};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.sizes.borderRadius};
    font-size: ${theme.fonts.sizes.small};
    box-sizing: border-box;
    font-family: Inter, monospace;

    &:focus {
        outline: none;
        border-color: ${theme.colors.primary};
    }
`

export const Input = styled.input`
    ${InputStyle}
`;

export const ScrollContainer = styled.div`
    max-height: 300px;
    overflow-y: auto;
    padding-right: 10px;
    font-family: Inter, monospace;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: ${theme.colors.background};
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${theme.colors.secondary};
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: ${theme.colors.primaryHover};
    }

    scrollbar-width: thin;
    scrollbar-color: ${theme.colors.secondary} ${theme.colors.background};
`;

export const StyledCheckbox = styled.input`
    ${InputStyle};
    
    width: auto;
    margin-right: 5px;
    accent-color: ${theme.colors.secondary};
`;

