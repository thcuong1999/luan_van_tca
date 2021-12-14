import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Content,
  DetailsInfo,
  DetailsInfoContent,
  DetailsInfoTexts,
  DetailsInfoTitle,
  Form,
  TableSection,
  TableTitle,
  TiendoDonhang,
  TiendoProcess,
  TiendoProcessText,
  Total,
  TotalValue,
} from "./styledComponents";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";
import loai from "../../assets/icons/loai.png";
import daily1 from "../../assets/icons/daily1_2.png";
import dssanpham from "../../assets/icons/dssanpham.png";
import dscongcu from "../../assets/icons/dscongcu.png";
import dsvattu from "../../assets/icons/dsvattu.png";
import dsnglieu from "../../assets/icons/dsnglieu.png";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import apiDonhang from "../../axios/apiDonhang";
import BackdropMaterial from "../../components/BackdropMaterial";
import TableSanphamDonhangChitiet from "./tables/TableSanphamDonhangChitiet";
import TableCongcuDonhang from "./tables/TableCongcuDonhang";
import TableVattuDonhang from "./tables/TableVattuDonhang";
import TableNguyenlieuDonhang from "./tables/TableNguyenlieuDonhang";
import apiDaily1 from "../../axios/apiDaily1";
import { formatMoney, getTableDataClass } from "../../utils";
import CustomModal from "../../components/CustomModal";
import { MaDonhang } from "../bophankd/styledComponents";
import apiDaily2 from "../../axios/apiDaily2";
import DialogMaterial from "../../components/DialogMaterial";

