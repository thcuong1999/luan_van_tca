import React, { useState } from "react";
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
import them from "../../assets/icons/them.png";

const LoaiSanphamThem = (props) => {
  const [spLangnghe, setSpLangnghe] = useState({
    ma: "",
    ten: "",
    mota: "",
  });
  const [errMsg, setErrMsg] = useState("");

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
      const { success } = await apiLoaiSanpham.themLoaiSanpham(spLangnghe);
      if (success) {
        toast.success("Thêm thành công!", { theme: "colored" });
        resetFields();
        setErrMsg("");
      }
    }
  };

  const resetFields = () => {
    setSpLangnghe({
      ma: "",
      ten: "",
      mota: "",
    });
  };

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
                  onChange={handleChange}
                />
                {!spLangnghe.ma && <ErrMsg>{errMsg}</ErrMsg>}
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
