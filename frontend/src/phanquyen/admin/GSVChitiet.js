import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import apiGSV from "../../axios/apiGSV";
import BackdropMaterial from "../../components/BackdropMaterial";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";
import taikhoan from "../../assets/icons/taikhoan.png";
import them from "../../assets/icons/them.png";
import cmnd from "../../assets/icons/cmnd.png";
import chitiet from "../../assets/icons/chitiet.png";
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

const GSVChitiet = (props) => {
  const [gsv, setGsv] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id: gsvId } = props.match.params;

  const fetchSingleGSV = async () => {
    setLoading(true);
    const { gsv } = await apiGSV.singleGsv(gsvId);
    setGsv(gsv);
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleGSV();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách giám sát vùng"
          titleBack
          onClick={() => props.history.push("/admin/gsv")}
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>
                <span>Chi tiết giám sát vùng</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={ten} alt="ten" />
                  <span>Tên giám sát vùng:</span>
                </Label>
                <Input type="text" value={gsv?.ten} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={sdt} alt="sdt" />
                  <span>Số điện thoại:</span>
                </Label>
                <Input type="text" value={gsv?.sdt} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={cmnd} alt="cmnd" />
                  <span>Số chứng minh nhân dân:</span>
                </Label>
                <Input type="text" value={gsv?.cmnd} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={email} alt="email" />
                  <span>E-mail:</span>
                </Label>
                <Input type="text" value={gsv?.email} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={diachi} alt="diachi" />
                  <span>Địa chỉ:</span>
                </Label>
                <TextArea
                  rows="3"
                  value={`${gsv?.xa}, ${gsv?.huyen}. ${gsv?.tinh}`}
                  disabled
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={taikhoan} alt="taikhoan" />
                  <span>Tên tài khoản:</span>
                </Label>
                <Input type="text" value={gsv?.user.taikhoan} disabled />
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default GSVChitiet;
