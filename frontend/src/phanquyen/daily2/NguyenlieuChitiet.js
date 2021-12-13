import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import img_placeholder from "../../assets/images/img_placeholder.png";
import DialogMaterial from "../../components/DialogMaterial";
import styled from "styled-components";
import Header from "../../components/Header";
import apiNguyenlieu from "../../axios/apiNguyenlieu";
import { toast } from "react-toastify";
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
import _mota from "../../assets/icons/mota.png";
import anh from "../../assets/icons/anh.png";
import tt from "../../assets/icons/thuoctinh.png";
import cd from "../../assets/icons/congdung.png";

const NguyenlieuChitiet = (props) => {
  const [open, setOpen] = React.useState(false);
  const { id: nguyenlieuId } = props.match.params;
  const [loading, setLoading] = useState(false);
  const [nguyenlieu, setNguyenlieu] = useState(null);

  const fetchSingleNguyenlieu = async () => {
    setLoading(true);
    const { nguyenlieu } = await apiNguyenlieu.singleNguyenlieu(nguyenlieuId);
    setNguyenlieu(nguyenlieu);
    setLoading(false);
  };

  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    const { success } = await apiNguyenlieu.xoa1Nglieu(nguyenlieuId);
    if (success) {
      toast.success("Xóa nguyên liệu thành công!", { theme: "colored" });
      props.history.push("/admin/nguyenlieu");
    }
  };

  useEffect(() => {
    fetchSingleNguyenlieu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại trang danh sách nguyên liệu"
          titleBack
          onClick={() => props.history.push("/daily2/nguyenlieu")}
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle></FormTitle>
              <FormTitle>
                <span>Chi tiết nguyên liệu</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={_ten} alt="ten" />
                  <span>Tên nguyên liệu:</span>
                </Label>
                <Input type="text" value={nguyenlieu?.ten} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={_mota} alt="mota" />
                  <span>Mô tả:</span>
                </Label>
                <TextArea value={nguyenlieu?.mota} rows="4" disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={anh} alt="anh" />
                  <span>Hình ảnh:</span>
                </Label>
                <Image
                  src={
                    nguyenlieu?.hinhanh
                      ? `/uploads/${nguyenlieu?.hinhanh}`
                      : img_placeholder
                  }
                  alt="anhcongcu"
                  className={!nguyenlieu?.hinhanh && "noImage"}
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={cd} alt="cd" />
                  <span>Công dụng:</span>
                </Label>
                <Input type="text" value={nguyenlieu?.congdung} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={tt} alt="tt" />
                  <span>Thuộc tính:</span>
                </Label>
                {nguyenlieu && nguyenlieu.thuoctinh.length
                  ? nguyenlieu.thuoctinh.map((item, key) => {
                      return (
                        <div className="row">
                          <div className="col-lg-6">
                            <FormGroup
                              style={{ width: "100%", marginBottom: 10 }}
                            >
                              <Input type="text" value={item.ten} disabled />
                            </FormGroup>
                          </div>
                          <div className="col-lg-6">
                            <div className="d-flex align-items-center">
                              <FormGroup
                                style={{ width: "100%", marginBottom: 10 }}
                              >
                                <Input
                                  type="text"
                                  value={item.giatri}
                                  disabled
                                />
                              </FormGroup>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : "Không có"}
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Xóa nguyên liệu"
        content="Bạn chắc xóa nguyên liệu này chứ?"
        text1="Hủy"
        text2="Xóa"
        onClick1={handleClose}
        onClick2={handleDelete}
      />
    </>
  );
};

const Image = styled.img`
  width: 100px;
  &.noImage {
    opacity: 0.15;
  }
`;

export default NguyenlieuChitiet;
