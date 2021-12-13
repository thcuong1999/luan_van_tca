import React, { useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import {
  FormContent,
  FormTitle,
  TableSection,
} from "../phanquyen/bophankd/styledComponents";
import TableCongcu from "../phanquyen/bophankd/tables/TableCongcu";
import TableNguyenlieu from "../phanquyen/bophankd/tables/TableNguyenlieu";
import TableVattu from "../phanquyen/bophankd/tables/TableVattu";

const ModalHuloi = ({
  type,
  open,
  setOpen,
  dsCongcuHuloi,
  setDsCongcuHuloi,
  dsVattuHuloi,
  setDsVattuHuloi,
  dsNguyenlieuHuloi,
  setDsNguyenlieuHuloi,
  onClick,
}) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: open ? 1 : 0,
    transform: open ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setOpen(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {open ? (
        <Background ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <ModalWrapper>
              <ModalCloseIcon onClick={() => setOpen((prev) => !prev)}>
                <i class="fas fa-times"></i>
              </ModalCloseIcon>

              <FormContent>
                <FormTitle>
                  {type === "congcu"
                    ? "Thêm công cụ hư lỗi"
                    : type === "vattu"
                    ? "Thêm vật tư hư lỗi"
                    : "Thêm nguyên liệu hư lỗi"}
                </FormTitle>
              </FormContent>

              <TableSection className="noCheckbox">
                {type === "congcu" ? (
                  <TableCongcu
                    dsCongcu={dsCongcuHuloi}
                    setDsCongcuHuloi={setDsCongcuHuloi}
                    congcuhuloithem
                  />
                ) : type === "vattu" ? (
                  <TableVattu
                    dsVattu={dsVattuHuloi}
                    setDsVattuHuloi={setDsVattuHuloi}
                    vattuhuloithem
                  />
                ) : (
                  <TableNguyenlieu
                    dsNguyenlieu={dsNguyenlieuHuloi}
                    setDsNguyenlieuHuloi={setDsNguyenlieuHuloi}
                    nguyenlieuhuloithem
                  />
                )}
              </TableSection>

              <Button className="btn btn-primary px-4" onClick={onClick}>
                Thêm
              </Button>
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

const Background = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalWrapper = styled.div`
  background-color: #fff;
  width: 1500px;
  height: 600px;
  padding: 36px 72px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 10;
  border-radius: 4px;
`;
const ModalCloseIcon = styled.div`
  position: absolute;
  right: 3px;
  top: 6px;
  display: inline-block;
  padding: 13px 24px;
  cursor: pointer;
  i {
    font-size: 28px;
    color: #666;
  }
`;
const Button = styled.div`
  position: absolute;
  bottom: 36px;
  right: 72px;
`;

export default ModalHuloi;
