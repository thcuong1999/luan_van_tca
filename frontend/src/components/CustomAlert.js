import React from "react";
import { Alert } from "../phanquyen/bophankd/styledComponents";

const CustomAlert = ({ title, children }) => {
  return (
    <Alert className="mt-3 mb-5 ">
      <div className="title">
        <span>{title}</span>
      </div>
      <div className="content">{children}</div>
    </Alert>
  );
};

export default CustomAlert;
