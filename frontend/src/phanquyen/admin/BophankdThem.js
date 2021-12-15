import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import { apiTinhThanh } from "../../apiTinhThanh";
import apiBophankd from "../../axios/apiBophankd";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import MenuItem from "@mui/material/MenuItem";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";
import taikhoan from "../../assets/icons/taikhoan.png";
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
import BackdropMaterial from "../../components/BackdropMaterial";

const BophankdThem = (props) => {
  const [bpkd, setBpkd] = useState({
    ten: "",
    taikhoan: "",
    sdt: "",
    email: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [tinh, setTinh] = useState(null);
  const [huyen, sethuyen] = useState(null);
  const [xa, setXa] = useState(null);
  const [loading, setLoading] = useState(null);
  const [dsTaikhoan, setDsTaikhoan] = useState([]);
  const [taikhoanErr, setTaikhoanErr] = useState("");

  const handleChangeTaikhoan = (e) => {
    var format = /[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/;
    const val = e.target.value.toLowerCase();
    setBpkd({ ...bpkd, taikhoan: val });
    // check white space
    if (val.indexOf(" ") >= 0) {
      setTaikhoanErr("Tài khoản không có khoảng trắng");
    } else if (dsTaikhoan.includes(val)) {
      // check maSP exist
      setTaikhoanErr("Tài khoản đã tồn tại");
    } else if (format.test(val)) {
      // check contains special chars
      setTaikhoanErr("Tài khoản không được chứa kí tự đặc biệt");
    } else {
      setTaikhoanErr("");
    }
  };

  const dsTinh = apiTinhThanh.map((item) => item.name);
  const dsHuyen = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.map((item) => item.name);
  const dsXa = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.find((item) => item.name === huyen)
    ?.wards.map((item) => item.name);

  const handleChangeBpkd = (e) => {
    setBpkd({
      ...bpkd,
      [e.target.name]: e.target.value,
    });
  };

  const validateFields = () => {
    if (taikhoanErr) {
      return false;
    }
    if (!bpkd.taikhoan) {
      setTaikhoanErr("Thông tin không được để trống");
      return false;
    }
    if (bpkd.taikhoan.length < 6) {
      setTaikhoanErr("Tài khoản có ít nhất 6 kí tự");
      return false;
    }
    if (!bpkd.ten || !tinh || !huyen || !xa || !bpkd.sdt || !bpkd.email) {
      setErrMsg("Thông tin không được để trống");

      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      const dl = {
        ten: bpkd.ten,
        sdt: bpkd.sdt,
        email: bpkd.email,
        xa,
        huyen,
        tinh,
        taikhoan: bpkd.taikhoan,
      };
      // console.log(dl);
      const { success } = await apiBophankd.themBophankd(dl);
      if (success) {
        toast.success("Thêm thành công!", { theme: "colored" });
        resetFields();
      }
    }
  };

  const resetFields = () => {
    setBpkd({
      ten: "",
      taikhoan: "",
      sdt: "",
      email: "",
    });
    setTinh(null);
    sethuyen(null);
    setXa(null);
    setErrMsg("");
  };

  const fetchDsBpkd = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.dsBophankd();
    setDsTaikhoan(bophankd.map((bpkd) => bpkd.user.taikhoan));
    setLoading(false);
  };

  useEffect(() => {
    fetchDsBpkd();
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
                <span>Thêm bộ phận kinh doanh</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={ten} alt="ten" />
                  <span>Tên bộ phận kinh doanh:</span>
                </Label>
                <Input
                  placeholder="Nhập tên"
                  type="text"
                  name="ten"
                  value={bpkd.ten}
                  onChange={handleChangeBpkd}
                />
                {!bpkd.ten && <ErrMsg>{errMsg}</ErrMsg>}
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
                  value={bpkd.sdt}
                  onChange={handleChangeBpkd}
                />
                {!bpkd.sdt && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={email} alt="email" />
                  <span>E-mail:</span>
                </Label>
                <Input
                  placeholder="Nhập email"
                  type="email"
                  name="email"
                  value={bpkd.email}
                  onChange={handleChangeBpkd}
                />
                {!bpkd.email && <ErrMsg>{errMsg}</ErrMsg>}
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
                  <img src={taikhoan} alt="taikhoan" />
                  <span>Tên tài khoản:</span>
                </Label>
                <Input
                  placeholder="Nhập tên"
                  type="text"
                  name="taikhoan"
                  value={bpkd.taikhoan}
                  onChange={handleChangeTaikhoan}
                />
                {<ErrMsg>{taikhoanErr}</ErrMsg>}
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default BophankdThem;
