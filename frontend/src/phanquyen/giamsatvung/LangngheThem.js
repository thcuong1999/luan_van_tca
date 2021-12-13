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
import { useSelector } from "react-redux";
import apiGSV from "../../axios/apiGSV";
import apiLangnghe from "../../axios/apiLangnghe";
import BackdropMaterial from "../../components/BackdropMaterial";
import { toast } from "react-toastify";
import apiLoaiSanpham from "../../axios/apiLoaiSanpham";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import MultipleSelect from "../../components/MultipleSelect";
import MenuItem from "@mui/material/MenuItem";
import _ten from "../../assets/icons/ten.png";
import _tinh from "../../assets/icons/tinh.png";
import _huyen from "../../assets/icons/huyen.png";
import loai from "../../assets/icons/loai.png";

const LangngheThem = (props) => {
  const [loading, setLoading] = useState(false);
  const [gsvInfo, setGsvInfo] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [ten, setTen] = useState("");
  const [dsLoaiSp, setDsLoaiSp] = useState([]);
  const [selectedLoaiSP, setSelectedLoaiSP] = React.useState([]);
  const [tinh, setTinh] = useState(null);
  const [huyen, sethuyen] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const dsTinh = apiTinhThanh.map((item) => item.name);
  const dsHuyen = apiTinhThanh
    .find((item) => item.name === tinh)
    ?.districts.map((item) => item.name);

  const handleChangeLoaiSP = (e) => {
    const {
      target: { value },
    } = e;
    setSelectedLoaiSP(typeof value === "string" ? value.split(",") : value);
  };

  const emptyFields = () => {
    if (!ten || !tinh || !huyen || selectedLoaiSP.length === 0) {
      setErrMsg("Trường không đươc để trống");
      return true;
    } else {
      setErrMsg("");
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!emptyFields()) {
      const dl = {
        gsvId: gsvInfo._id,
        ten,
        tinh,
        huyen,
        loaisanpham: selectedLoaiSP,
      };
      const { success } = await apiLangnghe.themLangnghe(dl);
      if (success) {
        toast.success("Thêm thành công!", { theme: "colored" });
        resetFields();
      }
    }
  };

  const resetFields = () => {
    setTen("");
    setErrMsg("");
    setTinh(null);
    sethuyen(null);
    setSelectedLoaiSP([]);
  };

  const fetchData = async () => {
    setLoading(true);
    // fetch gsv info
    const { gsv } = await apiGSV.singleGsvBasedUserId(userInfo._id);
    // fetch sanpham langnghe (loai sp)
    const { loaiSanpham } = await apiLoaiSanpham.dsLoaiSanpham();
    // set data
    setGsvInfo(gsv);
    setDsLoaiSp(loaiSanpham);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  console.log({ selectedLoaiSP });

  return (
    <Container>
      <Header
        title="Quay lại danh sách làng nghề"
        titleBack
        onClick={() => props.history.push("/giamsatvung/langnghe")}
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
              <span>Thêm làng nghề</span>
            </FormTitle>

            <FormGroup>
              <Label>
                <img src={_ten} alt="ten" />
                <span>Tên làng:</span>
              </Label>
              <Input
                placeholder="Nhập tên"
                type="text"
                value={ten}
                onChange={(e) => {
                  setTen(e.target.value);
                }}
              />
              {!ten && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={_tinh} alt="tinh" />
                <span>Tỉnh:</span>
              </Label>
              {dsTinh && dsTinh.length ? (
                <DropdownMaterial2
                  label="Chọn Tỉnh/Thành Phố"
                  value={tinh}
                  onChange={(e) => {
                    setTinh(e.target.value);
                    sethuyen(null);
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
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={_huyen} alt="_huyen" />
                <span>Huyện:</span>
              </Label>
              {dsHuyen && dsHuyen.length ? (
                <DropdownMaterial2
                  label="Chọn Quận/Huyện"
                  value={huyen}
                  onChange={(e) => {
                    sethuyen(e.target.value);
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
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={loai} alt="loai" />
                <span>Loại sản phẩm:</span>
              </Label>
              {dsLoaiSp && dsLoaiSp.length ? (
                <MultipleSelect
                  label="Chọn loại sản phẩm"
                  value={selectedLoaiSP}
                  onChange={handleChangeLoaiSP}
                >
                  {dsLoaiSp.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.ten}
                    </MenuItem>
                  ))}
                </MultipleSelect>
              ) : (
                <MultipleSelect label="Chọn loại sản phẩm" />
              )}
              {selectedLoaiSP.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>
          </FormContent>
        </Form>
      </Content>
    </Container>
  );
};

export default LangngheThem;
