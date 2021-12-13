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

const ModalChitietCongcu = ({ open, onClose, congcu }) => {
  return (
    <div id="#modalChitietCongcu">
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ border: "none" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {congcu?.ten}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="row">
              <div className="col-lg-6">
                <div className="mb-4">
                  <InputText
                    label="Tên"
                    value={congcu?.ten}
                    disabled={!congcu?.ten}
                  />
                </div>

                <div className="mb-4">
                  <InputText
                    multiline
                    rows={4}
                    label="Mô tả"
                    value={congcu?.mota}
                    disabled={!congcu?.mota}
                  />
                </div>

                <Image
                  src={
                    congcu?.hinhanh
                      ? `/uploads/${congcu?.hinhanh}`
                      : img_placeholder
                  }
                  alt="anhcongcu"
                  className={!congcu?.hinhanh && "noImage"}
                />
              </div>
              <div className="col-lg-6">
                <div className="mb-4">
                  <InputText
                    label="Công dụng"
                    value={congcu?.congdung}
                    disabled={!congcu?.congdung}
                  />
                </div>

                <div className="mb-4">
                  <h6>Thuộc tính</h6>
                  {congcu && congcu.thuoctinh.length
                    ? congcu.thuoctinh.map((item) => (
                        <div className="row">
                          <div className="col-5 pr-0">
                            <StyledInput type="text" value="chieu cao" />
                          </div>
                          <div className="col-7">
                            <StyledInput type="text" value="9m" />
                          </div>
                        </div>
                      ))
                    : "-------"}
                </div>
              </div>
            </div>
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

export default ModalChitietCongcu;
