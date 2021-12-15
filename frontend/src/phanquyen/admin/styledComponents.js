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
    font-weight: 500;
    font-family: "Roboto", sans-serif;
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
    font-size: 14px;
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
`;

export const Label = styled.span`
  font-size: 15px;
  color: #555;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  img {
    width: 18px;
    margin-right: 10px;
    opacity: 0.7;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 26px;
  font-family: "Poppins", sans-serif;
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
  font-size: 15px;
  &:focus {
    border: 1px solid blue;
  }
  &::placeholder {
    font-size: 14px;
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
  font-size: 15px;
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

export const ImageToDisplay = styled.div`
  img {
    width: 250px;
    padding-top: 16px;
    &.noImage {
      opacity: 0.15;
    }
  }
`;
