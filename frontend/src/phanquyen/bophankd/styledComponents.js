import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 36px;
  .MuiButtonBase-root {
    outline: none;
  }
`;

export const BtnRight = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.18);
  i {
    font-size: 22px;
    margin-left: 8px;
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    margin-left: 6px;
    font-size: 20px;
  }
`;

export const FilterSection = styled.div`
  background: #fff;
  button {
    font-size: 15px;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
  }
`;

export const Title = styled.div`
  margin: 0;
  padding: 14px 17px;
  font-size: 15px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  color: #1e93e8;
  display: inline-block;
  border-bottom: 2px solid #1e93e8;
`;

export const TitleWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    margin-right: 10px;
  }
`;

export const Filter = styled.div`
  background: #fff;
  padding: 14px 17px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const SearchBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.15);
  width: 50%;
  border-radius: 4px;
  display: flex;
  overflow: hidden;
  i {
    display: inline-block;
    padding: 10px;
    color: rgba(0, 0, 0, 0.35);
  }
  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0 10px;
    color: #182537;
    font-size: 16px;
    font-family: "Poppins", sans-serif;
    &::placeholder {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.35);
      font-family: "Poppins", sans-serif;
    }
  }
`;

export const TableSection = styled.div`
  th,
  td {
    font-family: "Poppins", sans-serif;
  }
  &.noCheckbox {
    th:first-child,
    td:first-child {
      display: none;
    }
  }
`;

export const ErrMsg = styled.div`
  font-size: 13px;
  color: red;
  margin-top: 4px;
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 13px 16px;
  outline: none;
  color: #333;
  border-radius: 3px;
  font-size: 15px;
  &:focus {
    border: 1px solid blue;
  }
  &::placeholder {
    font-size: 14px;
  }
`;

export const Label = styled.span`
  font-size: 15px;
  color: #555;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  img {
    width: 18px;
    margin-right: 14px;
    opacity: 0.7;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 26px;
  font-family: "Poppins", sans-serif;
  &.dh {
    margin-bottom: 16px;
    img {
      width: 18px;
      margin-right: 8px;
      opacity: 0.6;
    }
    span {
      font-family: "Montserrat", sans-serif;
    }
    span:last-child {
      font-weight: 500;
      margin-left: 16px;
    }
  }
`;

export const FormTitle = styled.div`
  font-size: 19px;
  font-weight: 500;
  text-align: center;
  color: blue;
  margin-bottom: 36px;
  margin-top: 20px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  img {
    width: 18px;
  }
`;

export const FormContent = styled.div`
  width: 750px;
  margin: auto;
`;

export const Form = styled.div`
  background: #fff;
  padding: 36px 20px 100px 36px;
  border-radius: 3px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 13px 16px;
  outline: none;
  color: #333;
  border-radius: 3px;
  &:focus {
    border: 1px solid blue;
  }
`;
export const CrossButton = styled.button`
  border: none;
  margin-left: 10px;
  background: #fff;
  outline: none;
  i {
    font-size: 26px;
    color: rgba(0, 0, 0, 0.3);
  }
  &:active {
    outline: none;
  }
`;
export const PlusButton = styled.button`
  margin-left: 20px;
  background: #fff;
  border: none;
  outline: none;
  i {
    font-size: 13px;
    color: #0088ff;
    width: 25px;
    height: 25px;
    line-height: 20px;
    border: 3px solid #0088ff;
    text-align: center;
    border-radius: 50%;
  }
  span {
    color: #0088ff;
    margin-left: 8px;
  }
  &:active {
    outline: none;
  }
`;

export const TableTitle = styled.div`
  font-size: 14px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  img {
    width: 18px;
    margin-right: 8px;
    opacity: 0.6;
  }
`;

export const Total = styled.span`
  font-size: 14px;
  margin-right: 10px;
  font-weight: 400;
  font-family: "Montserrat", sans-serif;
`;

export const TotalValue = styled.span`
  font-size: 15px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
