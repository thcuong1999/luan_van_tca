import React, { useState } from "react";
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
import apiDaily1 from "../../axios/apiDaily1";
import { useSelector } from "react-redux";
import apiGSV from "../../axios/apiGSV";
import BackdropMaterial from "../../components/BackdropMaterial";
import { toast } from "react-toastify";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import MenuItem from "@mui/material/MenuItem";
import them from "../../assets/icons/them.png";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";
import taikhoan from "../../assets/icons/taikhoan.png";

const Daily1Them = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [gsvInfo, setGsvInfo] = React.useState(false);
  const [daily1, setDaily1] = useState({
    ten: "",
    taikhoan: "",
    sdt: "",
    email: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [tinh, setTinh] = useState(null);
  const [huyen, sethuyen] = useState(null);
  const [xa, setXa] = useState(null);
  const { userInfo } = useSelector((state) => state.user);

  const dsTinh = apiTinhThanh.map((item) => item.name);
  const dsHuyen = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.map((item) => item.name);
  const dsXa = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.find((item) => item.name === huyen)
    ?.wards.map((item) => item.name);

  const handleChangeDaily1 = (e) => {
    setDaily1({
      ...daily1,
      [e.target.name]: e.target.value,
    });
  };

  const emptyFields = () => {
    // thong tin ko dc de trong
    if (
      !daily1.ten ||
      !tinh ||
      !huyen ||
      !xa ||
      !daily1.taikhoan ||
      !daily1.sdt ||
      !daily1.email
    ) {
      setErrMsg("Thông tin không được để trống");
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (!emptyFields()) {
      const dl = {
        ten: daily1.ten,
        sdt: daily1.sdt,
        email: daily1.email,
        xa,
        huyen,
        tinh,
        taikhoan: daily1.taikhoan,
        bophankdId: gsvInfo.bophankd,
        gsvId: gsvInfo._id,
      };
      // console.log(dl);
      const { success } = await apiDaily1.themDaily1(dl);
      if (success) {
        toast.success("Thêm thành công!", { theme: "colored" });
        resetFields();
        setErrMsg("");
      }
    }
  };

  const resetFields = () => {
    setDaily1({
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

  const fetchGsvInfo = async () => {
    setLoading(true);
    const { gsv } = await apiGSV.singleGsvBasedUserId(userInfo._id);
    setGsvInfo(gsv);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchGsvInfo();
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
              Lưu
              <i class="fas fa-save"></i>
            </button>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>
                <span>Thêm đại lý</span>
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
                  value={daily1.ten}
                  onChange={handleChangeDaily1}
                />
                {!daily1.ten && <ErrMsg>{errMsg}</ErrMsg>}
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
                  value={daily1.sdt}
                  onChange={handleChangeDaily1}
                />
                {!daily1.sdt && <ErrMsg>{errMsg}</ErrMsg>}
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
                  value={daily1.email}
                  onChange={handleChangeDaily1}
                />
                {!daily1.email && <ErrMsg>{errMsg}</ErrMsg>}
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
                  placeholder="Nhập tài khoản"
                  type="text"
                  name="taikhoan"
                  value={daily1.taikhoan}
                  onChange={handleChangeDaily1}
                />
                {!daily1.taikhoan && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Daily1Them;
