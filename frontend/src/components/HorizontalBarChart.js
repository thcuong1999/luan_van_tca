import React from "react";
import { Chart } from "../phanquyen/bophankd/styledComponents";

const HorizontalBarChart = ({ title, children }) => {
  return (
    <Chart>
      <h4 className="title">{title}</h4>
      {children}
    </Chart>
  );
};

export default HorizontalBarChart;
