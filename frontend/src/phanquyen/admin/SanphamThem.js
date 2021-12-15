import React, { useState, useEffect, useRef } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiSanpham from "../../axios/apiSanpham";
import styled from "styled-components";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import apiCongcu from "../../axios/apiCongcu";
import apiVattu from "../../axios/apiVattu";
import apiNguyenlieu from "../../axios/apiNguyenlieu";
import apiLoaiSanpham from "../../axios/apiLoaiSanpham";
import MaterialCard from "./MaterialCard";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import MenuItem from "@mui/material/MenuItem";
import MultipleSelect from "../../components/MultipleSelect";
import overall from "../../assets/icons/overall.png";
import congcu from "../../assets/icons/congcu.png";
import vt from "../../assets/icons/vattu.png";
import nglieu from "../../assets/icons/nglieu.png";
import _loai from "../../assets/icons/loai.png";
import anh from "../../assets/icons/anh.png";
import tt from "../../assets/icons/thuoctinh.png";
import _gia from "../../assets/icons/gia.png";
import UploadButton from "../../components/UploadButton";
import { ImageToDisplay } from "./styledComponents";

const SanphamThem = (props) => {
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  const [ma, setMa] = useState("");
  const [ten, setTen] = useState("");
  const [mota, setMota] = useState("");
  const [hinhanh, setHinhAnh] = useState(null);
  const [imgToDisplay, setImgToDisplay] = useState(null);
  const [loai, setLoai] = useState(null);
  const [dsloai, setDsloai] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [dsCongcu, setDsCongcu] = useState([]);
  const [selectedCongcu, setSelectedCongcu] = useState([]);
  const [multipleCongcu, setMultipleCongcu] = useState([]);
  const [dsVattu, setDsVattu] = useState([]);
  const [multipleVattu, setMultipleVattu] = useState([]);
  const [selectedVattu, setSelectedVattu] = useState([]);
  const [dsNguyenlieu, setDsNguyenlieu] = useState([]);
  const [multipleNguyenlieu, setMultipleNguyenlieu] = useState([]);
  const [selectedNguyenlieu, setSelectedNguyenlieu] = useState([]);
  const [gia, setGia] = useState("");
  const [dsMaSP, setDsMaSP] = useState([]);
  const [maSPErr, setMaSPErr] = useState("");
  const ref = useRef();

  const handleChangeMaSP = (e) => {
    var format = /[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/;
    const val = e.target.value;
    setMa(val);
    // check white space
    if (val.indexOf(" ") >= 0) {
      setMaSPErr("Mã không có khoảng trắng");
    } else if (dsMaSP.includes(val.toLowerCase())) {
      // check maSP exist
      setMaSPErr("Mã đã tồn tại");
    } else if (format.test(val)) {
      // check contains special chars
      setMaSPErr("Mã không được chứa kí tự đặc biệt");
    } else {
      setMaSPErr("");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const { loaiSanpham } = await apiLoaiSanpham.dsLoaiSanpham();
    const { congcu } = await apiCongcu.dsCongcu();
    const { vattu } = await apiVattu.dsVattu();
    const { nguyenlieu } = await apiNguyenlieu.dsNguyenlieu();
    const { sanpham } = await apiSanpham.dsSanpham();
    setDsMaSP(sanpham.map((sp) => sp.ma.toLowerCase()));
    setDsloai(loaiSanpham);
    setDsCongcu(congcu);
    setDsVattu(vattu);
    setDsNguyenlieu(nguyenlieu);
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

  const validateFields = () => {
    if (maSPErr) {
      return false;
    }
    if (!ma) {
      setMaSPErr("Thông tin không được để trống");
      return false;
    }
    if (ma.length < 3) {
      setMaSPErr("Mã có ít nhất 3 kí tự");
      return false;
    }
    if (
      !ma ||
      !ten ||
      !multipleCongcu.length ||
      !multipleVattu.length ||
      !multipleNguyenlieu.length ||
      !loai ||
      !gia
    ) {
      setErrMsg("Thông tin không được để trống");
      return false;
    } else {
      setErrMsg("");
      return true;
    }
  };

  const submitForm = async () => {
    if (validateFields()) {
      const formData = new FormData();
      formData.append("ma", ma);
      formData.append("ten", ten);
      formData.append("mota", mota);
      formData.append("hinhanh", hinhanh);
      formData.append("loaisanpham", loai);
      formData.append("thuoctinh", JSON.stringify(getThuocTinh()));
      formData.append("dscongcu", JSON.stringify(multipleCongcu));
      formData.append("dsvattu", JSON.stringify(multipleVattu));
      formData.append("dsnguyenlieu", JSON.stringify(multipleNguyenlieu));
      formData.append("gia", gia);

      const { success } = await apiSanpham.themSanpham(formData);
      if (success) {
        toast.success("Thêm thành công!", { theme: "colored" });
        resetFields();
        setErrMsg("");
      }
    }
  };

  // reset fields
  const resetFields = () => {
    setMa("");
    setTen("");
    setMota("");
    setSelectedCongcu([]);
    setMultipleCongcu([]);
  setSelectedVattu([]);
    setMultipleVattu([]);
    setSelectedNguyenlieu([]);
    setMultipleNguyenlieu([]);
    setLoai(null);
    setHinhAnh(null);
    setImgToDisplay(null);
    setThuoctinh([{ ten: "", giatri: "" }]);
    setGia("");
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

  // handle select cong cu
  const handleSelectCongcu = (e) => {
    const {
      target: { value },
    } = e;
    setSelectedCongcu(typeof value === "string" ? value.split(",") : value);
    setMultipleCongcu((prev) => {
      let temp = prev.map((item) => item.congcu);
      let arr = [];
      for (let x of value) {
        if (temp.includes(x)) {
          arr.push(prev.find((y) => y.congcu === x));
        } else {
          arr.push({ congcu: x, soluong: 1 });
        }
      }
      return arr;
    });
    console.log({ value });
  };

  // handle select vattu
  const handleSelectVattu = (e) => {
    const {
      target: { value },
    } = e;
    setSelectedVattu(typeof value === "string" ? value.split(",") : value);
    setMultipleVattu((prev) => {
      let temp = prev.map((item) => item.vattu);
      let arr = [];
      for (let x of value) {
        if (temp.includes(x)) {
          arr.push(prev.find((y) => y.vattu === x));
        } else {
          arr.push({ vattu: x, soluong: 1 });
        }
      }
      return arr;
    });
  };

  // handle select nglieu
  const handleSelectNguyenlieu = (e) => {
    const {
      target: { value },
    } = e;
    setSelectedNguyenlieu(typeof value === "string" ? value.split(",") : value);
    setMultipleNguyenlieu((prev) => {
      let temp = prev.map((item) => item.nguyenlieu);
      let arr = [];
      for (let x of value) {
        if (temp.includes(x)) {
          arr.push(prev.find((y) => y.nguyenlieu === x));
        } else {
          arr.push({ nguyenlieu: x, khoiluong: 1, donvitinh: "kg" });
        }
      }
      return arr;
    });
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
                      value={ma}
                      onChange={handleChangeMaSP}
                      style={{ width: "50%" }}
                    />
                    {<ErrMsg>{maSPErr}</ErrMsg>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Tên sản phẩm:</Label>
                    <Input
                      type="text"
                      placeholder="Nhập tên"
                      value={ten}
                      onChange={(e) => setTen(e.target.value)}
                    />
                    {!ten && <ErrMsg>{errMsg}</ErrMsg>}
                  </FormGroup>

                  <FormGroup>
                    <Label>Mô tả sản phẩm:</Label>
                    <TextArea
                      value={mota}
                      onChange={(e) => setMota(e.target.value)}
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
                    <MultipleSelect
                      label="Chọn công cụ"
                      value={selectedCongcu}
                      onChange={handleSelectCongcu}
                    >
                      {dsCongcu.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.ten}
                        </MenuItem>
                      ))}
                    </MultipleSelect>
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
                        <input
                          type="number"
                          min="1"
                          value={x.soluong}
                          onChange={(e) =>
                            setMultipleCongcu(
                              multipleCongcu.map((y) =>
                                y.congcu === x.congcu
                                  ? { ...y, soluong: e.target.value }
                                  : y
                              )
                            )
                          }
                        />
                      </InputSection>
                    </MaterialCard>
                  ))}
                  {selectedCongcu.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <img src={vt} alt="vt" />
                  <h5>Vật tư</h5>
                </BoxTitle>
                <BoxContent>
                  {dsVattu && dsVattu.length ? (
                    <MultipleSelect
                      label="Chọn vật tư"
                      value={selectedVattu}
                      onChange={handleSelectVattu}
                    >
                      {dsVattu.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.ten}
                        </MenuItem>
                      ))}
                    </MultipleSelect>
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
                        <input
                          type="number"
                          min="1"
                          value={x.soluong}
                          onChange={(e) =>
                            setMultipleVattu(
                              multipleVattu.map((y) =>
                                y.vattu === x.vattu
                                  ? { ...y, soluong: e.target.value }
                                  : y
                              )
                            )
                          }
                        />
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
                    <MultipleSelect
                      label="Chọn nguyên liệu"
                      value={selectedNguyenlieu}
                      onChange={handleSelectNguyenlieu}
                    >
                      {dsNguyenlieu.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.ten}
                        </MenuItem>
                      ))}
                    </MultipleSelect>
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
                        <input
                          type="number"
                          min="1"
                          value={x.khoiluong}
                          onChange={(e) =>
                            setMultipleNguyenlieu(
                              multipleNguyenlieu.map((y) =>
                                y.nguyenlieu === x.nguyenlieu
                                  ? { ...y, khoiluong: e.target.value }
                                  : y
                              )
                            )
                          }
                        />
                      </InputSection>
                      <span>kg</span>
                      {/* <InputSection>
                        <span>Đơn vị tính:</span>
                        <input
                          type="text"
                          style={{ width: 100 }}
                          value={x.donvitinh}
                          onChange={(e) =>
                            setMultipleNguyenlieu(
                              multipleNguyenlieu.map((y) =>
                                y.nguyenlieu === x.nguyenlieu
                                  ? { ...y, donvitinh: e.target.value }
                                  : y
                              )
                            )
                          }
                        />
                      </InputSection> */}
                    </MaterialCard>
                  ))}
                  {selectedNguyenlieu.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
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
                    {dsloai && dsloai.length ? (
                      <DropdownMaterial2
                        label="Chọn loại sản phẩm"
                        value={loai}
                        onChange={(e) => setLoai(e.target.value)}
                      >
                        {dsloai.map((item) => (
                          <MenuItem value={item._id}>{item.ten}</MenuItem>
                        ))}
                      </DropdownMaterial2>
                    ) : (
                      <DropdownMaterial2 label="Chọn loại sản phẩm" />
                    )}
                    {!loai && <ErrMsg>{errMsg}</ErrMsg>}
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
                      ref={ref}
                      onChange={(e) => {
                        setHinhAnh(e.target.files[0]);
                        if (e.target.files.length !== 0) {
                          setImgToDisplay(
                            URL.createObjectURL(e.target.files[0])
                          );
                        }
                      }}
                    />
                    {imgToDisplay && (
                      <ImageToDisplay className="text-center">
                        <img src={imgToDisplay} alt="congcuImg" />
                      </ImageToDisplay>
                    )}
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
                      type="number"
                      min="1"
                      placeholder="Nhập giá"
                      value={gia}
                      onChange={(e) => setGia(e.target.value)}
                    />
                    {!gia && <ErrMsg>{errMsg}</ErrMsg>}
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
  font-weight: 500;
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
  font-size: 15;
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
    font-size: 12px;
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
  font-size: 13px;
  color: red;
  margin-top: 3px;
`;
const Image = styled.img`
  width: 150px;
  display: block;
  margin-top: 16px;
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

export default SanphamThem;
