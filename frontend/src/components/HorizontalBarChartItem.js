import React from "react";

const HorizontalBarChartItem = ({ label, percent }) => {
  return (
    <div className="box">
      <div className="labels">
        <p>{label}</p>
        <p>{percent}%</p>
      </div>
      <div className="level">
        <div className="levelStatus" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

export default HorizontalBarChartItem;
