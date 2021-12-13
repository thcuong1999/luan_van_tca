import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputText from "./InputText";
import img_placeholder from "../assets/images/img_placeholder.png";
import styled from "styled-components";
import ButtonMaterial from "../components/ButtonMaterial";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 950,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ModalChitietHodan = ({ open, onClose, hodan }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ border: "none" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Chi tiết hộ dân
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Form>
              <div className="row">
                <div className="col-lg-6">
                  <FormGroup>
                    <InputText label="Tên hộ dân" value={hodan?.daidien} />
                  </FormGroup>

                  <FormGroup>
                    <InputText
                      label="Tên tài khoản"
                      value={hodan?.user.taikhoan}
                    />
                  </FormGroup>
                </div>
                <div className="col-lg-6">
                  <FormGroup>
                    <InputText
                      label="Số điện thoại"
                      name="sdt"
                      value={hodan?.sdt}
                    />
                  </FormGroup>

                  <FormGroup>
                    <InputText label="CMND" value={hodan?.cmnd} />
                  </FormGroup>

                  <FormGroup>
                    <InputText label="Năm sinh" value={hodan?.namsinh} />
                  </FormGroup>

                  <FormGroup>
                    <InputText
                      multiline
                      rows={4}
                      label="Địa chỉ"
                      value={hodan?.diachi}
                    />
                  </FormGroup>
                </div>
              </div>
            </Form>
          </Typography>
          <div className="text-right">
            <ButtonMaterial variant="outlined" onClick={onClose}>
              Đóng
            </ButtonMaterial>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

const Image = styled.img`
  width: 100px;

  &.noImage {
    opacity: 0.15;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  font-size: 15px;
  border: 1px solid #ccc;
  padding: 6px 10px;
  border-radius: 3px;
  margin-bottom: 10px;
  outline: none;
`;

const Form = styled.div`
  background: #fff;
  padding: 36px 0;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  span {
    font-size: 15px;
    color: #555;
    display: block;
    margin-bottom: 10px;
  }
`;

export default ModalChitietHodan;
