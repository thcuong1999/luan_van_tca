import React, { useState, useEffect } from "react";
import apiCongcu from "../../axios/apiCongcu";
import Header from "../../components/Header";
import img_placeholder from "../../assets/images/img_placeholder.png";
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
import _ten from "../../assets/icons/ten.png";
import cd from "../../assets/icons/congdung.png";
import _mota from "../../assets/icons/mota.png";
import anh from "../../assets/icons/anh.png";
import tt from "../../assets/icons/thuoctinh.png";
import BackdropMaterial from "../../components/BackdropMaterial";
import styled from "styled-components";

const CongcuChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [congcu, setCongcu] = useState(null);
  const { id: congcuId } = props.match.params;

  const fetchCongcu = async () => {
    setLoading(true);
    const { congcu } = await apiCongcu.singleCongcu(congcuId);
    setCongcu(congcu);
    setLoading(false);
  };

  useEffect(() => {
    fetchCongcu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại trang danh sách công cụ"
          titleBack
          onClick={() => props.history.push("/giamsatvung/congcu")}
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>
                <span>Chi tiết công cụ</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={_ten} alt="ten" />
                  <span>Tên công cụ:</span>
                </Label>
                <Input type="text" value={congcu?.ten} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={_mota} alt="mota" />
                  <span>Mô tả công cụ:</span>
                </Label>
                <TextArea value={congcu?.mota} rows="4" disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={anh} alt="anh" />
                  <span>Hình ảnh:</span>
                </Label>
                <Image
                  src={
                    congcu?.hinhanh
                      ? `/uploads/${congcu?.hinhanh}`
                      : img_placeholder
                  }
                  alt="anhcongcu"
                  className={!congcu?.hinhanh && "noImage"}
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={cd} alt="congdung" />
                  <span>Công dụng:</span>
                </Label>
                <Input type="text" value={congcu?.congdung} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={tt} alt="tt" />
                  <span>Thuộc tính:</span>
                </Label>
                {congcu?.thuoctinh && !congcu?.thuoctinh.length && (
                  <div>Không có</div>
                )}
                {congcu?.thuoctinh &&
                  congcu?.thuoctinh.map((item) => (
                    <div className="row mt-3">
                      <div className="col-4">
                        <FormGroup style={{ marginBottom: 0 }}>
                          <Input type="text" value={item.ten} disabled />
                        </FormGroup>
                      </div>
                      <div className="col-8">
                        <Input type="text" value={item.giatri} disabled />
                      </div>
                    </div>
                  ))}
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>
    </>
  );
};

const Image = styled.img`
  width: 200px;
  &.noImage {
    opacity: 0.15;
  }
`;

export default CongcuChitiet;
