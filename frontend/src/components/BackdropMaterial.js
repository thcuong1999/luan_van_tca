import React from "react";
import styled from "styled-components";

const BackdropMaterial = () => {
  return (
    <Wrapper>
      <Ring></Ring>
      <Loading>Loading...</Loading>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  /* margin-left: 230px; */
  width: 100vw;
  height: 100%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;

  @keyframes ring {
    0% {
      transform: rotate(0deg);
      box-shadow: 1px 5px 2px #e65c00;
    }
    50% {
      transform: rotate(180deg);
      box-shadow: 1px 5px 2px #18b201;
    }
    100% {
      transform: rotate(360deg);
      box-shadow: 1px 5px 2px #0456c8;
    }
  }

  @keyframes text {
    50% {
      color: #000;
    }
  }
`;
const Ring = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  animation: ring 2s linear infinite;
  &::before {
    position: absolute;
    content: "";
    width: inherit;
    height: inherit;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
    border-radius: 50%;
  }
`;
const Loading = styled.span`
  color: #737373;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  line-height: 200px;
  animation: text 2s ease-in-out infinite;
`;

export default BackdropMaterial;