const Tiendo = (props) => {
  const [dsSubDonhang, setDsSubDonhang] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("1");
  const { userInfo } = useSelector((state) => state.user);
  const { id: donhangId } = props.match.params;
  const [open, setOpen] = useState(false);
  const [singleDonhang, setSingleDonhang] = useState(null);
  const [alertMsg, setAlertMsg] = useState("");
  const [dlOpen, setDlOpen] = useState(false);
  const [tiendoDonhang, setTiendoDonhang] = useState(null);
  const ref = useRef();
  const [selectedPQ, setSelectedPQ] = useState({
    dsDonhang: [],
    type: "",
    type2: "",
  });

  const emptyTableData = (dsDonhang, type) => {
    const typeName = type === "hodan" ? "Hộ dân" : "";
    if (!dsDonhang.length) {
      setAlertMsg(
        `Các ${typeName} trong nhánh chưa có đơn hàng ${singleDonhang?.ma}`
      );
      handleOpenDL();
      return true;
    }
    return false;
  };

  const handleClickTableData = (pqType) => {
    switch (pqType) {
      case "daily2TDHT":
        if (!emptyTableData(tiendoDonhang?.daily2DSDonhang, "daily2")) {
          setSelectedPQ({
            dsDonhang: tiendoDonhang?.daily2DSDonhang,
            type: "daily2Only",
            type2: "TDHT",
          });
          handleOpen();
        }
        break;
      case "hodanTTND":
        if (!emptyTableData(tiendoDonhang?.hodanDSDonhang, "hodan")) {
          setSelectedPQ({
            dsDonhang: tiendoDonhang?.hodanDSDonhang,
            type: "hodan",
            type2: "TTND",
          });
          handleOpen();
        }
        break;
      case "hodanTDHT":
        if (!emptyTableData(tiendoDonhang?.hodanDSDonhang, "hodan")) {
          setSelectedPQ({
            dsDonhang: tiendoDonhang?.hodanDSDonhang,
            type: "hodan",
            type2: "TDHT",
          });
          handleOpen();
        }
        break;

      default:
        return;
    }
  };

  const handleOpen = () => setOpen(true);

  const handleOpenDL = () => setDlOpen(true);
  const handleCloseDL = () => setDlOpen(false);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
    fetchTiendoDonhang(newValue);
    setSingleDonhang(dsSubDonhang.find((dh) => dh._id === newValue));
  };

  const fetchTiendoDonhang = async (donhangId) => {
    const donhang = dsSubDonhang.find((dh) => dh._id === donhangId);
    const daily2Id = donhang?.to.daily2._id;
    const data = await apiDaily2.tiendoDonhang(daily2Id, donhang?.ma);
    setTiendoDonhang(data);
  };

  const fetchSubDonhang = async () => {
    setLoading(true);
    const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    const { donhang } = await apiDonhang.singleDonhang(donhangId);
    if (!donhang.ngaydathang) {
      props.history.push(`/daily1/donhang/chitiet/${donhangId}`);
    }
    let { subdonhang } = await apiDaily1.dsSubDonhang(daily1._id, donhang.ma);
    const data = await apiDaily2.tiendoDonhang(
      subdonhang[0].to.daily2._id,
      donhang.ma
    );
    subdonhang = subdonhang.map((dh) => ({
      ...dh,
      dssanpham: dh.dssanpham.map((sp) => ({ ...sp.sanpham, ...sp })),
      dscongcu: dh.dscongcu.map((cc) => ({ ...cc.congcu, ...cc })),
      dsvattu: dh.dsvattu.map((vt) => ({ ...vt.vattu, ...vt })),
      dsnguyenlieu: dh.dsnguyenlieu.map((ngl) => ({
        ...ngl.nguyenlieu,
        ...ngl,
      })),
    }));
    setSingleDonhang(subdonhang[0]);
    setDsSubDonhang(subdonhang);
    setValue(subdonhang[0]?._id);
    ref.current = data;
    setTiendoDonhang(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSubDonhang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  console.log({ dsSubDonhang });

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách đơn hàng"
          titleBack
          onClick={() => props.history.push("/daily1/donhang")}
        />
        <Content>
          <Form>
            <TiendoProcess>
              <TiendoProcessText
                onClick={() =>
                  props.history.push(`/daily1/donhang/chitiet/${donhangId}`)
                }
              >
                <i class="fas fa-long-arrow-alt-left"></i>
                <span>Quay lại chi tiết đơn hàng</span>
              </TiendoProcessText>
            </TiendoProcess>

            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChangeTab}
                    aria-label="lab API tabs example"
                  >
                    {dsSubDonhang.map((dh) => (
                      <Tab label={dh?.to.daily2.ten} value={dh?._id} />
                    ))}
                  </TabList>
                </Box>
                {dsSubDonhang.map((dh) => (
                  <TabPanel value={dh._id}>
                    <>
                      <MaDonhang>
                        <span>Mã đơn hàng:</span>
                        <span>{dh?.ma}</span>
                      </MaDonhang>

                      <TiendoDonhang>
                        <table className="table">
                          <thead>
                            <tr>
                              <th colSpan="2">Đại lý cấp 2</th>
                              <th colSpan="2">Hộ dân</th>
                            </tr>
                            <tr>
                              <th>Tình trạng nhận đơn</th>
                              <th>Tình trạng tiến độ</th>
                              <th>Tình trạng nhận đơn</th>
                              <th>Tình trạng tiến độ</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td
                                className={
                                  tiendoDonhang && tiendoDonhang.daily2Nhandon
                                    ? "success"
                                    : tiendoDonhang &&
                                      !tiendoDonhang.daily2Nhandon
                                    ? "danger"
                                    : ref.current.daily2Nhandon
                                    ? "success"
                                    : "danger"
                                }
                              >
                                {tiendoDonhang &&
                                tiendoDonhang.daily2Nhandon ? (
                                  <i class="fas fa-check"></i>
                                ) : tiendoDonhang &&
                                  !tiendoDonhang.daily2Nhandon ? (
                                  <i class="fas fa-times"></i>
                                ) : ref.current.daily2Nhandon ? (
                                  <i class="fas fa-check"></i>
                                ) : (
                                  <i class="fas fa-times"></i>
                                )}
                              </td>
                              <td
                                onClick={() =>
                                  handleClickTableData("daily2TDHT")
                                }
                                className={getTableDataClass(
                                  tiendoDonhang
                                    ? tiendoDonhang.daily2TDHT
                                    : ref.current.daily2TDHT
                                )}
                              >{`${
                                tiendoDonhang
                                  ? tiendoDonhang.daily2TDHT
                                  : ref.current.daily2TDHT
                              } %`}</td>
                              <td
                                onClick={() =>
                                  handleClickTableData("hodanTTND")
                                }
                                className={getTableDataClass(
                                  tiendoDonhang
                                    ? tiendoDonhang.hodanTTND
                                    : ref.current.hodanTTND
                                )}
                              >{`${
                                tiendoDonhang
                                  ? tiendoDonhang.hodanTTND
                                  : ref.current.hodanTTND
                              } %`}</td>
                              <td
                                onClick={() =>
                                  handleClickTableData("hodanTDHT")
                                }
                                className={getTableDataClass(
                                  tiendoDonhang
                                    ? tiendoDonhang.hodanTDHT
                                    : ref.current.hodanTDHT
                                )}
                              >{`${
                                tiendoDonhang
                                  ? tiendoDonhang.hodanTDHT
                                  : ref.current.hodanTDHT
                              } %`}</td>
                            </tr>
                          </tbody>
                        </table>
                      </TiendoDonhang>

                      <DetailsInfo className="mb-5">
                        <DetailsInfoTitle>
                          {/* <img src={anh} alt="anh" /> */}
                          <h5>Thông tin đại lý</h5>
                        </DetailsInfoTitle>

                        <DetailsInfoContent>
                          <DetailsInfoTexts>
                            <table>
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
                                  <span>E-mail:</span>
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
                              <tr>
                                <td>
                                  <img src={loai} alt="loai" />
                                  <span>Loại sản phẩm:</span>
                                </td>
                                <td>
                                  {dh?.to.daily2.loaisanpham
                                    .map((lsp) => lsp.ten)
                                    .join(", ")}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <img src={daily1} alt="daily1" />
                                  <span>Thuộc đại lý cấp 1:</span>
                                </td>
                                <td>{`${dh?.to.daily2.daily1.ten}, ${dh?.to.daily2.daily1.xa}, ${dh?.to.daily2.daily1.huyen}, ${dh?.to.daily2.daily1.tinh}`}</td>
                              </tr>
                            </table>
                          </DetailsInfoTexts>
                        </DetailsInfoContent>
                      </DetailsInfo>
                    </>

                    <TableSection className="noCheckbox">
                      <TableTitle>
                        <img src={dssanpham} alt="dssanpham" />
                        <span>Danh sách sản phẩm</span>
                      </TableTitle>
                      <TableSanphamDonhangChitiet dsSanpham={dh?.dssanpham} />
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
                      <TableCongcuDonhang dsCongcu={dh?.dscongcu} />
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
                      <TableVattuDonhang dsVattu={dh?.dsvattu} />
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
                      <TableNguyenlieuDonhang dsNguyenlieu={dh?.dsnguyenlieu} />
                      <div className="text-right mb-3">
                        <Total>Tổng khối lượng: </Total>
                        <TotalValue>{dh?.tongnguyenlieu} kg</TotalValue>
                      </div>
                    </TableSection>
                  </TabPanel>
                ))}
              </TabContext>
            </Box>
          </Form>
        </Content>
      </Container>

      <CustomModal
        open={open}
        setOpen={setOpen}
        phanquyen={selectedPQ}
        singleDonhang={singleDonhang}
      />

      <DialogMaterial
        open={dlOpen}
        onClose={handleCloseDL}
        title="Chưa có đơn hàng"
        content={alertMsg}
        text2="OK"
        onClick2={handleCloseDL}
      />
    </>
  );
};

export default Tiendo;
