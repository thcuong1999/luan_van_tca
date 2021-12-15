import styled from "styled-components";

export const Container = styled.div`
  padding: 36px 0;
  background: rgba(0, 0, 0, 0.05);
  height: 100vh;
`;

export const Wrapper = styled.div`
  width: 1000px;
  margin: auto;
  background: #fff;
  padding: 58px 72px;
  border-radius: 2px;
  height: 100%;
`;

export const Title = styled.h1`
  margin: 0;
  color: #000;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 30px;
  color: #444;
`;

export const Menus = styled.div`
  margin-top: 34px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const MenuItem = styled.div`
  font-size: 16px;
  color: #ea5388;
  padding-bottom: 15px;
  display: inline-block;
  position: relative;
  font-family: "Montserrat", sans-serif;
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
  box-shadow: 0 7px 30px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  img {
    max-width: 100%;
    max-height: 100%;
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

export const InputBox = styled.div`
  padding: 12px 24px;
  width: 48%;
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
  color: #333;
  border: none;
  outline: none;
  width: 100%;
`;

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Button = styled.button`
  margin-top: 50px;
  background: #ea5388;
  padding: 17px 72px;
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  letter-spacing: 1px;
  box-shadow: 0 7px 30px 12px rgba(234, 83, 136, 0.25);

  &:hover {
    box-shadow: none;
  }
`;
