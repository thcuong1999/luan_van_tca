import React from "react";
import styled from "styled-components";

const TableButton = ({ children, onClick }) => {
  return <CustomBtn onClick={onClick}>{children}</CustomBtn>;
};

const CustomBtn = styled.button`
  padding: 3px 26px;
  background: transparent;
  color: #1cb0f6;
  border: none;
  min-width: 120px;
  border: 2px solid #1cb0f6;
  border-radius: 5px;
  outline: none;
  margin-right: 16px;
  &:hover {
    background: #1cb0f6;
    color: #fff;
  }
  &:focus {
    outline: none;
  }
`;

export default TableButton;
