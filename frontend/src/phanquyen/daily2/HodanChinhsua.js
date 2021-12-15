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
import { apiTinhThanh } from "../../apiTinhThanh";
import apiHodan from "../../axios/apiHodan";
// import apiLangnghe from "../../axios/apiLangnghe";
import BackdropMaterial from "../../components/BackdropMaterial";
import { toast } from "react-toastify";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import MenuItem from "@mui/material/MenuItem";
import InputPassword from "../../components/InputPassword";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import diachi from "../../assets/icons/diachi.png";
import taikhoan from "../../assets/icons/taikhoan.png";
import cmnd from "../../assets/icons/cmnd.png";
import loai from "../../assets/icons/loai.png";
import namsinh from "../../assets/icons/namsinh.png";
import langnghe from "../../assets/icons/langnghe_2.png";
import _matkhau from "../../assets/icons/matkhau.png";

const HodanChinhsua = (props) => {
  const [hodan, setHodan] = useState(null);
  // const [dsLangnghe, setDsLangnghe] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLangnghe, setSelectedLangnghe] = useState(null);
  const [tinh, setTinh] = useState(null);
  const [huyen, sethuyen] = useState(null);
  const [xa, setXa] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  // const [dsLoaiSP, setdsLoaiSP] = useState([]);
  const [selectedLoaiSP, setselectedLoaiSP] = useState(null);
  const [matkhau, setMatkhau] = useState("");
  const [xnMatkhau, setXnMatkhau] = useState("");
  const [pwdNotMatch, setPwdNotMatch] = useState(false);
  const { id: hodanId } = props.match.params;

  const dsXa = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.find((item) => item.name === huyen)
    ?.wards.map((item) => item.name);

  const handleChangeHodan = (e) => {
    setHodan({
      ...hodan,
      [e.target.name]: e.target.value,
    });
  };

  const emptyFields = () => {
    // thong tin ko dc de trong
    if (
      !hodan.daidien ||
      !hodan.sdt ||
      !hodan.cmnd ||
      !hodan.namsinh ||
      !selectedLangnghe ||
      !xa ||
      !selectedLoaiSP ||
      !hodan.taikhoan
    ) {
      setErrMsg("Thông tin không được để trống");
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (matkhau !== xnMatkhau) {
      return setPwdNotMatch(true);
    }
    if (!emptyFields()) {
      const dl = {
        daidien: hodan.daidien,
        xa,
        tinh,
        huyen,
        sdt: hodan.sdt,
        cmnd: hodan.cmnd,
        namsinh: hodan.namsinh,
        langnghe: selectedLangnghe,
        loaisanpham: selectedLoaiSP,
        matkhau,
      };
      const { success } = await apiHodan.suaHodan(hodanId, dl);
      if (success) {
        toast.success("Cập nhật thành công!", { theme: "colored" });
        props.history.push("/daily2/hodan");
      }
    }
  };

  const fetchDsLangnghe = async () => {
    setLoading(true);
    const { hodan } = await apiHodan.singleHodan(hodanId);
    // const { langnghe } = await apiLangnghe.dsLangnghe();
    // const { loaisanpham } = langnghe.find(
    //   (item) => item._id === hodan.langnghe._id
    // );
    setHodan(hodan);
    // setDsLangnghe(langnghe);
    setSelectedLangnghe(hodan.langnghe);
    setselectedLoaiSP(hodan.loaisanpham);
    setTinh(hodan.tinh);
    sethuyen(hodan.huyen);
    setXa(hodan.xa);
    // setdsLoaiSP(loaisanpham);
    setLoading(false);
  };

  useEffect(() => {
    fetchDsLangnghe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Container>
      <Header
        title="Quay lại danh sách hộ dân"
        titleBack
        onClick={() => props.history.push("/daily2/hodan")}
        headerRight={
          <button className="btn btn-primary px-4" onClick={handleSubmit}>
            Lưu
            <i class="fas fa-save"></i>
          </button>
        }
      />
      <Content>
        <Form>
          <FormContent>
            <FormTitle>Cập nhật hộ dân</FormTitle>

            <FormGroup>
              <Label>
                <img src={ten} alt="ten" />
                <span>Tên hộ dân:</span>
              </Label>
              <Input
                placeholder="Nhập tên"
                type="text"
                name="daidien"
                value={hodan?.daidien}
                onChange={(e) => {
                  handleChangeHodan(e);
                }}
              />
              {!hodan?.daidien && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={sdt} alt="sdt" />
                <span>Số điện thoại:</span>
              </Label>
              <Input
                placeholder="Nhập sđt"
                type="text"
                name="sdt"
                value={hodan?.sdt}
                onChange={(e) => {
                  handleChangeHodan(e);
                }}
              />
              {!hodan?.sdt && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={cmnd} alt="cmnd" />
                <span>Chứng minh nhân dân:</span>
              </Label>
              <Input
                placeholder="Nhập cmnd"
                type="text"
                name="cmnd"
                value={hodan?.cmnd}
                onChange={(e) => {
                  handleChangeHodan(e);
                }}
              />
              {!hodan?.cmnd && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={namsinh} alt="namsinh" />
                <span>Năm sinh:</span>
              </Label>
              <Input
                placeholder="Nhập năm sinh"
                type="text"
                name="namsinh"
                value={hodan?.namsinh}
                onChange={(e) => {
                  handleChangeHodan(e);
                }}
              />
              {!hodan?.namsinh && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <div className="row">
              <div className="col-lg-6">
                <FormGroup>
                  <Label>
                    <img src={langnghe} alt="langnghe" />
                    <span>Làng nghề:</span>
                  </Label>
                  <Input type="text" value={hodan?.langnghe.ten} disabled />
                  {/* {dsLangnghe && dsLangnghe.length ? (
                    <DropdownMaterial2
                      label="Chọn Làng nghề"
                      value={selectedLangnghe}
                      onChange={(e) => {
                        setSelectedLangnghe(e.target.value);
                        const { tinh, huyen, sanphamchinh } = dsLangnghe.find(
                          (item) => item._id === e.target.value
                        );
                        setTinh(tinh);
                        sethuyen(huyen);
                        setdsLoaiSP(sanphamchinh);
                        setXa(null);
                        setselectedLoaiSP(null);
                      }}
                    >
                      {dsLangnghe &&
                        dsLangnghe.length &&
                        dsLangnghe.map((item) => (
                          <MenuItem value={item._id}>{item.ten}</MenuItem>
                        ))}
                    </DropdownMaterial2>
                  ) : (
                    <DropdownMaterial2 label="Chọn làng nghề" />
                  )}
                  {!selectedLangnghe && <ErrMsg>{errMsg}</ErrMsg>} */}
                </FormGroup>
              </div>

              <div className="col-lg-6">
                <FormGroup>
                  <Label>
                    <img src={diachi} alt="diachi" />
                    <span>Nơi cư trú:</span>
                  </Label>
                  {dsXa && dsXa.length ? (
                    <DropdownMaterial2
                      label="Chọn xã"
                      value={xa}
                      onChange={(e) => setXa(e.target.value)}
                    >
                      {dsXa.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </DropdownMaterial2>
                  ) : (
                    <DropdownMaterial2 label="Chọn xã" />
                  )}
                  {!xa && <ErrMsg>{errMsg}</ErrMsg>}
                </FormGroup>
              </div>
            </div>

            <FormGroup>
              <Label>
                <img src={loai} alt="loai" />
                <span>Loại sản phẩm:</span>
              </Label>
              <Input type="text" value={hodan?.loaisanpham.ten} disabled />
              {/* {dsLoaiSP && dsLoaiSP.length ? (
                <DropdownMaterial2
                  label="Chọn loại sản phẩm"
                  value={selectedLoaiSP}
                  onChange={(e) => setselectedLoaiSP(e.target.value)}
                >
                  {dsLoaiSP.map((item) => (
                    <MenuItem value={item._id}>{item.ten}</MenuItem>
                  ))}
                </DropdownMaterial2>
              ) : (
                <DropdownMaterial2 label="Chọn loại sản phẩm" />
              )}
              {!selectedLoaiSP && <ErrMsg>{errMsg}</ErrMsg>} */}
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={taikhoan} alt="taikhoan" />
                <span>Tên tài khoản:</span>
              </Label>
              <Input type="text" value={hodan?.taikhoan} disabled />
            </FormGroup>

            {hodan?.active && (
              <div className="row">
                <div className="col-lg-6">
                  <FormGroup>
                    <Label>
                      <img src={_matkhau} alt="matkhau" />
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
                      <img src={_matkhau} alt="matkhau" />
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
            )}
          </FormContent>
        </Form>
      </Content>
    </Container>
  );
};

export default HodanChinhsua;