`;

export const FilterWrapper = styled.div`
  padding-top: 16px;
  padding-bottom: 14px;
  padding-left: 17px;
  padding-right: 17px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const BoxInfoTitle = styled.span`
  display: block;
  margin-bottom: 10px;
  color: blue;
  font-weight: 500;
`;

export const BoxInfo = styled.div`
  width: 380px;
  padding: 26px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
  display: inline-block;
  text-align: left;
  margin-bottom: 36px;
  span {
    font-size: 15px;
    margin-right: 10px;
    font-family: "Roboto", sans-serif;
  }
  img {
    width: 14px;
    margin-right: 8px;
    opacity: 0.6;
  }
  td {
    padding-bottom: 6px;
    min-width: 100px;
    vertical-align: top;
    font-size: 14px;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    span {
      font-size: 14px;
      font-family: "Roboto", sans-serif;
      font-weight: 300;
    }
  }
`;

export const TiendoProcessText = styled.div`
  display: inline-block;
  font-size: 15px;
  color: #555;
  cursor: pointer;
  color: #1c7ed6;
  &:hover {
    color: #11548f;
  }
  span {
    margin-right: 8px;
    margin-left: 8px;
    font-family: "Roboto", sans-serif;
  }
`;

export const TiendoProcess = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const InputSoluong = styled.input`
  text-align: center;
  width: 70px;
  outline: none;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 255, 0.25);
  &:focus {
    outline: none;
    border: 1px solid rgba(0, 0, 255, 0.5);
  }
`;

export const Alert = styled.div`
  display: block;
  border-radius: 4px;
  text-align: left;
  background: transparent;
  font-family: "poppins", sans-serif;
  font-size: 15px;
  margin: 16px 0 48px 0;
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    margin-top: -30px;
  }
  .title > span {
    color: rgb(95, 33, 32);
  }
  .content > p {
    margin: 0;
    color: #555;
    font-size: 14px;
    font-family: "montserrat", sans-serif;
    padding: 2px 0;
    span {
      color: #111;
      font-weight: 500;
      margin-left: 10px;
    }
  }
`;

export const MaDonhang = styled.div`
  margin-bottom: 10px;
  span:nth-child(1) {
    color: #333;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    margin-right: 10px;
    font-size: 14px;
  }
  span:nth-child(2) {
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
  }
`;

export const Chart = styled.div`
  background: #2255a4;
  width: 45%;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  margin-bottom: 36px;
  border-radius: 4px;
  .title {
    color: #fff;
    margin: 0;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-size: 17px;
    font-family: "Roboto", sans-serif;
    margin-bottom: 16px;
    font-weight: bold;
  }
  .box {
    box-sizing: border-box;
    width: 100%;
    margin: 18px 0;
    .labels {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        margin: 0;
        color: #fff;
        margin: 0 0 4px;
        font-weight: 500;
        font-family: "Montserrat", sans-serif;
        font-size: 15px;
      }
    }
    .level {
      border: 2px solid #75b5fa;
      padding: 4px;
      border-radius: 3px;
      .levelStatus {
        height: 20px;
        background: #75b5fa;
        border-radius: 2px;
      }
    }
  }
`;

//==========================

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const DetailsContent = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 26px 36px;
  font-family: "Poppins", sans-serif;
`;

export const DetailsBoxes = styled.div`
  display: flex;
  justify-content: space-between;
  &.spaceEvenly {
    justify-content: space-evenly;
  }
`;

export const DetailsBoxTitle = styled.div`
  font-size: 15px;
  color: #fff;
  margin-top: 10px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
`;

export const DetailsSubComponents = styled.div`
  display: block;
  margin-top: 36px;
  th:first-child,
  td:first-child {
    display: none;
  }
  .MuiButtonBase-root {
    outline: none;
  }
`;

export const DetailsInfo = styled.div`
  background: #fff;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 3px;
  margin-top: 48px;
