import React, { useEffect, useState } from "react";
import {
  Container,
  Content,
  ErrMsg,
  Form,
  FormContent,
  FormGroup,
  FormTitle,
  Input,
  Label,
} from "./styledComponents";
import Header from "../../components/Header";
import InputPassword from "../../components/InputPassword";
import { apiTinhThanh } from "../../apiTinhThanh";
import apiDaily1 from "../../axios/apiDaily1";
import BackdropMaterial from "../../components/BackdropMaterial";
import { toast } from "react-toastify";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import MenuItem from "@mui/material/MenuItem";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";
import _taikhoan from "../../assets/icons/taikhoan.png";

const Daily1Chinhsua = (props) => {
  const [daily1, setDaily1] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id: daily1Id } = props.match.params;
  const [tinh, setTinh] = useState("Chọn Tỉnh/Thành Phố");
  const [huyen, setHuyen] = useState("Chọn Quận/Huyện");
  const [xa, setXa] = useState("Chọn Xã");
  const [taikhoan, setTaikhoan] = useState(false);
  const [matkhau, setMatkhau] = useState("");
  const [xnMatkhau, setXnMatkhau] = useState("");
  const [pwdNotMatch, setPwdNotMatch] = useState(false);

  const dsTinh = apiTinhThanh.map((item) => item.name);
  const dsHuyen = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.map((item) => item.name);
  const dsXa = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.find((item) => item.name === huyen)
    ?.wards.map((item) => item.name);

  const handleSubmit = async () => {
    if (matkhau !== xnMatkhau) {
      return setPwdNotMatch(true);
    }
    const dl = {
      ten: daily1.ten,
      sdt: daily1.sdt,
      email: daily1.email,
      diachi: `${xa}, ${huyen}, ${tinh}`,
      taikhoan: taikhoan,
      matkhau: matkhau,
    };
    // console.log(dl);
    const { success } = await apiDaily1.suaDaily1(daily1Id, dl);
    if (success) {
      toast.success("Cập nhật thành công!", { theme: "colored" });
      props.history.push("/giamsatvung/daily1");
    }
  };

  const fetchDaily1 = async () => {
    setLoading(true);
    const { daily1 } = await apiDaily1.singleDaily1(daily1Id);
    setXa(daily1.xa);
    setHuyen(daily1.huyen);
    setTinh(daily1.tinh);
    setTaikhoan(daily1.taikhoan);
    setDaily1(daily1);
    setLoading(false);
  };

  useEffect(() => {
    fetchDaily1();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách đại lý 1"
          titleBack
          onClick={() => props.history.push("/giamsatvung/daily1")}
          headerRight={
            <button className="btn btn-primary px-3" onClick={handleSubmit}>
              <span>Lưu</span>
              <i class="fas fa-save"></i>
            </button>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>
                <span>Cập nhật đại lý</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={ten} alt="ten" />
                  <span>Tên đại lý:</span>
                </Label>
                <Input
                  placeholder="Nhập tên đại lý"
                  type="text"
                  name="ten"
                  value={daily1?.ten}
                  onChange={(e) =>
                    setDaily1({
                      ...daily1,
                      ten: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={sdt} alt="sdt" />
                  <span>Số điện thoại:</span>
                </Label>
                <Input
                  placeholder="Nhập số điện thoại"
                  type="text"
                  name="sdt"
                  value={daily1?.sdt}
                  onChange={(e) =>
                    setDaily1({
                      ...daily1,
                      sdt: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={email} alt="email" />
                  <span>E-mail:</span>
                </Label>
                <Input
                  placeholder="Nhập email"
                  type="text"
                  name="email"
                  value={daily1?.email}
                  onChange={(e) =>
                    setDaily1({
                      ...daily1,
                      email: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={diachi} alt="diachi" />
                  <span>Địa chỉ:</span>
                </Label>
                <div className="row">
                  <div className="col-lg-4">
                    {dsTinh && dsTinh.length ? (
                      <DropdownMaterial2
                        label="Chọn Tỉnh/Thành Phố"
                        value={tinh}
                        onChange={(e) => {
                          setTinh(e.target.value);
                          setHuyen(null);
                          setXa(null);
                        }}
                      >
                        {dsTinh.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </DropdownMaterial2>
                    ) : (
                      <DropdownMaterial2 label="Chọn Tỉnh/Thành Phố" />
                    )}
                  </div>

                  <div className="col-lg-4">
                    {dsHuyen && dsHuyen.length ? (
                      <DropdownMaterial2
                        label="Chọn Quận/Huyện"
                        value={huyen}
                        onChange={(e) => {
                          setHuyen(e.target.value);
                          setXa(null);
                        }}
                      >
                        {dsHuyen.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </DropdownMaterial2>
                    ) : (
                      <DropdownMaterial2 label="Chọn Quận/Huyện" />
                    )}
                  </div>

                  <div className="col-lg-4">
                    {dsXa && dsXa.length ? (
                      <DropdownMaterial2
                        label="Chọn Phường/Xã"
                        value={xa}
                        onChange={(e) => {
                          setXa(e.target.value);
                        }}
                      >
                        {dsXa.map((item) => (
                          <MenuItem value={item}>{item}</MenuItem>
                        ))}
                      </DropdownMaterial2>
                    ) : (
                      <DropdownMaterial2 label="Chọn Phường/Xã" />
                    )}
                  </div>
                </div>
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={_taikhoan} alt="taikhoan" />
                  <span>Tên tài khoản:</span>
                </Label>
                <Input type="text" value={taikhoan} disabled />
              </FormGroup>

              {daily1?.active && (
                <div className="row">
                  <div className="col-lg-6">
                    <FormGroup>
                      <Label>Mật khẩu:</Label>
                      <InputPassword
                        label="Mật khẩu"
                        value={matkhau}
                        onChange={(e) => setMatkhau(e.target.value)}
                        style={{ width: 362 }}
                      />
                    </FormGroup>
                  </div>

                  <div className="col-lg-6">
                    <FormGroup>
                      <Label>Xác nhận mật khẩu:</Label>
                      <InputPassword
                        label="Xác nhận"
                        value={xnMatkhau}
                        onChange={(e) => {
                          setXnMatkhau(e.target.value);
                          setPwdNotMatch(false);
                        }}
                        style={{ width: 362 }}
                      />
                      {pwdNotMatch && (
                        <ErrMsg>Xác nhận mật khẩu không chính xác</ErrMsg>
                      )}
                    </FormGroup>
                  </div>
                </div>
              )}
            </FormContent>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Daily1Chinhsua;
