import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Avatar,
  Container,
  Section,
  Input,
  InputBox,
  Label,
  MenusItem,
  Menus,
  Title,
  Wrapper,
  Button,
  EditAvatar,
  ButtonBox,
  ToggleBtn,
  Btn,
  FlexRow,
  FlexCollumn,
  ButtonsWrapper,
  TaikhoanText,
  Select,
} from "./styledComponents";
import { useSelector } from "react-redux";
import Axios from "axios";
import BackdropMaterial from "../BackdropMaterial";
import apiBophankd from "../../axios/apiBophankd";
import apiGSV from "../../axios/apiGSV";
import apiDaily1 from "../../axios/apiDaily1";
import apiDaily2 from "../../axios/apiDaily2";
import { apiTinhThanh } from "../../apiTinhThanh";
import { ErrMsg } from "../../phanquyen/admin/styledComponents";
import { comparePwd } from "../../utils";

const ThongtinCanhan = ({ type }) => {
  const [activeTab, setActiveTab] = useState("canhan");
  const [loading, setLoading] = useState(false);
  const [hinhanh, setHinhanh] = useState(null);
  const [imgToDisplay, setImgToDisplay] = useState(null);
  const [data, setData] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [dsTinh, setDsTinh] = useState([]);
  const [dsHuyen, setDsHuyen] = useState([]);
  const [dsXa, setDsXa] = useState([]);
  const [tinh, setTinh] = useState(null);
  const [huyen, setHuyen] = useState(null);
  const [xa, setXa] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [pwdErr, setPwdErr] = useState({ type: "", msg: "" });
  const [matkhau, setMatkhau] = useState({
    matkhauCu: "",
    matkhauMoi: "",
    xnMatkhau: "",
  });

  const validateFields = () => {
    // info checking
    if (!data.ten || !data.sdt || !data.email) {
      setErrMsg("Thông tin không được để trống");
      return false;
    }
    // mat khau cu
    if (
      matkhau.matkhauCu &&
      !comparePwd(matkhau.matkhauCu, data.user.matkhau)
    ) {
      setPwdErr({ type: "matkhauCu", msg: "Mật khẩu cũ không đúng" });
      return false;
    }
    // if có nhập mk cũ nhưng mk mới rỗng
    if (matkhau.matkhauCu && !matkhau.matkhauMoi.length) {
      setPwdErr({ type: "matkhauMoi", msg: "Vui lòng nhập mật khẩu mới" });
      return false;
    }
    // mk mới ko dc nhỏ hơn 6 kí tự
    if (matkhau.matkhauMoi && matkhau.matkhauMoi.length < 6) {
      setPwdErr({ type: "matkhauMoi", msg: "Mật khẩu có ít nhất 6 kí tự" });
      return false;
    }
    // mk mới trùng mk cũ
    if (
      matkhau.matkhauMoi &&
      comparePwd(matkhau.matkhauMoi, data.user.matkhau)
    ) {
      setPwdErr({ type: "matkhauMoi", msg: "Mật khẩu mới trùng mật khẩu cũ" });
      return false;
    }
    // if đã nhập mk mới nhưng xác nhận mk rỗng
    if (matkhau.matkhauMoi && !matkhau.xnMatkhau) {
      setPwdErr({ type: "xnMatkhau", msg: "Vui lòng xác nhận mật khẩu" });
      return false;
    }
    // Check trùng khớp xn mk
    if (
      matkhau.matkhauMoi &&
      matkhau.matkhauMoi.localeCompare(matkhau.xnMatkhau) !== 0
    ) {
      setPwdErr({ type: "xnMatkhau", msg: "Xác nhận không trùng khớp" });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      // prepare payload
      const formData = new FormData();
      formData.append("ten", data.ten);
      formData.append("sdt", data.sdt);
      formData.append("email", data.email);
      formData.append("xa", xa);
      formData.append("huyen", huyen);
      formData.append("tinh", tinh);
      formData.append("matkhau", matkhau.matkhauMoi);
      formData.append("avatar", hinhanh);
      formData.append("user", data.user._id);

      switch (type) {
        case "admin":
          const { data: apiData } = await Axios.put(
            "/api/admin/capnhatthongtincanhan",
            formData
          );
          if (apiData.success) {
            toast.success("Cập nhật thành công!", { theme: "colored" });
            // reset fields
            resetFields();
          }
          break;
        case "bophankd":
          const { success: bpkdSuccess } =
            await apiBophankd.capnhatThongtinCanhan(formData);
          if (bpkdSuccess) {
            toast.success("Cập nhật thành công!", { theme: "colored" });
            // reset fields
            resetFields();
          }
          break;
        case "giamsatvung":
          const { success: gsvSuccess } = await apiGSV.capnhatThongtinCanhan(
            formData
          );
          if (gsvSuccess) {
            toast.success("Cập nhật thành công!", { theme: "colored" });
            // reset fields
            resetFields();
          }
          break;
        case "daily1":
          const { success: dl1Success } = await apiDaily1.capnhatThongtinCanhan(
            formData
          );
          if (dl1Success) {
            toast.success("Cập nhật thành công!", { theme: "colored" });
            // reset fields
            resetFields();
          }
          break;
        case "daily2":
          const { success: dl2Success } = await apiDaily2.capnhatThongtinCanhan(
            formData
          );
          if (dl2Success) {
            toast.success("Cập nhật thành công!", { theme: "colored" });
            // reset fields
            resetFields();
          }
          break;

        default:
          return;
      }
    }
  };

  const resetFields = () => {
    setErrMsg("");
    setPwdErr({ type: "", msg: "" });
    setMatkhau({
      matkhauCu: "",
      matkhauMoi: "",
      xnMatkhau: "",
    });
  };

  const handleChangeInfo = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeXa = (e) => {
    setXa(e.target.value);
  };

  const handleChangeHuyen = (e) => {
    setHuyen(e.target.value);
    const ds_xa = apiTinhThanh
      .find((item) => item.name === tinh)
      ?.districts.find((item) => item.name === e.target.value)
      ?.wards.map((item) => item.name);
    setDsXa(ds_xa);
    setXa(ds_xa[0]);
  };

  const handleChangeTinh = (e) => {
    setTinh(e.target.value);
    const ds_huyen = apiTinhThanh
      .find((item) => item.name === e.target.value)
      ?.districts.map((item) => item.name);
    const ds_xa = apiTinhThanh
      .find((item) => item.name === e.target.value)
      ?.districts.find((item) => item.name === ds_huyen[0])
      ?.wards.map((item) => item.name);
    setDsHuyen(ds_huyen);
    setDsXa(ds_xa);
    setHuyen(ds_huyen[0]);
    setXa(ds_xa[0]);
  };

  const fetchThongtinCanhan = async () => {
    switch (type) {
      case "admin":
        setLoading(true);
        const {
          data: { admin },
        } = await Axios.get(`/api/admin/baseduserid/${userInfo._id}`);
        setXa(admin.xa);
        setHuyen(admin.huyen);
        setTinh(admin.tinh);
        setDsTinh(apiTinhThanh.map((item) => item.name));
        setDsHuyen(
          apiTinhThanh
            .find((item) => item.name === admin.tinh)
            ?.districts.map((item) => item.name)
        );
        setDsXa(
          apiTinhThanh
            .find((item) => item.name === admin.tinh)
            ?.districts.find((item) => item.name === admin.huyen)
            ?.wards.map((item) => item.name)
        );
        setData(admin);
        setLoading(false);
        break;
      case "bophankd":
        setLoading(true);
        const { bophankd } = await apiBophankd.bophankdBasedUserId(
          userInfo._id
        );
        setXa(bophankd.xa);
        setHuyen(bophankd.huyen);
        setTinh(bophankd.tinh);
        setData(bophankd);
        setDsTinh(apiTinhThanh.map((item) => item.name));
        setDsHuyen(
          apiTinhThanh
            .find((item) => item.name === bophankd.tinh)
            ?.districts.map((item) => item.name)
        );
        setDsXa(
          apiTinhThanh
            .find((item) => item.name === bophankd.tinh)
            ?.districts.find((item) => item.name === bophankd.huyen)
            ?.wards.map((item) => item.name)
        );
        setLoading(false);
        break;
      case "giamsatvung":
        setLoading(true);
        const { gsv } = await apiGSV.singleGsvBasedUserId(userInfo._id);
        setXa(gsv.xa);
        setHuyen(gsv.huyen);
        setTinh(gsv.tinh);
        setData(gsv);
        setDsTinh(apiTinhThanh.map((item) => item.name));
        setDsHuyen(
          apiTinhThanh
            .find((item) => item.name === gsv.tinh)
            ?.districts.map((item) => item.name)
        );
        setDsXa(
          apiTinhThanh
            .find((item) => item.name === gsv.tinh)
            ?.districts.find((item) => item.name === gsv.huyen)
            ?.wards.map((item) => item.name)
        );
        setData(gsv);
        setLoading(false);
        break;
      case "daily1":
        setLoading(true);
        const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
        setXa(daily1.xa);
        setHuyen(daily1.huyen);
        setTinh(daily1.tinh);
        setData(daily1);
        setDsTinh(apiTinhThanh.map((item) => item.name));
        setDsHuyen(
          apiTinhThanh
            .find((item) => item.name === daily1.tinh)
            ?.districts.map((item) => item.name)
        );
        setDsXa(
          apiTinhThanh
            .find((item) => item.name === daily1.tinh)
            ?.districts.find((item) => item.name === daily1.huyen)
            ?.wards.map((item) => item.name)
        );
        setData(daily1);
        setLoading(false);
        break;
      case "daily2":
        setLoading(true);
        const { daily2 } = await apiDaily2.singleDaily2BasedUser(userInfo._id);
        setXa(daily2.xa);
        setHuyen(daily2.huyen);
        setTinh(daily2.tinh);
        setData(daily2);
        setDsTinh(apiTinhThanh.map((item) => item.name));
        setDsHuyen(
          apiTinhThanh
            .find((item) => item.name === daily2.tinh)
            ?.districts.map((item) => item.name)
        );
        setDsXa(
          apiTinhThanh
            .find((item) => item.name === daily2.tinh)
            ?.districts.find((item) => item.name === daily2.huyen)
            ?.wards.map((item) => item.name)
        );
        setData(daily2);
        setLoading(false);
        console.log({ daily2 });
        break;

      default:
        return;
    }
  };

  useEffect(() => {
    fetchThongtinCanhan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Container>
      <Wrapper>
        <Title>Cá nhân</Title>

        <Menus>
          <MenusItem>Thông tin chi tiết</MenusItem>
        </Menus>

        <Avatar>
          <img
            src={
              imgToDisplay
                ? imgToDisplay
                : data?.avatar
                ? `/uploads/${data?.avatar}`
                : "https://avatarfiles.alphacoders.com/115/115265.png"
            }
            alt="avatar"
          />
          <label htmlFor="contained-button-file">
            <input
              accept="image/*"
              id="contained-button-file"
              type="file"
              onChange={(e) => {
                setHinhanh(e.target.files[0]);
                if (e.target.files.length !== 0) {
                  setImgToDisplay(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
            <EditAvatar>
              <i class="fas fa-pencil-alt"></i>
            </EditAvatar>
          </label>
        </Avatar>

        <>
          <Section
            className={
              activeTab === "canhan" ? "canhanActive" : "canhanDeactive"
            }
          >
            <FlexRow>
              <InputBox>
                <Label>Tên</Label>
                <Input
                  type="text"
                  value={data?.ten}
                  name="ten"
                  onChange={handleChangeInfo}
                />
                {!data?.ten && <ErrMsg>{errMsg}</ErrMsg>}
              </InputBox>

              <InputBox>
                <Label>Số điện thoại</Label>
                <Input
                  type="text"
                  value={data?.sdt}
                  name="sdt"
                  onChange={handleChangeInfo}
                />
                {!data?.sdt && <ErrMsg>{errMsg}</ErrMsg>}
              </InputBox>
            </FlexRow>

            <FlexRow>
              <InputBox>
                <Label>E-mail</Label>
                <Input
                  type="text"
                  value={data?.email}
                  name="email"
                  onChange={handleChangeInfo}
                />
                {!data?.email && <ErrMsg>{errMsg}</ErrMsg>}
              </InputBox>
              <InputBox>
                <Label>Tỉnh/Thành Phố</Label>
                <Select value={tinh} onChange={handleChangeTinh}>
                  {dsTinh.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </Select>
              </InputBox>
            </FlexRow>

            <FlexRow>
              <InputBox>
                <Label>Huyện/Quận</Label>
                <Select value={huyen} onChange={handleChangeHuyen}>
                  {dsHuyen.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </Select>
              </InputBox>
              <InputBox>
                <Label>Xã/Phường</Label>
                <Select value={xa} onChange={handleChangeXa}>
                  {dsXa.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </Select>
              </InputBox>
            </FlexRow>
          </Section>

          <Section
            className={
              activeTab === "taikhoan" ? "taikhoanActive" : "taikhoanDeactive"
            }
          >
            <FlexCollumn>
              <InputBox>
                <Label>Tài khoản</Label>
                <TaikhoanText>{data?.user.taikhoan}</TaikhoanText>
              </InputBox>

              <InputBox>
                <Label>Mật khẩu cũ</Label>
                <Input
                  type="password"
                  value={matkhau.matkhauCu}
                  style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
                  onChange={(e) =>
                    setMatkhau({ ...matkhau, matkhauCu: e.target.value })
                  }
                />
                {pwdErr.type === "matkhauCu" && <ErrMsg>{pwdErr.msg}</ErrMsg>}
              </InputBox>

              <InputBox>
                <Label>Mật khẩu mới</Label>
                <Input
                  type="password"
                  value={matkhau.matkhauMoi}
                  style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
                  onChange={(e) =>
                    setMatkhau({ ...matkhau, matkhauMoi: e.target.value })
                  }
                />
                {pwdErr.type === "matkhauMoi" && <ErrMsg>{pwdErr.msg}</ErrMsg>}
              </InputBox>

              <InputBox>
                <Label>Xác nhận mật khẩu</Label>
                <Input
                  type="password"
                  value={matkhau.xnMatkhau}
                  style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
                  onChange={(e) =>
                    setMatkhau({ ...matkhau, xnMatkhau: e.target.value })
                  }
                />
                {pwdErr.type === "xnMatkhau" && <ErrMsg>{pwdErr.msg}</ErrMsg>}
              </InputBox>
            </FlexCollumn>
          </Section>
        </>

        <ButtonsWrapper>
          <Button onClick={handleSubmit}>Lưu</Button>
          <ButtonBox>
            <Btn className={activeTab === "canhan" ? "canhan" : "taikhoan"} />
            <ToggleBtn onClick={() => setActiveTab("canhan")}>
              Cá nhân
            </ToggleBtn>
            <ToggleBtn onClick={() => setActiveTab("taikhoan")}>
              Tài khoản
            </ToggleBtn>
          </ButtonBox>
        </ButtonsWrapper>
      </Wrapper>
    </Container>
  );
};

export default ThongtinCanhan;
