import React from "react";
import styled from "styled-components";

const LogoutButton = ({ children, onClick }) => {
  return <CutomBtn onClick={onClick}>{children}</CutomBtn>;
};

const CutomBtn = styled.button`
  background-color: red;
  width: 80%;
  margin: 20px 16px 0 16px;
  border: 1px solid #2e96e0;
  background: transparent;
  color: #cad6e2;
  font-family: "Poppins", sans-serif;
  padding: 6px;
  border-radius: 3px;
  outline: none;
  &:hover {
    color: #fff;
    background: #2e96e0;
  }
  &:focus {
    outline: none;
  }
`;

export default LogoutButton;
