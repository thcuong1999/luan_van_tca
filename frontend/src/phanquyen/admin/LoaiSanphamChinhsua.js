import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import BackdropMaterial from "../../components/BackdropMaterial";
import { toast } from "react-toastify";
import apiLoaiSanpham from "../../axios/apiLoaiSanpham";
import ma from "../../assets/icons/ma.png";
import ten from "../../assets/icons/ten.png";
import mota from "../../assets/icons/mota.png";
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

const LoaiSanphamChinhsua = (props) => {
  const [spLangnghe, setSpLangnghe] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const { id: sanphamId } = props.match.params;
  const [loading, setLoading] = useState(false);

  const emptyFields = () => {
    if (!spLangnghe.ma || !spLangnghe.ten) {
      setErrMsg("Thông tin không được để trống");
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    setSpLangnghe({
      ...spLangnghe,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!emptyFields()) {
      const { success } = await apiLoaiSanpham.capnhat1LoaiSanpham(
        sanphamId,
        spLangnghe
      );
      if (success) {
        toast.success("Cập nhật thành công!", { theme: "colored" });
        props.history.push("/admin/loaisanpham");
      }
    }
  };

  const fetchSingleSanpham = async () => {
    setLoading(true);
    const { loaiSanpham } = await apiLoaiSanpham.singleLoaiSanpham(sanphamId);
    setSpLangnghe(loaiSanpham);
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleSanpham();
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
                <span>Cập nhật loại sản phẩm</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={ma} alt="ma" />
                  <span>Mã loại:</span>
                </Label>
                <Input type="text" value={spLangnghe?.ma} disabled />
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
                  value={spLangnghe?.ten}
                  onChange={handleChange}
                />
                {!spLangnghe?.ten && <ErrMsg>{errMsg}</ErrMsg>}
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
                  value={spLangnghe?.mota}
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

export default LoaiSanphamChinhsua;
