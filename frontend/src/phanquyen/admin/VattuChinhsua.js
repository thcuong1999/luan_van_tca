import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import Header from "../../components/Header";
import apiVattu from "../../axios/apiVattu";
import { toast } from "react-toastify";
import img_placeholder from "../../assets/images/img_placeholder.png";
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
import _ten from "../../assets/icons/ten.png";
import _mota from "../../assets/icons/mota.png";
import anh from "../../assets/icons/anh.png";
import tt from "../../assets/icons/thuoctinh.png";
import cd from "../../assets/icons/congdung.png";
import UploadButton from "../../components/UploadButton";

const VattuChinhsua = (props) => {
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  const [loading, setLoading] = useState(false);
  const [vattu, setVattu] = useState({});
  const { id: vattuId } = props.match.params;
  const [imgToDisplay, setImgToDisplay] = useState(null);

  const fetchVattu = async () => {
    setLoading(true);
    const { vattu } = await apiVattu.singleVattu(vattuId);
    setVattu(vattu);
    setThuoctinh(vattu.thuoctinh.length ? vattu.thuoctinh : thuoctinh);
    setLoading(false);
  };

  useEffect(() => {
    fetchVattu();
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
    formData.append("ten", vattu.ten);
    formData.append("mota", vattu.mota);
    formData.append("hinhanh", vattu.hinhanh);
    formData.append("congdung", vattu.congdung);
    formData.append("thuoctinh", JSON.stringify(getThuocTinh()));

    const { success } = await apiVattu.suaVattu(vattuId, formData);
    if (success) {
      toast.success("Cập nhật thành công!", { theme: "colored" });
      props.history.push("/admin/vattu");
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
    setVattu({
      ...vattu,
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
          title="Quay lại trang danh sách vật tư"
          titleBack
          onClick={() => props.history.push("/admin/vattu")}
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
                <span>Cập nhật vật tư</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={_ten} alt="ten" />
                  <span>Tên vật tư:</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Nhập tên vật tư"
                  value={vattu.ten}
                  name="ten"
                  onChange={handleChange}
                />
                {/* {!ten && <ErrMsg>{errMsg}</ErrMsg>} */}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={_mota} alt="mota" />
                  <span>Mô tả vật tư:</span>
                </Label>
                <TextArea
                  value={vattu.mota}
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
                    setVattu({
                      ...vattu,
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
                        : vattu?.hinhanh
                        ? `/uploads/${vattu?.hinhanh}`
                        : img_placeholder
                    }
                    alt="vattuImg"
                    className={!vattu?.hinhanh && "noImage"}
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
                  name="congdung"
                  value={vattu.congdung}
                  onChange={handleChange}
                />
                {/* {!congdung && <ErrMsg>{errMsg}</ErrMsg>} */}
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

export default VattuChinhsua;
