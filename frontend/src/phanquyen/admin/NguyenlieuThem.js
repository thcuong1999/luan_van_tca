import React, { useState, useRef } from "react";
import apiNguyenlieu from "../../axios/apiNguyenlieu";
import {
  Container,
  Content,
  CrossButton,
  ErrMsg,
  Form,
  FormContent,
  FormGroup,
  FormTitle,
  ImageToDisplay,
  Input,
  Label,
  PlusButton,
  TextArea,
} from "./styledComponents";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import _ten from "../../assets/icons/ten.png";
import _mota from "../../assets/icons/mota.png";
import anh from "../../assets/icons/anh.png";
import tt from "../../assets/icons/thuoctinh.png";
import cd from "../../assets/icons/congdung.png";
import UploadButton from "../../components/UploadButton";

const NguyenlieuThem = (props) => {
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  const [ten, setTen] = useState("");
  const [mota, setMota] = useState("");
  const [hinhanh, sethinhanh] = useState(null);
  const [imgToDisplay, setImgToDisplay] = useState(null);
  const [congdung, setCongdung] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const ref = useRef();

  const getThuocTinh = () => {
    if (
      thuoctinh.length === 1 &&
      thuoctinh[0].ten === "" &&
      thuoctinh[0].giatri === ""
    ) {
      return [];
    }
    return thuoctinh;
  };

  const emptyField = () => {
    if (!ten || !congdung) {
      setErrMsg("Thông tin không được để trống");
      return true;
    } else {
      setErrMsg("");
      return false;
    }
  };

  const submitForm = async () => {
    if (!emptyField()) {
      const formData = new FormData();
      formData.append("ten", ten);
      formData.append("mota", mota);
      formData.append("hinhanh", hinhanh);
      formData.append("congdung", congdung);
      formData.append("thuoctinh", JSON.stringify(getThuocTinh()));

      const { success } = await apiNguyenlieu.themNguyenlieu(formData);
      if (success) {
        toast.success("Thêm thành công!", { theme: "colored" });
        resetFields();
        setErrMsg("");
      }
    }
  };

  const resetFields = () => {
    setTen("");
    setMota("");
    setCongdung("");
    sethinhanh(null);
    setImgToDisplay(null);
    setThuoctinh([{ ten: "", giatri: "" }]);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...thuoctinh];
    list[index][name] = value;
    setThuoctinh(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...thuoctinh];
    list.splice(index, 1);
    setThuoctinh(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setThuoctinh([...thuoctinh, { ten: "", giatri: "" }]);
  };

  return (
    <>
      <Container>
        <Header
          title="Quay lại trang danh sách nguyên liệu"
          titleBack
          onClick={() => props.history.push("/admin/nguyenlieu")}
          headerRight={
            <button className="btn btn-primary px-3" onClick={submitForm}>
              Lưu
              <i class="fas fa-save"></i>
            </button>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>
                <span>Thêm nguyên liệu</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={_ten} alt="ten" />
                  <span>Tên nguyên liệu:</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Nhập tên"
                  value={ten}
                  onChange={(e) => setTen(e.target.value)}
                />
                {!ten && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={_mota} alt="mota" />
                  <span>Mô tả:</span>
                </Label>
                <TextArea
                  value={mota}
                  onChange={(e) => setMota(e.target.value)}
                  rows="4"
                  placeholder="Nhập mô tả"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={anh} alt="anh" />
                  <span>Chọn ảnh:</span>
                </Label>
                <UploadButton
                  ref={ref}
                  onChange={(e) => {
                    sethinhanh(e.target.files[0]);
                    if (e.target.files.length !== 0) {
                      setImgToDisplay(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
                {imgToDisplay && (
                  <ImageToDisplay>
                    <img src={imgToDisplay} alt="congcuImg" />
                  </ImageToDisplay>
                )}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={cd} alt="cd" />
                  <span>Công dụng:</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Nhập công dụng"
                  value={congdung}
                  onChange={(e) => setCongdung(e.target.value)}
                />
                {!congdung && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={tt} alt="tt" />
                  <span>Thuộc tính:</span>
                </Label>
                {thuoctinh.map((item, key) => {
                  return (
                    <div className="row">
                      <div className="col-lg-4">
                        <FormGroup style={{ marginBottom: 10 }}>
                          <Input
                            type="text"
                            name="ten"
                            value={item.ten}
                            onChange={(e) => handleInputChange(e, key)}
                            placeholder="Tên thuộc tính"
                          />
                        </FormGroup>
                      </div>
                      <div className="col-lg-8">
                        <div className="d-flex align-items-center">
                          <Input
                            type="text"
                            name="giatri"
                            value={item.giatri}
                            onChange={(e) => handleInputChange(e, key)}
                            placeholder="Giá trị"
                          />
                          {thuoctinh.length !== 1 && (
                            <CrossButton onClick={() => handleRemoveClick(key)}>
                              <i class="fas fa-times"></i>
                            </CrossButton>
                          )}
                        </div>
                      </div>

                      <div className="addElementBtn">
                        {thuoctinh.length - 1 === key && (
                          <PlusButton onClick={handleAddClick}>
                            <i class="fas fa-plus"></i>
                            <span>Thêm thuộc tính khác</span>
                          </PlusButton>
                        )}
                      </div>
                    </div>
                  );
                })}
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default NguyenlieuThem;
