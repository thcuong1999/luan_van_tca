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
import apiLangnghe from "../../axios/apiLangnghe";
import BackdropMaterial from "../../components/BackdropMaterial";
import { useSelector } from "react-redux";
import apiDaily2 from "../../axios/apiDaily2";
import { toast } from "react-toastify";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import MenuItem from "@mui/material/MenuItem";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import diachi from "../../assets/icons/diachi.png";
import taikhoan from "../../assets/icons/taikhoan.png";
import cmnd from "../../assets/icons/cmnd.png";
import loai from "../../assets/icons/loai.png";
import namsinh from "../../assets/icons/namsinh.png";
import langnghe from "../../assets/icons/langnghe_2.png";

const HodanThem = (props) => {
  const [hodan, setHodan] = useState({
    daidien: "",
    taikhoan: "",
    sdt: "",
    cmnd: "",
    namsinh: "",
  });
  const [dsLangnghe, setDsLangnghe] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLangnghe, setSelectedLangnghe] = useState(null);
  const [tinh, setTinh] = useState(null);
  const [huyen, sethuyen] = useState(null);
  const [xa, setXa] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [daily2Info, setDaily2Info] = useState(null);
  const [dsLoaiSP, setdsLoaiSP] = useState([]);
  const [selectedLoaiSP, setselectedLoaiSP] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [dsTaikhoan, setDsTaikhoan] = useState([]);
  const [taikhoanErr, setTaikhoanErr] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChangeTaikhoan = (e) => {
    var format = /[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/;
    const val = e.target.value.toLowerCase();
    setHodan({ ...hodan, taikhoan: val });
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

  const validateFields = () => {
    if (taikhoanErr) {
      return false;
    }
    if (!hodan.taikhoan) {
      setTaikhoanErr("Thông tin không được để trống");
      return false;
    }
    if (hodan.taikhoan.length < 6) {
      setTaikhoanErr("Tài khoản có ít nhất 6 kí tự");
      return false;
    }
    if (
      !hodan.daidien ||
      !hodan.sdt ||
      !hodan.cmnd ||
      !hodan.namsinh ||
      !selectedLangnghe ||
      !xa ||
      !selectedLoaiSP
    ) {
      setErrMsg("Thông tin không được để trống");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateFields()) {
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
        taikhoan: hodan.taikhoan,
        daily1: daily2Info.daily1,
        daily2: daily2Info._id,
      };
      //console.log(dl);
      const { success } = await apiHodan.themHodan(dl);
      if (success) {
        toast.success("Thêm hộ dân thành công!", { theme: "colored" });
        resetFields();
        setSuccess(true)
      }
    }
  };

  const resetFields = () => {
    setHodan({
      daidien: "",
      taikhoan: "",
      sdt: "",
      cmnd: "",
      namsinh: "",
    });
    setErrMsg("");
    setTinh(null);
    sethuyen(null);
    setSelectedLangnghe(null);
    setXa(null);
    setselectedLoaiSP(null);
    setdsLoaiSP([]);
  };

  const fetchDsLangnghe = async () => {
    setLoading(true);
    const { langnghe } = await apiLangnghe.dsLangnghe();
    const { daily2 } = await apiDaily2.singleDaily2BasedUser(userInfo._id);
    const { hodan } = await apiHodan.dsHodan();
    setDsTaikhoan(hodan.map((hodan) => hodan.taikhoan));
    setDsLangnghe(langnghe);
    setDaily2Info(daily2);
    setLoading(false);
  };

  useEffect(() => {
    setSuccess(false);
    fetchDsLangnghe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

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
          <button className="btn btn-primary px-3" onClick={handleSubmit}>
            Lưu
            <i class="fas fa-save"></i>
          </button>
        }
      />
      <Content>
        <Form>
          <FormContent>
            <FormTitle>
              <span>Thêm hộ dân</span>
            </FormTitle>

            <FormGroup>
              <Label>
                <img src={ten} alt="ten" />
                <span>Tên hộ dân:</span>
              </Label>
              <Input
                placeholder="Nhập tên"
                type="text"
                name="daidien"
                value={hodan.daidien}
                onChange={(e) => {
                  handleChangeHodan(e);
                }}
              />
              {!hodan.daidien && <ErrMsg>{errMsg}</ErrMsg>}
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
                value={hodan.sdt}
                onChange={(e) => {
                  handleChangeHodan(e);
                }}
              />
              {!hodan.sdt && <ErrMsg>{errMsg}</ErrMsg>}
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
                value={hodan.cmnd}
                onChange={(e) => {
                  handleChangeHodan(e);
                }}
              />
              {!hodan.cmnd && <ErrMsg>{errMsg}</ErrMsg>}
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
                value={hodan.namsinh}
                onChange={(e) => {
                  handleChangeHodan(e);
                }}
              />
              {!hodan.namsinh && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <div className="row">
              <div className="col-lg-6">
                <FormGroup>
                  <Label>
                    <img src={langnghe} alt="langnghe" />
                    <span>Làng nghề:</span>
                  </Label>
                  {dsLangnghe && dsLangnghe.length ? (
                    <DropdownMaterial2
                      label="Chọn Làng nghề"
                      value={selectedLangnghe}
                      onChange={(e) => {
                        setSelectedLangnghe(e.target.value);
                        const { tinh, huyen, loaisanpham } = dsLangnghe.find(
                          (item) => item._id === e.target.value
                        );
                        setTinh(tinh);
                        sethuyen(huyen);
                        setdsLoaiSP(loaisanpham);
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
                  {!selectedLangnghe && <ErrMsg>{errMsg}</ErrMsg>}
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
              {dsLoaiSP && dsLoaiSP.length ? (
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
              {!selectedLoaiSP && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={taikhoan} alt="taikhoan" />
                <span>Tên tài khoản:</span>
              </Label>
              <Input
                placeholder="Nhập tài khoản"
                type="text"
                name="taikhoan"
                value={hodan.taikhoan}
                onChange={handleChangeTaikhoan}
              />
              {<ErrMsg>{taikhoanErr}</ErrMsg>}
            </FormGroup>
          </FormContent>
        </Form>
      </Content>
    </Container>
  );
};

export default HodanThem;
