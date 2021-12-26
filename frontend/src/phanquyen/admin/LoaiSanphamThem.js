import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import apiLoaiSanpham from "../../axios/apiLoaiSanpham";
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
import ma from "../../assets/icons/ma.png";
import ten from "../../assets/icons/ten.png";
import mota from "../../assets/icons/mota.png";
import BackdropMaterial from "../../components/BackdropMaterial";

const LoaiSanphamThem = (props) => {
  const [spLangnghe, setSpLangnghe] = useState({
    ma: "",
    ten: "",
    mota: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [dsMaLSP, setDsMaLSP] = useState([]);
  const [maLSPErr, setMaLSPErr] = useState("");

  const handleChangeMaSP = (e) => {
    var format = /[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/;
    const val = e.target.value;
    setSpLangnghe({ ...spLangnghe, ma: val });
    // check white space
    if (val.indexOf(" ") >= 0) {
      setMaLSPErr("Mã không có khoảng trắng");
    } else if (dsMaLSP.includes(val.toLowerCase())) {
      // check maSP exist
      setMaLSPErr("Mã đã tồn tại");
    } else if (format.test(val)) {
      // check contains special chars
      setMaLSPErr("Mã không được chứa kí tự đặc biệt");
    } else {
      setMaLSPErr("");
    }
  };

  const validateFields = () => {
    if (maLSPErr) {
      return false;
    }
    if (!spLangnghe.ma) {
      setMaLSPErr("Thông tin không được để trống");
      return false;
    }
    if (spLangnghe.ma.length < 3) {
      setMaLSPErr("Mã có ít nhất 3 kí tự");
      return false;
    }
    if (!spLangnghe.ten) {
      setErrMsg("Thông tin không được để trống");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setSpLangnghe({
      ...spLangnghe,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { success } = await apiLoaiSanpham.themLoaiSanpham(spLangnghe);
    if (success) {
      toast.success("Thêm thành công!", { theme: "colored" });
      resetFields();
      setErrMsg("");
    }
  };

  console.log({ spLangnghe });

  const resetFields = () => {
    setSpLangnghe({
      ma: "",
      ten: "",
      mota: "",
    });
  };

  const fetchDsLoaiSP = async () => {
    setLoading(true);
    const { loaiSanpham } = await apiLoaiSanpham.dsLoaiSanpham();
    setDsMaLSP(loaiSanpham.map((lsp) => lsp.ma.toLowerCase()));
    setLoading(false);
  };

  useEffect(() => {
    fetchDsLoaiSP();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách loại sản phẩm"
          titleBack
          onClick={() => props.history.push("/admin/loaisanpham")}
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
                <span>Thêm loại sản phẩm</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={ma} alt="ma" />
                  <span>Mã loại:</span>
                </Label>
                <Input
                  placeholder="Nhập mã"
                  type="text"
                  name="ma"
                  value={spLangnghe.ma}
                  onChange={handleChangeMaSP}
                />
                {<ErrMsg>{maLSPErr}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={ten} alt="ten" />
                  <span>Tên loại:</span>
                </Label>
                <Input
                  placeholder="Nhập tên"
                  type="text"
                  name="ten"
                  value={spLangnghe.ten}
                  onChange={handleChange}
                />
                {!spLangnghe.ten && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={mota} alt="ten" />
                  <span>Mô tả:</span>
                </Label>
                <TextArea
                  placeholder="Nhập mô tả"
                  rows="4"
                  name="mota"
                  value={spLangnghe.mota}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default LoaiSanphamThem;
