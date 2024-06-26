import React from 'react';
import styled from 'styled-components';

const TemperatureChartContainer = styled.div`
  margin-bottom: 20px;
`;

const Chart = styled.div`
  background: #2a2a36;
  padding: 20px;
  border-radius: 5px;
`;

const TemperatureChart = () => {
    return (
        <TemperatureChartContainer>
            <h2>Temperature before compressor</h2>
            <Chart>
                {/* Replace with actual chart component */}
                <div>Today</div>
                <div>Chart goes here</div>
            </Chart>
        </TemperatureChartContainer>
    );
};

export default TemperatureChart;
