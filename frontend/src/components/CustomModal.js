import React, { useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { formatMoney } from "../utils";
import TableNguyenlieuDonhang from "../phanquyen/bophankd/tables/TableNguyenlieuDonhang";
import TableSanphamDonhangChitiet from "../phanquyen/giamsatvung/tables/TableSanphamDonhangChitiet";
import TableCongcuDonhang from "../phanquyen/giamsatvung/tables/TableCongcuDonhang";
import TableVattuDonhang from "../phanquyen/giamsatvung/tables/TableVattuDonhang";
import {
  BoxInfo,
  BoxInfoTitle,
  MaDonhang,
  TableSection,
  TableTitle,
  Total,
  TotalValue,
} from "../phanquyen/bophankd/styledComponents";
import dssanpham from "../assets/icons/dssanpham.png";
import dscongcu from "../assets/icons/dscongcu.png";
import dsvattu from "../assets/icons/dsvattu.png";
import dsnglieu from "../assets/icons/dsnglieu.png";
import ten from "../assets/icons/ten.png";
import sdt from "../assets/icons/sdt.png";
import email from "../assets/icons/email.png";
import cmnd from "../assets/icons/cmnd.png";
import diachi from "../assets/icons/diachi.png";

const CustomModal = ({ open, setOpen, phanquyen }) => {
  const { subdh, type } = phanquyen;
  const [value, setValue] = React.useState("1");
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: open ? 1 : 0,
    transform: open ? "translateY(0%)" : "translateY(-100%)",
    maxHeight: "80vh",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setOpen(false);
    }
  };

  useEffect(() => {
    setValue(subdh[0]?._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subdh]);

  return (
    <>
      {open ? (
        <Background ref={modalRef} onClick={closeModal}>
          <ModalContent>
            <animated.div style={animation}>
              <ModalCloseWrapper>
                <ModalCloseIcon onClick={() => setOpen((prev) => !prev)}>
                  <i class="fas fa-times"></i>
                </ModalCloseIcon>
              </ModalCloseWrapper>
              <ModalSection sách nguyên liệu>
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        {subdh.map((dh) => (
                          <Tab
                            label={
                              type === "daily1"
                                ? dh?.to.daily1.ten
                                : type === "daily2"
                                ? dh?.to.daily2.ten
                                : dh?.to.hodan.daidien
                            }
                            value={dh?._id}
                          />
                        ))}
                      </TabList>
                    </Box>
                    {subdh.map((dh) => (
                      <TabPanel value={dh._id}>
                        <div>
                          <MaDonhang>
                            <span>Mã đơn hàng:</span>
                            <span>{dh?.ma}</span>
                          </MaDonhang>

                          <div className="d-flex justify-content-center">
                            <BoxInfo className="mr-5">
                              <BoxInfoTitle>
                                {type === "daily1"
                                  ? "Giám sát vùng"
                                  : type === "daily2"
                                  ? "Đại lý cấp 1"
                                  : "Đại lý cấp 2"}
                              </BoxInfoTitle>

                              <table>
                                {type === "daily1" ? (
                                  <>
                                    <tr>
                                      <td>
                                        <img src={ten} alt="ten" />
                                        <span>Tên:</span>
                                      </td>
                                      <td>{dh?.from.giamsatvung.ten}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={sdt} alt="sdt" />
                                        <span>SĐT:</span>
                                      </td>
                                      <td>{dh?.from.giamsatvung.sdt}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={email} alt="email" />
                                        <span>Email:</span>
                                      </td>
                                      <td>{dh?.from.giamsatvung.email}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={cmnd} alt="cmnd" />
                                        <span>CMND:</span>
                                      </td>
                                      <td>{dh?.from.giamsatvung.cmnd}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={diachi} alt="diachi" />
                                        <span>Địa chỉ:</span>
                                      </td>
                                      <td>{`${dh?.from.giamsatvung.xa}, ${dh?.from.giamsatvung.huyen}, ${dh?.from.giamsatvung.tinh}`}</td>
                                    </tr>
                                  </>
                                ) : type === "daily2" ? (
                                  <>
                                    <tr>
                                      <td>
                                        <img src={ten} alt="ten" />
                                        <span>Tên:</span>
                                      </td>
                                      <td>{dh?.from.daily1.ten}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={sdt} alt="sdt" />
                                        <span>SĐT:</span>
                                      </td>
                                      <td>{dh?.from.daily1.sdt}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={email} alt="email" />
                                        <span>Email:</span>
                                      </td>
                                      <td>{dh?.from.daily1.email}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={diachi} alt="diachi" />
                                        <span>Địa chỉ:</span>
                                      </td>
                                      <td>{`${dh?.from.daily1.xa}, ${dh?.from.daily1.huyen}, ${dh?.from.daily1.tinh}`}</td>
                                    </tr>
                                  </>
                                ) : (
                                  <>
                                    <tr>
                                      <td>
                                        <img src={ten} alt="ten" />
                                        <span>Tên:</span>
                                      </td>
                                      <td>{dh?.from.daily2.ten}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={sdt} alt="sdt" />
                                        <span>SĐT:</span>
                                      </td>
                                      <td>{dh?.from.daily2.sdt}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={email} alt="email" />
                                        <span>Email:</span>
                                      </td>
                                      <td>{dh?.from.daily2.email}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={diachi} alt="diachi" />
                                        <span>Địa chỉ:</span>
                                      </td>
                                      <td>{`${dh?.from.daily2.xa}, ${dh?.from.daily2.huyen}, ${dh?.from.daily2.tinh}`}</td>
                                    </tr>
                                  </>
                                )}
                              </table>
                            </BoxInfo>

                            <BoxInfo className="ml-5">
                              <BoxInfoTitle>
                                {type === "daily1"
                                  ? "Đại lý cấp 1"
                                  : type === "daily2"
                                  ? "Đại lý cấp 2"
                                  : "Hộ dân"}
                              </BoxInfoTitle>

                              <table>
                                {type === "daily1" ? (
                                  <>
                                    <tr>
                                      <td>
                                        <img src={ten} alt="ten" />
                                        <span>Tên:</span>
                                      </td>
                                      <td>{dh?.to.daily1.ten}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={sdt} alt="sdt" />
                                        <span>SĐT:</span>
                                      </td>
                                      <td>{dh?.to.daily1.sdt}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={email} alt="email" />
                                        <span>Email:</span>
                                      </td>
                                      <td>{dh?.to.daily1.email}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={diachi} alt="diachi" />
                                        <span>Địa chỉ:</span>
                                      </td>
                                      <td>{`${dh?.to.daily1.xa}, ${dh?.to.daily1.huyen}, ${dh?.to.daily1.tinh}`}</td>
                                    </tr>
                                  </>
                                ) : type === "daily2" ? (
                                  <>
                                    <tr>
                                      <td>
                                        <img src={ten} alt="ten" />
                                        <span>Tên:</span>
                                      </td>
                                      <td>{dh?.to.daily2.ten}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={sdt} alt="sdt" />
                                        <span>SĐT:</span>
                                      </td>
                                      <td>{dh?.to.daily2.sdt}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={email} alt="email" />
                                        <span>Email:</span>
                                      </td>
                                      <td>{dh?.to.daily2.email}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={diachi} alt="diachi" />
                                        <span>Địa chỉ:</span>
                                      </td>
                                      <td>{`${dh?.to.daily2.xa}, ${dh?.to.daily2.huyen}, ${dh?.to.daily2.tinh}`}</td>
                                    </tr>
                                  </>
                                ) : (
                                  <>
                                    <tr>
                                      <td>
                                        <img src={ten} alt="ten" />
                                        <span>Tên:</span>
                                      </td>
                                      <td>{dh?.to.hodan.daidien}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={sdt} alt="sdt" />
                                        <span>SĐT:</span>
                                      </td>
                                      <td>{dh?.to.hodan.sdt}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={cmnd} alt="cmnd" />
                                        <span>CMND:</span>
                                      </td>
                                      <td>{dh?.to.hodan.cmnd}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <img src={diachi} alt="diachi" />
                                        <span>Địa chỉ:</span>
                                      </td>
                                      <td>{`${dh?.to.hodan.xa}, ${dh?.to.hodan.huyen}, ${dh?.to.hodan.tinh}`}</td>
                                    </tr>
                                  </>
                                )}
                              </table>
                            </BoxInfo>
                          </div>
                        </div>

                        <TableSection className="noCheckbox">
                          <TableTitle>
                            <img src={dssanpham} alt="dssanpham" />
                            <span>Danh sách sản phẩm</span>
                          </TableTitle>
                          <TableSanphamDonhangChitiet
                            dsSanpham={dh?.dssanpham.map((sp) => ({
                              ...sp.sanpham,
                              ...sp,
                            }))}
                          />
                          <div className="text-right mb-5">
                            <Total>Tổng đơn giá: </Total>
                            <TotalValue>
                              {formatMoney(dh?.tongdongia)} vnđ
                            </TotalValue>
                          </div>
                        </TableSection>

                        <TableSection className="noCheckbox">
                          <TableTitle>
                            <img src={dscongcu} alt="dscongcu" />
                            <span>Danh sách công cụ</span>
                          </TableTitle>
                          <TableCongcuDonhang
                            dsCongcu={dh?.dscongcu.map((cc) => ({
                              ...cc,
                              ...cc.congcu,
                            }))}
                          />
                          <div className="text-right mb-3">
                            <Total>Tổng số lượng: </Total>
                            <TotalValue>{dh?.tongcongcu}</TotalValue>
                          </div>
                        </TableSection>

                        <TableSection className="noCheckbox">
                          <TableTitle>
                            <img src={dsvattu} alt="dsvattu" />
                            <span>Danh sách vật tư</span>
                          </TableTitle>
                          <TableVattuDonhang
                            dsVattu={dh?.dsvattu.map((vt) => ({
                              ...vt,
                              ...vt.vattu,
                            }))}
                          />
                          <div className="text-right mb-3">
                            <Total>Tổng số lượng: </Total>
                            <TotalValue>{dh?.tongvattu}</TotalValue>
                          </div>
                        </TableSection>

                        <TableSection className="noCheckbox">
                          <TableTitle>
                            <img src={dsnglieu} alt="dsnglieu" />
                            <span>Danh sách nguyên liệu</span>
                          </TableTitle>
                          <TableNguyenlieuDonhang
                            dsNguyenlieu={dh?.dsnguyenlieu.map((ngl) => ({
                              ...ngl,
                              ...ngl.nguyenlieu,
                            }))}
                          />
                          <div className="text-right mb-3">
                            <Total>Tổng khối lượng: </Total>
                            <TotalValue>{dh?.tongnguyenlieu} kg</TotalValue>
                          </div>
                        </TableSection>
                      </TabPanel>
                    ))}
                  </TabContext>
                </Box>
              </ModalSection>
            </animated.div>
          </ModalContent>
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
const ModalContent = styled.div`
  background-color: #fff;
  width: 80%;
  height: 82%;
  border-radius: 4px;
  overflow-y: auto;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
`;
const ModalCloseWrapper = styled.div`
  text-align: right;
`;
const ModalCloseIcon = styled.div`
  display: inline-block;
  padding: 13px 24px;
  cursor: pointer;
  i {
    font-size: 28px;
    color: #666;
  }
`;
const ModalSection = styled.section`
  padding: 0 36px 36px 36px;
  .MuiButtonBase-root {
    outline: none;
  }
`;

export default CustomModal;