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
import apiDaily2 from "../../axios/apiDaily2";
import { useSelector } from "react-redux";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiDaily1 from "../../axios/apiDaily1";
import { toast } from "react-toastify";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import MenuItem from "@mui/material/MenuItem";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";
import taikhoan from "../../assets/icons/taikhoan.png";

const Daily2Them = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [daily1Info, setDaily1Info] = React.useState(null);
  const [daily2, setDaily2] = useState({
    ten: "",
    taikhoan: "",
    sdt: "",
    email: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const { userInfo } = useSelector((state) => state.user);

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

  const handleChangeDaily2 = (e) => {
    setDaily2({
      ...daily2,
      [e.target.name]: e.target.value,
    });
  };

  const emptyFields = () => {
    // thong tin ko dc de trong
    if (
      !daily2.ten ||
      !tinh ||
      !huyen ||
      !xa ||
      !daily2.taikhoan ||
      !daily2.sdt ||
      !daily2.email
    ) {
      setErrMsg("Thông tin không được để trống");
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (!emptyFields()) {
      const dl = {
        ten: daily2.ten,
        sdt: daily2.sdt,
        email: daily2.email,
        xa,
        huyen,
        tinh,
        taikhoan: daily2.taikhoan,
        daily1Id: daily1Info._id,
        bophankdId: daily1Info.bophankd,
        gsvId: daily1Info.giamsatvung,
      };
      const { success } = await apiDaily2.themDaily2(dl);
      if (success) {
        toast.success("Thêm thành công!", { theme: "colored" });
        resetFields();
        setErrMsg("");
      }
    }
  };

  const resetFields = () => {
    setDaily2({
      ten: "",
      taikhoan: "",
      sdt: "",
      email: "",
    });
    setTinh(null);
    sethuyen(null);
    setXa(null);
  };

  const fetchDaily1Info = async () => {
    setLoading(true);
    const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    setDaily1Info(daily1);
    setLoading(false);
  };

  useEffect(() => {
    fetchDaily1Info();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách đại lý 2"
          titleBack
          onClick={() => props.history.push("/daily1/daily2")}
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
                  value={daily2.ten}
                  onChange={handleChangeDaily2}
                />
                {!daily2.ten && <ErrMsg>{errMsg}</ErrMsg>}
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
                  value={daily2.sdt}
                  onChange={handleChangeDaily2}
                />
                {!daily2.sdt && <ErrMsg>{errMsg}</ErrMsg>}
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
                  value={daily2.email}
                  onChange={handleChangeDaily2}
                />
                {!daily2.email && <ErrMsg>{errMsg}</ErrMsg>}
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
                      <DropdownMaterial2 label="Chọn Quận/Huyện" />
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
                  value={daily2.taikhoan}
                  onChange={handleChangeDaily2}
                />{" "}
                {!daily2.taikhoan && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Daily2Them;
