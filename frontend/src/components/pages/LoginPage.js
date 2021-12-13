import React, { useEffect, useState } from "react";
import { login } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";
import styled from "styled-components";
import bgImage from "../../assets/images/bg.png";

const LoginPage = (props) => {
  const [taikhoan, setTaikhoan] = useState("");
  const [matkhau, setMatKhau] = useState("");
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(taikhoan, matkhau));
  };

  useEffect(() => {
    if (user.userInfo) {
      props.history.push(`/${user.userInfo.vaitro}`);
    }
  }, [props.history, user.userInfo]);

  return (
    <>
      <Container>
        <Wrapper>
          <Form onSubmit={handleSubmit}>
            <FormWrapper>
              <Logo>
                <img src={logo} alt="Logo" />
                <div>Đăng nhập</div>
              </Logo>

              {user.message && <ErrorMsg>{user.message}</ErrorMsg>}
              <Inputs>
                <InputWrapper>
                  <i class="fas fa-user"></i>
                  <input
                    className="input"
                    type="text"
                    placeholder="Tài khoản"
                    onChange={(e) => setTaikhoan(e.target.value)}
                  />
                </InputWrapper>

                <InputWrapper>
                  <i class="fas fa-lock"></i>
                  <input
                    className="input"
                    type="password"
                    placeholder="Mật khẩu"
                    onChange={(e) => setMatKhau(e.target.value)}
                  />
                </InputWrapper>
              </Inputs>

              <Button>Đăng nhập</Button>
            </FormWrapper>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  background-color: #2148c0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
const Wrapper = styled.div`
  background-image: url(${bgImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  background: #526ed0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
`;
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 76px 73px;
`;
const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    color: #fff;
    font-size: 36px;
    font-family: "Poppins", sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 7px;
    letter-spacing: 2px;
  }
`;
const Inputs = styled.div`
  margin-top: 53px;
  margin-bottom: 66px;
`;
const InputWrapper = styled.div`
  display: flex;
  border: 2px solid #5baaec;
  width: 380px;
  border-radius: 4px;
  i {
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #fff;
    border-right: 2px solid #5baaec;
  }
  &:first-child {
    margin-bottom: 34px;
  }
  .input {
    padding: 17px;
    background: #395bc8;
    border: none;
    outline: none;
    flex: 1;
    color: #fff;
    font-size: 17px;
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
      font-size: 18x;
      text-transform: uppercase;
      font-family: "Poppins", sans-serif;
    }
  }
`;
const Button = styled.button`
  padding: 17px;
  font-size: 22px;
  font-weight: 600;
  text-transform: uppercase;
  color: #fff;
  background: linear-gradient(90deg, #1488cc 0%, #2b32b2 100%);
  border: 2px solid #00c4ad;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  &:hover {
    background: linear-gradient(90deg, #314755 0%, #26a0da 100%);
  }
  &:focus {
    outline: none;
  }
`;
const ErrorMsg = styled.div`
  text-align: center;
  color: yellow;
  position: relative;
  bottom: -40px;
`;

export default LoginPage;
