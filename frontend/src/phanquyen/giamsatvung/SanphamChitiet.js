import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiSanpham from "../../axios/apiSanpham";
import styled from "styled-components";
import Header from "../../components/Header";
import MaterialCard from "./MaterialCard";
import img_placeholder from "../../assets/images/img_placeholder.png";
import { formatMoney } from "../../utils";
import overall from "../../assets/icons/overall.png";
import congcu from "../../assets/icons/congcu.png";
import vt from "../../assets/icons/vattu.png";
import nglieu from "../../assets/icons/nglieu.png";
import _loai from "../../assets/icons/loai.png";
import anh from "../../assets/icons/anh.png";
import tt from "../../assets/icons/thuoctinh.png";
import _gia from "../../assets/icons/gia.png";

const SanphamChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [sanpham, setSanpham] = useState(null);
  const { id: sanphamId } = props.match.params;

  const fetchSanpham = async () => {
    setLoading(true);
    const { sanpham } = await apiSanpham.singleSanpham(sanphamId);
    setSanpham(sanpham);
    setLoading(false);
  };

  useEffect(() => {
    fetchSanpham();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại trang danh sách sản phẩm"
          titleBack
          onClick={() => props.history.push("/giamsatvung/sanpham")}
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
                      value={sanpham?.ma}
                      style={{ width: "50%" }}
                      disabled
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Tên sản phẩm:</Label>
                    <Input type="text" value={sanpham?.ten} disabled />
                  </FormGroup>

                  <FormGroup>
                    <Label>Mô tả sản phẩm:</Label>
                    <TextArea value={sanpham?.mota} rows="4" disabled />
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <img src={congcu} alt="congcu" />
                  <h5>Công cụ</h5>
                </BoxTitle>
                <BoxContent>
                  {sanpham?.dscongcu.map((item, index) => (
                    <MaterialCard style={{ marginTop: 16 }}>
                      <CardTitle>{`${index + 1}. ${
                        item?.congcu.ten
                      }`}</CardTitle>
                      <InputSection>
                        <span>Số lượng:</span>
                        <input type="text" value={item?.soluong} disabled />
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
                  {sanpham?.dsvattu.map((item, index) => (
                    <MaterialCard style={{ marginTop: 16 }}>
                      <CardTitle>{`${index + 1}. ${
                        item?.vattu.ten
                      }`}</CardTitle>
                      <InputSection>
                        <span>Số lượng:</span>
                        <input type="text" value={item?.soluong} disabled />
                      </InputSection>
                    </MaterialCard>
                  ))}
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <img src={nglieu} alt="nglieu" />
                  <h5>Nguyên liệu</h5>
                </BoxTitle>
                <BoxContent>
                  {sanpham?.dsnguyenlieu.map((item, index) => (
                    <MaterialCard style={{ marginTop: 16 }}>
                      <CardTitle>{`${index + 1}. ${
                        item?.nguyenlieu.ten
                      }`}</CardTitle>
                      <InputSection>
                        <span>Số lượng:</span>
                        <input type="text" value={item?.khoiluong} disabled />
                      </InputSection>
                      <span>kg</span>
                    </MaterialCard>
                  ))}
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
                      value={sanpham?.loaisanpham.ten}
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
                  <FormGroup className="d-flex justify-content-center">
                    <Image
                      src={
                        sanpham?.hinhanh
                          ? `/uploads/${sanpham?.hinhanh}`
                          : img_placeholder
                      }
                      alt="anhsanpham"
                      className={!sanpham?.hinhanh && "noImage"}
                    />
                  </FormGroup>
                </BoxContent>
              </Box>

              <Box>
                <BoxTitle>
                  <img src={tt} alt="tt" />
                  <h5>Thuộc tính</h5>
                </BoxTitle>
                <BoxContent>
                  {sanpham?.thuoctinh && !sanpham?.thuoctinh.length && (
                    <div>Không có</div>
                  )}

                  {sanpham?.thuoctinh &&
                    sanpham?.thuoctinh.map((item, key) => {
                      return (
                        <div className="row">
                          <div className="col-lg-6">
                            <FormGroup style={{ marginBottom: 10 }}>
                              <Input type="text" value={item.ten} disabled />
                            </FormGroup>
                          </div>
                          <div className="col-lg-6">
                            <div className="d-flex align-items-center">
                              <Input type="text" value={item.giatri} disabled />
                            </div>
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
                      value={`${formatMoney(sanpham?.gia)} vnđ`}
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
`;
const Image = styled.img`
  width: 200px;
  &.noImage {
    opacity: 0.15;
  }
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
    font-size: 14px;
    border-radius: 3px;
    &:focus {
      border: 1px solid blue;
    }
  }
`;

export default SanphamChitiet;
