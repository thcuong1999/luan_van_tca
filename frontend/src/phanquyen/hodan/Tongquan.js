import React from "react";
import styled from "styled-components";
import ChartDemo from "../../components/ChartDemo";
import Header from "../../components/Header";

const TongQuan = () => {
  return (
    <Wrapper>
      <Header title="Tổng quan" />
      <Content>
        <ChartDemo />
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 26px 36px;
`;

export default TongQuan;
