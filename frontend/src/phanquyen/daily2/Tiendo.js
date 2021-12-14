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
import cmnd from "../../assets/icons/cmnd.png";
import diachi from "../../assets/icons/diachi.png";
import loai from "../../assets/icons/loai.png";
import langnghe from "../../assets/icons/langnghe_2.png";
import namsinh from "../../assets/icons/namsinh.png";
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
import apiDaily2 from "../../axios/apiDaily2";
import { formatMoney, getTableDataClass } from "../../utils";
import { MaDonhang } from "../bophankd/styledComponents";
import apiHodan from "../../axios/apiHodan";
import CustomModal from "../../components/CustomModal";

const Tiendo = (props) => {
  const [dsSubDonhang, setDsSubDonhang] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("1");
  const { userInfo } = useSelector((state) => state.user);
  const { id: donhangId } = props.match.params;
  const [open, setOpen] = useState(false);
  const [singleDonhang, setSingleDonhang] = useState(null);
  const [tiendoDonhang, setTiendoDonhang] = useState(null);
  const ref = useRef();
  const [selectedPQ, setSelectedPQ] = useState({
    dsDonhang: [],
    type: "",
    type2: "",
  });

  const handleClickTableData = (pqType) => {
    switch (pqType) {
      case "hodanTDHT":
        setSelectedPQ({
          dsDonhang: tiendoDonhang?.hodanDSDonhang,
          type: "hodanOnly",
          type2: "TDHT",
        });
        handleOpen();
        break;

      default:
        return;
    }
  };

  const handleOpen = () => setOpen(true);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
    fetchTiendoDonhang(newValue);
    setSingleDonhang(dsSubDonhang.find((dh) => dh._id === newValue));
  };

  const fetchTiendoDonhang = async (donhangId) => {
    const donhang = dsSubDonhang.find((dh) => dh._id === donhangId);
    const hodanId = donhang?.to.hodan._id;
    const data = await apiHodan.tiendoDonhang(hodanId, donhang?.ma);
    setTiendoDonhang(data);
  };

  const fetchSubDonhang = async () => {
    setLoading(true);
    const { daily2 } = await apiDaily2.singleDaily2BasedUser(userInfo._id);
    const { donhang } = await apiDonhang.singleDonhang(donhangId);
    if (!donhang.ngaydathang) {
      props.history.push(`/daily2/donhang/chitiet/${donhangId}`);
    }
    let { subdonhang } = await apiDaily2.dsSubDonhang(daily2._id, donhang.ma);
    const data = await apiHodan.tiendoDonhang(
      subdonhang[0].to.hodan._id,
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

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách đơn hàng"
          titleBack
          onClick={() => props.history.push("/daily2/donhang")}
        />
        <Content>
          <Form>
            <TiendoProcess>
              <TiendoProcessText
                onClick={() =>
                  props.history.push(`/daily2/donhang/chitiet/${donhangId}`)
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
                      <Tab label={dh?.to.hodan.daidien} value={dh?._id} />
                    ))}
                  </TabList>
                </Box>
                {dsSubDonhang.map((dh) => (
                  <TabPanel value={dh._id}>
                    <>
                      <MaDonhang className="text-left">
                        <span>Mã đơn hàng:</span>
                        <span>{dh?.ma}</span>
                      </MaDonhang>

                      <TiendoDonhang>
                        <table className="table">
                          <thead>
                            <tr>
                              <th colSpan="2">Hộ dân</th>
                            </tr>
                            <tr>
                              <th>Tình trạng nhận đơn</th>
                              <th>Tình trạng tiến độ</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td
                                style={{ cursor: "default" }}
                                className={
                                  tiendoDonhang && tiendoDonhang.hodanNhandon
                                    ? "success"
                                    : tiendoDonhang &&
                                      !tiendoDonhang.hodanNhandon
                                    ? "danger"
                                    : ref.current.hodanNhandon
                                    ? "success"
                                    : "danger"
                                }
                              >
                                {tiendoDonhang && tiendoDonhang.hodanNhandon ? (
                                  <i class="fas fa-check"></i>
                                ) : tiendoDonhang &&
                                  !tiendoDonhang.hodanNhandon ? (
                                  <i class="fas fa-times"></i>
                                ) : ref.current.hodanNhandon ? (
                                  <i class="fas fa-check"></i>
                                ) : (
                                  <i class="fas fa-times"></i>
                                )}
                              </td>
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
                          <h5>Thông tin hộ dân</h5>
                        </DetailsInfoTitle>
                        <DetailsInfoContent>
                          <DetailsInfoTexts>
                            <table>
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
                                  <img src={namsinh} alt="namsinh" />
                                  <span>Năm sinh:</span>
                                </td>
                                <td>{dh?.to.hodan.namsinh}</td>
                              </tr>
                              <tr>
                                <td>
                                  <img src={diachi} alt="diachi" />
                                  <span>Địa chỉ:</span>
                                </td>
                                <td>{`${dh?.to.hodan.xa}, ${dh?.to.hodan.huyen}, ${dh?.to.hodan.tinh}`}</td>
                              </tr>
                              <tr>
                                <td>
                                  <img src={langnghe} alt="langnghe" />
                                  <span>Làng nghề:</span>
                                </td>
                                <td>{`${dh?.to.hodan.langnghe.ten}, ${dh?.to.hodan.langnghe.huyen}, ${dh?.to.hodan.langnghe.tinh}`}</td>
                              </tr>
                              <tr>
                                <td>
                                  <img src={loai} alt="loai" />
                                  <span>Loại sản phẩm:</span>
                                </td>
                                <td>{dh?.to.hodan.loaisanpham.ten}</td>
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
                      <TableSanphamDonhangChitiet
                        dsSanpham={dh?.dssanpham}
                        hodanRole
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
    </>
  );
};

export default Tiendo;
