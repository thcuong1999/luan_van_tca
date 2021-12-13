import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import img_placeholder from "../../assets/images/img_placeholder.png";
import DialogMaterial from "../../components/DialogMaterial";
import apiVattu from "../../axios/apiVattu";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import _ten from "../../assets/icons/ten.png";
import _mota from "../../assets/icons/mota.png";
import anh from "../../assets/icons/anh.png";
import tt from "../../assets/icons/thuoctinh.png";
import cd from "../../assets/icons/congdung.png";
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

const VattuChitiet = (props) => {
  const [open, setOpen] = React.useState(false);
  const { id: vattuId } = props.match.params;
  const [loading, setLoading] = useState(false);
  const [vattu, setVattu] = useState({});

  const fetchVattuObj = async () => {
    setLoading(true);
    const { vattu } = await apiVattu.singleVattu(vattuId);
    setVattu(vattu);
    setLoading(false);
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    const { success } = await apiVattu.xoa1Vattu(vattuId);
    if (success) {
      toast.success("Xóa vật tư thành công!", { theme: "colored" });
      props.history.push("/admin/vattu");
    }
  };

  useEffect(() => {
    fetchVattuObj();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại trang danh sách vật tư"
          titleBack
          onClick={() => props.history.push("/daily1/vattu")}
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>
                <span>Chi tiết vật tư</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={_ten} alt="ten" />
                  <span>Tên vật tư:</span>
                </Label>
                <Input type="text" value={vattu?.ten} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={_mota} alt="mota" />
                  <span>Mô tả vật tư:</span>
                </Label>
                <TextArea value={vattu?.mota} rows="4" disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={anh} alt="anh" />
                  <span>Hình ảnh:</span>
                </Label>
                <h4>Image here</h4>
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={cd} alt="cd" />
                  <span>Công dụng:</span>
                </Label>
                <Input type="text" value={vattu?.congdung} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={tt} alt="tt" />
                  <span>Thuộc tính:</span>
                </Label>
                {vattu?.thuoctinh && !vattu?.thuoctinh.length && (
                  <div>Không có</div>
                )}
                {vattu?.thuoctinh &&
                  vattu?.thuoctinh.map((item) => (
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

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Xóa vật tư?"
        text2="Xóa"
        text1="Hủy"
        content=" Bạn chắc xóa vật tư này chứ ?"
        onClick2={handleDelete}
        onClick1={handleClose}
      />
    </>
  );
};

export default VattuChitiet;
