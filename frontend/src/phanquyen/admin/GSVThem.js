import React, { useState } from "react";
import Header from "../../components/Header";
import { apiTinhThanh } from "../../apiTinhThanh";
import { toast } from "react-toastify";
import apiGSV from "../../axios/apiGSV";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import MenuItem from "@mui/material/MenuItem";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";
import taikhoan from "../../assets/icons/taikhoan.png";
import them from "../../assets/icons/them.png";
import cmnd from "../../assets/icons/cmnd.png";
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

const GSVThem = (props) => {
  const [gsv, setGsv] = useState({
    ten: "",
    taikhoan: "",
    sdt: "",
    cmnd: "",
    email: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [tinh, setTinh] = useState(null);
  const [huyen, sethuyen] = useState(null);
  const [xa, setXa] = useState(null);

  const dsTinh = apiTinhThanh.map((item) => item.name);
  const dsHuyen = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.map((item) => item.name);
  const dsXa = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.find((item) => item.name === huyen)
    ?.wards.map((item) => item.name);

  const handleChangeGsv = (e) => {
    setGsv({
      ...gsv,
      [e.target.name]: e.target.value,
    });
  };

  const emptyFields = () => {
    // thong tin ko dc de trong
    if (
      !gsv.ten ||
      !tinh ||
      !huyen ||
      !xa ||
      !gsv.taikhoan ||
      !gsv.sdt ||
      !gsv.cmnd ||
      !gsv.email
    ) {
      setErrMsg("Thông tin không được để trống");
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (!emptyFields()) {
      const dl = {
        ten: gsv.ten,
        taikhoan: gsv.taikhoan,
        sdt: gsv.sdt,
        cmnd: gsv.cmnd,
        email: gsv.email,
        xa,
        huyen,
        tinh,
      };
      // console.log(dl);
      const { success } = await apiGSV.themGsv(dl);
      if (success) {
        toast.success("Thêm thành công!", { theme: "colored" });
        resetFields();
      }
    }
  };

  const resetFields = () => {
    setGsv({
      ten: "",
      taikhoan: "",
      sdt: "",
      cmnd: "",
      email: "",
    });
    setErrMsg("");
    setTinh(null);
    sethuyen(null);
    setXa(null);
  };

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách giám sát vùng"
          titleBack
          onClick={() => props.history.push("/admin/gsv")}
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
                <span>Thêm giám sát vùng</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={ten} alt="ten" />
                  <span>Tên giám sát vùng:</span>
                </Label>

                <Input
                  placeholder="Nhập tên"
                  type="text"
                  name="ten"
                  value={gsv.ten}
                  onChange={handleChangeGsv}
                />
                {!gsv.ten && <ErrMsg>{errMsg}</ErrMsg>}
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
                  value={gsv.sdt}
                  onChange={handleChangeGsv}
                />
                {!gsv.sdt && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={cmnd} alt="cmnd" />
                  <span>Số chứng minh nhân dân:</span>
                </Label>
                <Input
                  placeholder="Nhập cmnd"
                  type="text"
                  name="cmnd"
                  value={gsv.cmnd}
                  onChange={handleChangeGsv}
                />
                {!gsv.cmnd && <ErrMsg>{errMsg}</ErrMsg>}
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
                  value={gsv.email}
                  onChange={handleChangeGsv}
                />
                {!gsv.email && <ErrMsg>{errMsg}</ErrMsg>}
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
                          sethuyen(null);
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
                    {!tinh && <ErrMsg>{errMsg}</ErrMsg>}
                  </div>

                  <div className="col-lg-4">
                    {dsHuyen && dsHuyen.length ? (
                      <DropdownMaterial2
                        label="Chọn Quận/Huyện"
                        value={huyen}
                        onChange={(e) => {
                          sethuyen(e.target.value);
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
                    {!huyen && <ErrMsg>{errMsg}</ErrMsg>}
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
                    {!xa && <ErrMsg>{errMsg}</ErrMsg>}
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
                <Input
                  placeholder="Nhập tên"
                  type="text"
                  name="taikhoan"
                  value={gsv.taikhoan}
                  onChange={handleChangeGsv}
                />
                {!gsv.taikhoan && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default GSVThem;
