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
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ModalChitietBaocao = ({ open, onClose, baocao }) => {
  return (
    <div id="#modalChitietCongcu">
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ border: "none" }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ textAlign: "center" }}
          >
            Chi tiết báo cáo
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FormGroup>
              <Title>Tên báo cáo</Title>
              <StyledInput type="text" value={baocao?.ten} />
            </FormGroup>
            <FormGroup>
              <Title>Nội dung</Title>
              <TextArea type="text" rows="4" value={baocao?.noidung} />
            </FormGroup>
            <FormGroup>
              <Title>Hình ảnh</Title>
              <Image src={`/uploads/${baocao?.hinhanh}`} alt="hinhanhbaocao" />
            </FormGroup>
            <FormGroup>
              <Title>
                Thời gian: <span>{baocao?.thoigian}</span>
              </Title>
            </FormGroup>
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
const FormGroup = styled.div`
  margin-bottom: 16px;
`;
const Title = styled.div`
  font-size: 17px;
  margin-bottom: 6px;
  font-weight: 400;
`;
const StyledInput = styled.input`
  width: 100%;
  font-size: 15px;
  border: 1px solid #555;
  padding: 10px;
  border-radius: 3px;
  margin-bottom: 10px;
  outline: none;
`;
const TextArea = styled.textarea`
  width: 100%;
  font-size: 15px;
  border: 1px solid #555;
  padding: 10px;
  border-radius: 3px;
  margin-bottom: 10px;
  outline: none;
`;

export default ModalChitietBaocao;
