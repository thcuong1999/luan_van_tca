import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import apiBophankd from "../../axios/apiBophankd";
import BackdropMaterial from "../../components/BackdropMaterial";
import DialogMaterial from "../../components/DialogMaterial";
import { toast } from "react-toastify";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";
import taikhoan from "../../assets/icons/taikhoan.png";
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

const BophankdChitiet = (props) => {
  const [bophankd, setBophankd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { id: bophankdId } = props.match.params;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleXoaBophankd = async () => {
    const { success } = await apiBophankd.xoa1Bophankd(bophankdId);
    if (success) {
      toast.success("Xóa thành công!", { theme: "colored" });
      props.history.push("/admin/bophankd");
    }
  };

  const fetchBophankd = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.singleBophankd(bophankdId);
    setBophankd(bophankd);
    setLoading(false);
  };

  useEffect(() => {
    fetchBophankd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách bộ phận kinh doanh"
          titleBack
          onClick={() => props.history.push("/admin/bophankd")}
          headerRight={
            <>
              <button className="btn btn-danger px-3" onClick={handleOpen}>
                <span>Xóa</span>
                <i class="fas fa-trash-alt"></i>
              </button>

              <button
                className="btn btn-primary px-2 ml-3"
                onClick={() =>
                  props.history.push(`/admin/bophankd/chinhsua/${bophankdId}`)
                }
              >
                <span>Chỉnh sửa</span>
                <i class="fas fa-edit"></i>
              </button>
            </>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>
                <span>Chi tiết bộ phận kinh doanh</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={ten} alt="ten" />
                  <span>Tên bộ phận kinh doanh:</span>
                </Label>
                <Input type="text" name="ten" value={bophankd?.ten} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={taikhoan} alt="taikhoan" />
                  <span>Tên tài khoản:</span>
                </Label>
                <Input
                  type="text"
                  name="taikhoan"
                  value={bophankd?.user?.taikhoan}
                  disabled
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={sdt} alt="sdt" />
                  <span>Số điện thoại:</span>
                </Label>
                <Input type="text" name="sdt" value={bophankd?.sdt} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={email} alt="email" />
                  <span>E-mail:</span>
                </Label>
                <Input type="text" name="email" value={bophankd?.email} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={diachi} alt="diachi" />
                  <span>Địa chỉ:</span>
                </Label>
                <TextArea
                  value={`${bophankd?.xa}, ${bophankd?.huyen}, ${bophankd?.tinh}`}
                  rows="3"
                  disabled
                />
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Xóa bộ phận kinh doanh"
        content="Bạn chắc xóa bộ phận kinh doanh này chứ?"
        text1="Hủy"
        text2="Xóa"
        onClick1={handleClose}
        onClick2={handleXoaBophankd}
      />
    </>
  );
};

export default BophankdChitiet;
