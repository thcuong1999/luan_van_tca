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
  TextArea,
} from "./styledComponents";
import Header from "../../components/Header";
import apiLangnghe from "../../axios/apiLangnghe";
import BackdropMaterial from "../../components/BackdropMaterial";
import { toast } from "react-toastify";
import apiLoaiSanpham from "../../axios/apiLoaiSanpham";
import MultipleSelect from "../../components/MultipleSelect";
import MenuItem from "@mui/material/MenuItem";
import _ten from "../../assets/icons/ten.png";
import _tinh from "../../assets/icons/tinh.png";
import _huyen from "../../assets/icons/huyen.png";
import loai from "../../assets/icons/loai.png";

const LangngheChinhsua = (props) => {
  const [loading, setLoading] = useState(false);
  const [ten, setTen] = useState("");
  const [dsLoaiSp, setDsLoaiSp] = useState([]);
  const [selectedLoaiSP, setSelectedLoaiSP] = React.useState([]);
  const [tinh, setTinh] = useState(null);
  const [huyen, sethuyen] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const { id: langngheId } = props.match.params;

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
        ten,
        tinh,
        huyen,
        loaisanpham: selectedLoaiSP,
      };
      const { success } = await apiLangnghe.chinhsuaLangnghe(langngheId, dl);
      if (success) {
        toast.success("Thêm thành công!", { theme: "colored" });
        props.history.push("/giamsatvung/langnghe");
      }
    }
  };

  const fetchData = async () => {
    setLoading(true);
    // fetch single langnghe
    const { langnghe } = await apiLangnghe.singleLangnghe(langngheId);
    // fetch sanpham langnghe (loai sp)
    const { loaiSanpham } = await apiLoaiSanpham.dsLoaiSanpham();
    // set data
    setTen(langnghe.ten);
    setTinh(langnghe.tinh);
    sethuyen(langnghe.huyen);
    setSelectedLoaiSP(langnghe.loaisanpham.map((lsp) => lsp._id));
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
              <span>Cập nhật làng nghề</span>
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
              <Input type="text" value={tinh} disabled />
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={_huyen} alt="_huyen" />
                <span>Huyện:</span>
              </Label>
              <Input type="text" value={huyen} disabled />
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={loai} alt="loai" />
                <span>Loại sản phẩm:</span>
              </Label>
              <TextArea
                rows="4"
                value={dsLoaiSp.map((lsp) => lsp.ten).join(", ")}
                disabled
              />
              {/* {dsLoaiSp && dsLoaiSp.length ? (
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
              )} */}
              {selectedLoaiSP.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
            </FormGroup>
          </FormContent>
        </Form>
      </Content>
    </Container>
  );
};

export default LangngheChinhsua;
