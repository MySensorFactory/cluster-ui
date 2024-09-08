import styled from "styled-components";
import {theme} from "./theme";

export const ChartWrapper = styled.div`
    margin-bottom: 30px;
    position: relative;
    border-radius: ${theme.sizes.borderRadius};
    overflow: hidden;
`;

export const ChartTitle = styled.h3`
    color: white;
    margin-bottom: 10px;
    font-size: 18px;
`;