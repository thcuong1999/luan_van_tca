import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiSanpham from "../../axios/apiSanpham";
import styled from "styled-components";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import apiCongcu from "../../axios/apiCongcu";
import apiVattu from "../../axios/apiVattu";
import apiNguyenlieu from "../../axios/apiNguyenlieu";
import MaterialCard from "./MaterialCard";
import MultipleSelect from "../../components/MultipleSelect";
import overall from "../../assets/icons/overall.png";
import congcu from "../../assets/icons/congcu.png";
import vt from "../../assets/icons/vattu.png";
import nglieu from "../../assets/icons/nglieu.png";
import _loai from "../../assets/icons/loai.png";
import anh from "../../assets/icons/anh.png";
import tt from "../../assets/icons/thuoctinh.png";
import _gia from "../../assets/icons/gia.png";
import { formatMoney } from "../../utils";
import UploadButton from "../../components/UploadButton";
import img_placeholder from "../../assets/images/img_placeholder.png";
import { ImageToDisplay } from "./styledComponents";
import { links } from "./arrayOfLinks";

const SanphamChinhsua = (props) => {
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  const [hinhanh, setHinhAnh] = useState(null);
  const [imgToDisplay, setImgToDisplay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [dsCongcu, setDsCongcu] = useState([]);
  const [multipleCongcu, setMultipleCongcu] = useState([]);
  const [dsVattu, setDsVattu] = useState([]);
  const [multipleVattu, setMultipleVattu] = useState([]);
  const [selectedVattu, setSelectedVattu] = useState([]);
  const [dsNguyenlieu, setDsNguyenlieu] = useState([]);
  const [multipleNguyenlieu, setMultipleNguyenlieu] = useState([]);
  const [singleSanpham, setSingleSanpham] = useState(null);
  const { id: sanphamId } = props.match.params;

  const fetchData = async () => {
    setLoading(true);
    const { sanpham } = await apiSanpham.singleSanpham(sanphamId);
    const { congcu } = await apiCongcu.dsCongcu();
    const { vattu } = await apiVattu.dsVattu();
    const { nguyenlieu } = await apiNguyenlieu.dsNguyenlieu();
    setSingleSanpham(sanpham);
    setDsCongcu(congcu);
    setMultipleCongcu(
      sanpham.dscongcu.map((item) => ({
        congcu: item.congcu._id,
        soluong: item.soluong,
      }))
    );
    setDsVattu(vattu);
    setSelectedVattu(sanpham.dsvattu.map((item) => item.vattu._id));
    setMultipleVattu(
      sanpham.dsvattu.map((item) => ({
        vattu: item.vattu._id,
        soluong: item.soluong,
      }))
    );
    setDsNguyenlieu(nguyenlieu);

    setMultipleNguyenlieu(
      sanpham.dsnguyenlieu.map((item) => ({
        nguyenlieu: item.nguyenlieu._id,
        khoiluong: item.khoiluong,
        donvitinh: item.donvitinh,
      }))
    );
    setThuoctinh(sanpham.thuoctinh.length ? sanpham.thuoctinh : thuoctinh);
    setImgToDisplay(`/uploads/${sanpham.hinhanh}`);
    setLoading(false);
  };

  useEffect(() => {
    setSuccess(false);
    setLoading(false);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

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

  const emptyFields = () => {
    if (
      !singleSanpham.ten ||
      !multipleCongcu.length ||
      !multipleVattu.length ||
      !multipleNguyenlieu.length
    ) {
      setErrMsg("Thông tin không được để trống");
      return true;
    } else {
      setErrMsg("");
      return false;
    }
  };

  const submitForm = async () => {
    if (!emptyFields()) {
      const formData = new FormData();
      formData.append("ten", singleSanpham.ten);
      formData.append("mota", singleSanpham.mota);
      formData.append("hinhanh", hinhanh);
      formData.append("thuoctinh", JSON.stringify(getThuocTinh()));

      const { success } = await apiSanpham.suaSanpham(sanphamId, formData);
      if (success) {
        toast.success("Cập nhật thành công!", { theme: "colored" });
        props.history.push("/admin/sanpham");
      }
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

  // get ten congcu / vattu / nguyenlieu
  const getTenNgVatlieu = (ngvatlieuId, ngvatlieuArr) => {
    return ngvatlieuArr.find((item) => item._id === ngvatlieuId).ten;
  };

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại trang danh sách sản phẩm"
          titleBack
          onClick={() => props.history.push("/admin/sanpham")}
          headerRight={
            <button className="btn btn-primary px-3" onClick={submitForm}>
              Lưu
              <i class="fas fa-save"></i>
            </button>
          }
          arrOfLinks={links}
        />

        <Content>
          <div className="row">
            <div className="col-lg-8">
              <Box>
                <BoxTitle>
                  <img src={overall} alt="overall" />
                  <h5>Thông tin chung</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    <Label>Mã sản phẩm:</Label>
                    <Input
                      type="text"
                      placeholder="Nhập mã"
                      value={singleSanpham?.ma}
                      style={{ width: "50%" }}
                      disabled
                    />
                    {!singleSanpham?.ma && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Tên sản phẩm:</Label>
                    <Input
                      type="text"
                      placeholder="Nhập tên"
                      value={singleSanpham?.ten}
                      onChange={(e) =>
                        setSingleSanpham({
                          ...singleSanpham,
                          ten: e.target.value,
                        })
                      }
                    />
                    {!singleSanpham?.ten && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Mô tả sản phẩm:</Label>
                    <TextArea
                      value={singleSanpham?.mota}
                      onChange={(e) =>
                        setSingleSanpham({
                          ...singleSanpham,
                          mota: e.target.value,
                        })
                      }
                      rows="5"
                      placeholder="Nhập mô tả"
                    />
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <img src={congcu} alt="congcu" />
                  <h5>Công cụ</h5>
                </BoxTitle>
                <BoxContent>
                  {dsCongcu && dsCongcu.length ? (
                    <Input
                      type="text"
                      value={singleSanpham?.dscongcu
                        .map((cc) => cc.congcu.ten)
                        .join(", ")}
                      disabled
                    />
                  ) : (
                    <MultipleSelect label="Chọn công cụ" />
                  )}
                  {multipleCongcu.map((x, index) => (
                    <MaterialCard style={{ marginTop: 16 }}>
                      <CardTitle>{`${index + 1}. ${getTenNgVatlieu(
                        x.congcu,
                        dsCongcu
                      )}`}</CardTitle>
                      <InputSection>
                        <span>Số lượng:</span>
                        <input type="text" value={x.soluong} disabled />
                      </InputSection>
                    </MaterialCard>
                  ))}
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <img src={vt} alt="vt" />
                  <h5>Vật tư</h5>
                </BoxTitle>
                <BoxContent>
                  {dsVattu && dsVattu.length ? (
                    <Input
                      type="text"
                      value={singleSanpham?.dsvattu
                        .map((cc) => cc.vattu.ten)
                        .join(", ")}
                      disabled
                    />
                  ) : (
                    <MultipleSelect label="Chọn vật tư" />
                  )}
                  {multipleVattu.map((x, index) => (
                    <MaterialCard style={{ marginTop: 16 }}>
                      <CardTitle>{`${index + 1}. ${getTenNgVatlieu(
                        x.vattu,
                        dsVattu
                      )}`}</CardTitle>
                      <InputSection>
                        <span>Số lượng:</span>
                        <input type="text" value={x.soluong} disabled />
                      </InputSection>
                    </MaterialCard>
                  ))}
                  {selectedVattu.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <img src={nglieu} alt="nglieu" />
                  <h5>Nguyên liệu</h5>
                </BoxTitle>
                <BoxContent>
                  {dsNguyenlieu && dsNguyenlieu.length ? (
                    <Input
                      type="text"
                      value={singleSanpham?.dsnguyenlieu
                        .map((cc) => cc.nguyenlieu.ten)
                        .join(", ")}
                      disabled
                    />
                  ) : (
                    <MultipleSelect label="Chọn nguyên liệu" />
                  )}
                  {multipleNguyenlieu.map((x, index) => (
                    <MaterialCard style={{ marginTop: 16 }}>
                      <CardTitle>{`${index + 1}. ${getTenNgVatlieu(
                        x.nguyenlieu,
                        dsNguyenlieu
                      )}`}</CardTitle>
                      <InputSection>
                        <span>Khối lượng:</span>
                        <input type="text" value={x.khoiluong} disabled />
                      </InputSection>
                      <span>kg</span>
                    </MaterialCard>
                  ))}
                  {dsNguyenlieu.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
                </BoxContent>
              </Box>
            </div>

            <div className="col-lg-4">
              <Box>
                <BoxTitle>
                  <img src={_loai} alt="loai" />
                  <h5>Loại sản phẩm</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    <Input
                      type="text"
                      name="ten"
                      value={singleSanpham?.loaisanpham.ten}
                      disabled
                    />
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <img src={anh} alt="anh" />
                  <h5>Ảnh sản phẩm</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    <UploadButton
                      onChange={(e) => {
                        setHinhAnh(e.target.files[0]);
                        if (e.target.files.length !== 0) {
                          setImgToDisplay(
                            URL.createObjectURL(e.target.files[0])
                          );
                        }
                      }}
                    />
                    <ImageToDisplay className="text-center">
                      <img
                        src={
                          imgToDisplay
                            ? imgToDisplay
                            : singleSanpham?.hinhanh
                            ? `/uploads/${singleSanpham?.hinhanh}`
                            : img_placeholder
                        }
                        alt=""
                        className={
                          !singleSanpham?.hinhanh && !imgToDisplay && "noImage"
                        }
                      />
                    </ImageToDisplay>
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <img src={tt} alt="tt" />
                  <h5>Thuộc tính</h5>
                </BoxTitle>
                <BoxContent>
                  {thuoctinh &&
                    thuoctinh.length &&
                    thuoctinh.map((item, key) => {
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
                                <CrossButton
                                  onClick={() => handleRemoveClick(key)}
                                >
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
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <img src={_gia} alt="_gia" />
                  <h5>Giá sản phẩm</h5>
                </BoxTitle>
                <BoxContent>
                  <FormGroup>
                    <Input
                      type="text"
                      value={`${formatMoney(singleSanpham?.gia)} vnđ`}
                      disabled
                    />
                  </FormGroup>
                </BoxContent>
              </Box>
            </div>
          </div>
        </Content>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 125vh;
`;
const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 36px;
  font-family: "Poppins", sans-serif;
`;
const Box = styled.div`
  background: #fff;
  margin-bottom: 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 3px;
`;
const BoxTitle = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-family: "Montserrat", sans-serif;
  color: #333;
  display: flex;
  align-items: center;
  padding: 20px;
  img {
    width: 18px;
    margin-right: 8px;
    opacity: 0.7;
  }
  h5 {
    font-size: 15px;
    display: inline-block;
    margin-bottom: 0;
  }
`;
const BoxContent = styled.div`
  padding: 28px;
  .MuiPaper-root {
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
`;
const FormGroup = styled.div`
  margin-bottom: 26px;
  .MuiMenuItem-root {
    display: block;
  }
`;
const Label = styled.span`
  font-size: 15px;
  color: #555;
  display: block;
  margin-bottom: 10px;
`;
const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 13px 16px;
  outline: none;
  color: #333;
  border-radius: 3px;
  font-size: 15px;
  &:focus {
    border: 1px solid blue;
  }
  &::placeholder {
    font-size: 14px;
  }
`;
const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: 13px 16px;
  outline: none;
  color: #333;
  border-radius: 3px;
  font-size: 15px;
  &:focus {
    border: 1px solid blue;
  }
  &::placeholder {
    font-size: 14px;
  }
`;
const CrossButton = styled.button`
  border: none;
  margin-left: 10px;
  background: #fff;
  outline: none;
  i {
    font-size: 26px;
    color: rgba(0, 0, 0, 0.3);
  }
  &:active {
    outline: none;
  }
`;
const PlusButton = styled.button`
  margin-left: 8px;
  background: #fff;
  border: none;
  outline: none;
  i {
    font-size: 13px;
    color: #0088ff;
    width: 23px;
    height: 23px;
    line-height: 18px;
    border: 3px solid #0088ff;
    text-align: center;
    border-radius: 50%;
  }
  span {
    color: #0088ff;
    margin-left: 8px;
    font-size: 15px;
  }
  &:active {
    outline: none;
  }
`;
const ErrMsg = styled.span`
  display: block;
  font-size: 15px;
  color: red;
`;
const CardTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
`;
const InputSection = styled.div`
  display: inline-block;
  margin-top: 16px;
  margin-right: 18px;
  padding-left: 36px;
  span {
    font-size: 14px;
  }
  input {
    margin-left: 10px;
    width: 85px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.15);
    padding: 3px 10px;
    outline: none;
    color: #333;
    border-radius: 3px;
    font-size: 14px;
    &:focus {
      border: 1px solid blue;
    }
  }
`;

export default SanphamChinhsua;
