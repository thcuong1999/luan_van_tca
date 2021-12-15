import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import _ten from "../../assets/icons/ten.png";
import _mota from "../../assets/icons/mota.png";
import anh from "../../assets/icons/anh.png";
import tt from "../../assets/icons/thuoctinh.png";
import cd from "../../assets/icons/congdung.png";
import Header from "../../components/Header";
import apiNguyenlieu from "../../axios/apiNguyenlieu";
import { toast } from "react-toastify";
import {
  Container,
  Content,
  CrossButton,
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
import UploadButton from "../../components/UploadButton";
import img_placeholder from "../../assets/images/img_placeholder.png";

const NguyenlieuChinhsua = (props) => {
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  const [loading, setLoading] = useState(false);
  const [nguyenlieu, setNguyenlieu] = useState(null);
  const { id: nguyenlieuId } = props.match.params;
  const [imgToDisplay, setImgToDisplay] = useState(null);

  const fetchSingleNguyenlieu = async () => {
    setLoading(true);
    const { nguyenlieu } = await apiNguyenlieu.singleNguyenlieu(nguyenlieuId);
    setNguyenlieu(nguyenlieu);
    setThuoctinh(
      nguyenlieu.thuoctinh.length ? nguyenlieu.thuoctinh : thuoctinh
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleNguyenlieu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("ten", nguyenlieu.ten);
    formData.append("mota", nguyenlieu.mota);
    formData.append("hinhanh", nguyenlieu.hinhanh);
    formData.append("congdung", nguyenlieu.congdung);
    formData.append("thuoctinh", JSON.stringify(getThuocTinh()));
    formData.append("nguyenlieuId", nguyenlieuId);

    const { success } = await apiNguyenlieu.suaNguyenlieu(
      nguyenlieuId,
      formData
    );
    if (success) {
      toast.success("Cập nhật thành công!", { theme: "colored" });
      props.history.push("/admin/nguyenlieu");
    }
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

  // general handlechange
  const handleChange = (e) => {
    setNguyenlieu({
      ...nguyenlieu,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <BackdropMaterial />;
  }

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
              <FormTitle></FormTitle>
              <FormTitle>
                <span>Cập nhật nguyên liệu</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={_ten} alt="ten" />
                  <span>Tên nguyên liệu:</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Nhập tên nguyên liệu"
                  value={nguyenlieu?.ten}
                  name="ten"
                  onChange={handleChange}
                />
                {/* {!ten && <ErrMsg>{errMsg}</ErrMsg>} */}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={_mota} alt="mota" />
                  <span>Mô tả:</span>
                </Label>
                <TextArea
                  value={nguyenlieu?.mota}
                  name="mota"
                  onChange={handleChange}
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
                  onChange={(e) => {
                    setNguyenlieu({
                      ...nguyenlieu,
                      hinhanh: e.target.files[0],
                    });
                    if (e.target.files.length !== 0) {
                      setImgToDisplay(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
                <ImageToDisplay>
                  <img
                    src={
                      imgToDisplay
                        ? imgToDisplay
                        : nguyenlieu?.hinhanh
                        ? `/uploads/${nguyenlieu?.hinhanh}`
                        : img_placeholder
                    }
                    alt="nguyenlieuImg"
                    className={!nguyenlieu?.hinhanh && "noImage"}
                  />
                </ImageToDisplay>
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={cd} alt="cd" />
                  <span>Công dụng:</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Nhập công dụng"
                  value={nguyenlieu?.congdung}
                  name="congdung"
                  onChange={handleChange}
                />
                {/* {!ten && <ErrMsg>{errMsg}</ErrMsg>} */}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={tt} alt="tt" />
                  <span>Thuộc tính:</span>
                </Label>
                {thuoctinh.map((item, key) => {
                  return (
                    <div className="row">
                      <div className="col-lg-6">
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
                      <div className="col-lg-6">
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

export default NguyenlieuChinhsua;
