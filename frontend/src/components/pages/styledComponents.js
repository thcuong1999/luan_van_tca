import styled from "styled-components";

export const Container = styled.div`
  padding: 36px 0;
  background: rgba(0, 0, 0, 0.05);
  height: 100vh;
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const Wrapper = styled.div`
  width: 1000px;
  margin: auto;
  background: #fff;
  padding: 58px 72px;
  border-radius: 2px;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

export const Title = styled.h1`
  margin: 0;
  color: #000;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 30px;
  color: #555;
`;

export const Menus = styled.div`
  margin-top: 34px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const MenusItem = styled.div`
  font-size: 16px;
  color: #ea5388;
  padding-bottom: 15px;
  display: inline-block;
  position: relative;
  font-family: sans-serif;
  font-weight: 600;
  &::after {
    content: "";
    position: absolute;
    height: 5px;
    width: 100%;
    bottom: 0;
    left: 0;
    background: #ea5388;
    border-radius: 10px;
    box-shadow: 0 1px 5px 5px rgba(234, 83, 136, 0.1);
  }
`;

export const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-top: 36px;
  margin-bottom: 12px;
  box-shadow: 0 7px 30px 12px rgba(0, 0, 0, 0.075);
  position: relative;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: contain;
  }
  input {
    display: none;
  }
`;

export const EditAvatar = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #333;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  cursor: pointer;
  i {
    color: #fff;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FlexCollumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputBox = styled.div`
  padding: 12px 24px;
  width: 410px;
  border: 1px solid rgba(0, 0, 0, 0.13);
  background: #fff;
  border-radius: 3px;
  margin-top: 30px;
`;

export const Label = styled.label`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.55);
  margin: 0;
  display: block;
  font-family: "Poppins", sans-serif;
`;

export const Input = styled.input`
  font-size: 17px;
  font-weight: 500;
  display: block;
  margin: 0;
  font-family: "Roboto", sans-serif;
  color: #555;
  border: none;
  outline: none;
  width: 100%;
`;

export const Select = styled.select`
  font-size: 17px;
  font-weight: 500;
  display: block;
  margin: 0;
  font-family: "Roboto", sans-serif;
  color: #555;
  border: none;
  outline: none;
  width: 100%;
  background: #fff;
  cursor: pointer;
  position: relative;
  left: -4px;
`;

export const TaikhoanText = styled.div`
  font-size: 17px;
  font-weight: 500;
  display: block;
  margin: 0;
  font-family: "Roboto", sans-serif;
  color: #555;
  border: none;
  outline: none;
  width: 100%;
`;

export const Section = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  padding: 0 72px;
  transition: 0.5s;
  &.canhanActive {
    left: 0;
  }
  &.taikhoanDeactive {
    left: 100%;
  }
  &.canhanDeactive {
    left: -100%;
  }
  &.taikhoanActive {
    left: 0;
  }
`;

export const Button = styled.button`
  background: #ea5388;
  padding: 17px 72px;
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  letter-spacing: 1px;
  box-shadow: 0 7px 30px 12px rgba(234, 83, 136, 0.25);
  transition: 0.3s;
  &:hover {
    box-shadow: none;
  }
  &:active,
  &:focus {
    outline: 0;
    border: none;
    -moz-outline-style: none;
  }
`;

export const ButtonBox = styled.div`
  width: 220px;
  box-shadow: 0 0 20px 9px #ff61241f;
  border-radius: 30px;
  position: relative;
`;

export const ToggleBtn = styled.button`
  width: 110px;
  padding: 10px 0;
  cursor: pointer;
  background: transparent;
  border: 0;
  outline: none;
  position: relative;
  display: inline-block;
  &:active,
  &:focus {
    outline: 0;
    border: none;
    -moz-outline-style: none;
  }
`;

export const Btn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 110px;
  height: 100%;
  background: linear-gradient(to right, #ea5388, #ffd0e0);
  border-radius: 30px;
  transition: left 500ms cubic-bezier(0.22, 0.68, 0, 1.71);
  &.canhan {
    left: 0;
  }
  &.taikhoan {
    left: 110px;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  bottom: 86px;
  width: 100%;
  left: 0;
  padding: 0 72px;
`;