`;

export const DetailsInfoTitle = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  padding: 20px;
  img {
    width: 18px;
    margin-right: 8px;
    opacity: 0.7;
  }
  h5 {
    font-size: 16px;
    display: inline-block;
    margin-bottom: 0;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    padding-left: 9px;
    color: blue;
  }
`;

export const DetailsInfoContent = styled.div`
  padding: 28px;
  .MuiPaper-root {
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
`;

export const DetailsInfoTexts = styled.div`
  img {
    width: 18px;
    margin-right: 8px;
    opacity: 0.5;
  }
  td {
    padding-bottom: 7px;
    font-size: 15px;
    font-family: "Poppins", sans-serif;
    color: #555;
    span {
      font-family: "Roboto", sans-serif;
      margin-right: 16px;
      color: #222;
    }
  }
`;

export const TiendoDonhang = styled.div`
  margin-bottom: 58px;
  table {
    border: 1px solid #fff;
  }
  td,
  th {
    height: 52px;
    text-align: center;
  }

  th {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    color: #666;
    background: #2255a4;
    color: #fff;
    border: 1px solid #fff;
  }

  td {
    font-family: "Montserrat", sans-serif;
    font-size: 19px;
    font-weight: 500;
    border: 1px solid #fff;
    cursor: pointer;
    &.success {
      background: #28a745;
      color: #fff;
      &:hover {
        background: #27851a;
      }
    }
    &.danger {
      background: #dc3545;
      color: #fff;
      &:hover {
        background: #bc3823;
      }
    }
    &.warning {
      background: #ffc107;
      color: #343a40;
      &:hover {
        background: #e7ae06;
        color: #fff;
      }
    }
  }
`;

export const ThongkeContainer = styled.div`
  margin: 36px 0;
  background: #fff;
  padding: 36px;
`;

export const ThongkeTitle = styled.div`
  font-size: 19px;
  font-family: "Roboto", sans-serif;
  color: #1e93e8;
  display: inline-block;
  margin-bottom: 26px;
  padding-bottom: 3px;
  border-bottom: 1px solid #1e93e8;
  font-weight: 500;
`;

export const DanhsachTieuchi = styled.div`
  padding-left: 26px;
  padding-bottom: 26px;
`;

export const TieuChi = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  img {
    width: 24px;
    opacity: 0.6;
    margin-right: 10px;
  }
  span {
    margin-right: 16px;
    color: #444;confi
    font-size: 15px;
    font-family: "Poppins", sans-serif;
  }
  input[type="date"] {
    height: 38px;
    padding: 0 10px;
    margin-right: 16px;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    color: #444;
    &:focus,
    &:active {
      outline: none;
    }
  }
`;

export const TieuchiBtn = styled.button`
  width: 110px;
  outline: none;
  border-radius: 2px;
  background: transparent;
  padding: 6px 0;
  font-size: 15px;
  font-family: "Poppins", sans-serif;
  &:focus {
    outline: none;
  }
  &.thang {
    border: 1px solid #007bff;
    color: #007bff;
    &:hover {
      color: #fff;
      background: #007bff;
    }
    &.active {
      background: #007bff;
      color: #fff;
    }
  }
  &.nam {
    border: 1px solid #17a2b8;
    color: #17a2b8;
    &:hover {
      color: #fff;
      background: #17a2b8;
    }
    &.active {
      background: #17a2b8;
      color: #fff;
    }
  }
  &.range {
    border: 1px solid #28a745;
    color: #28a745;
    &:hover {
      color: #fff;
      background: #28a745;
    }
    &.active {
      background: #28a745;
      color: #fff;
    }
  }
`;

export const ThongkeValues = styled.div`
  padding: 26px 0 26px 26px;
  img {
    width: 14px;
    margin-right: 8px;
  }
  td {
    padding-right: 20px;
    padding-bottom: 10px;
    &:nth-child(1) {
      font-family: "Poppins", sans-serif;
      font-size: 15px;
    }
    &:nth-child(2) {
      font-family: "Montserrat", sans-serif;
      font-size: 15px;
    }
  }
`;
