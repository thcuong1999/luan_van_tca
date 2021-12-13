import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import InputPassword from "../../components/InputPassword";
import { apiTinhThanh } from "../../apiTinhThanh";
import { toast } from "react-toastify";
import apiBophankd from "../../axios/apiBophankd";
import BackdropMaterial from "../../components/BackdropMaterial";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import MenuItem from "@mui/material/MenuItem";
import capnhat from "../../assets/icons/capnhat.png";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";
import taikhoan from "../../assets/icons/taikhoan.png";
import mk from "../../assets/icons/matkhau.png";
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

const BophankdChinhsua = (props) => {
  const [bophankd, setBophankd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tinh, setTinh] = useState(null);
  const [huyen, setHuyen] = useState(null);
  const [xa, setXa] = useState(null);
  const [matkhau, setMatkhau] = useState("");
  const [xnMatkhau, setXnMatkhau] = useState("");
  const [pwdNotMatch, setPwdNotMatch] = useState(false);
  const { id: bophankdId } = props.match.params;

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
      ten: bophankd.ten,
      sdt: bophankd.sdt,
      email: bophankd.email,
      xa,
      huyen,
      tinh,
      matkhau,
    };
    const { success } = await apiBophankd.suaBophankd(bophankdId, dl);
    if (success) {
      toast.success("Cập nhật thành công!", { theme: "colored" });
      props.history.push("/admin/bophankd");
    }
  };

  const fetchBophankd = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.singleBophankd(bophankdId);
    setXa(bophankd.xa);
    setHuyen(bophankd.huyen);
    setTinh(bophankd.tinh);
    setBophankd(bophankd);
    setLoading(false);
  };

  useEffect(() => {
    fetchBophankd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách bộ phận kinh doanh"
          titleBack
          onClick={() => props.history.push("/admin/bophankd")}
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
                <span>Cập nhật bộ phận kinh doanh</span>
              </FormTitle>
              <FormGroup>
                <Label>
                  <img src={ten} alt="ten" width="36" className="mr-2" />
                  <span>Tên bộ phận kinh doanh:</span>
                </Label>
                <Input
                  placeholder="Nhập tên"
                  type="text"
                  name="ten"
                  value={bophankd?.ten}
                  onChange={(e) =>
                    setBophankd({
                      ...bophankd,
                      ten: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={sdt} alt="sdt" width="36" className="mr-2" />
                  <span>Số điện thoại:</span>
                </Label>
                <Input
                  placeholder="Nhập số điện thoại"
                  type="text"
                  name="sdt"
                  value={bophankd?.sdt}
                  onChange={(e) =>
                    setBophankd({
                      ...bophankd,
                      sdt: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={email} alt="email" width="36" className="mr-2" />
                  <span>E-mail:</span>
                </Label>
                <Input
                  placeholder="Nhập email"
                  type="text"
                  name="email"
                  value={bophankd?.email}
                  onChange={(e) =>
                    setBophankd({
                      ...bophankd,
                      email: e.target.value,
                    })
                  }
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={diachi} alt="diachi" width="36" className="mr-2" />
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
                  <img
                    src={taikhoan}
                    alt="taikhoan"
                    width="36"
                    className="mr-2"
                  />
                  <span>Tên tài khoản:</span>
                </Label>
                <Input type="text" value={bophankd?.user?.taikhoan} disabled />
              </FormGroup>

              <div className="row">
                <div className="col-lg-6">
                  <FormGroup>
                    <Label>
                      <img src={mk} alt="mk" width="36" className="mr-2" />
                      <span>Mật khẩu:</span>
                    </Label>
                    <InputPassword
                      label="Mật khẩu"
                      name="matkhau"
                      value={matkhau}
                      onChange={(e) => setMatkhau(e.target.value)}
                      style={{ width: 362 }}
                    />
                  </FormGroup>
                </div>

                <div className="col-lg-6">
                  <FormGroup>
                    <Label>
                      <img src={mk} alt="mk" width="36" className="mr-2" />
                      <span>Xác nhận mật khẩu:</span>
                    </Label>
                    <InputPassword
                      label="Xác nhận"
                      name="xnmatkhau"
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
            </FormContent>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default BophankdChinhsua;
