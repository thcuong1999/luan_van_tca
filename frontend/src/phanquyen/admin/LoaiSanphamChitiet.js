import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiLoaiSanpham from "../../axios/apiLoaiSanpham";
import ma from "../../assets/icons/ma.png";
import ten from "../../assets/icons/ten.png";
import mota from "../../assets/icons/mota.png";
import {
  Container,
  Content,
  Form,
  FormContent,
  FormGroup,
  FormTitle,
  Input,
  Label,
  TextArea,
} from "./styledComponents";

const LoaiSanphamChitiet = (props) => {
  const [loaiSanpham, setLoaiSanpham] = useState(null);
  const { id: loaiSanphamId } = props.match.params;
  const [loading, setLoading] = useState(false);

  const fetchSingleSanpham = async () => {
    setLoading(true);
    const { loaiSanpham } = await apiLoaiSanpham.singleLoaiSanpham(
      loaiSanphamId
    );
    setLoaiSanpham(loaiSanpham);
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
            <button
              className="btn btn-primary px-3"
              onClick={() =>
                props.history.push(
                  `/admin/loaisanpham/chinhsua/${loaiSanphamId}`
                )
              }
            >
              Chỉnh sửa
            </button>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle></FormTitle>
              <FormTitle>
                <span>Chi tiết loại sản phẩm</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={ma} alt="ma" />
                  <span>Mã loại:</span>
                </Label>
                <Input type="text" value={loaiSanpham?.ma} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={ten} alt="ten" />
                  <span>Tên loại:</span>
                </Label>
                <Input type="text" value={loaiSanpham?.ten} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={mota} alt="ten" />
                  <span>Mô tả:</span>
                </Label>
                <TextArea rows="4" value={loaiSanpham?.mota} disabled />
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default LoaiSanphamChitiet;
