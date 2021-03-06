import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";
import dssanpham from "../../assets/icons/dssanpham.png";
import dscongcu from "../../assets/icons/dscongcu.png";
import dsvattu from "../../assets/icons/dsvattu.png";
import dsnglieu from "../../assets/icons/dsnglieu.png";
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
import Header from "../../components/Header";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiDonhang from "../../axios/apiDonhang";
import TableSanphamDonhangChitiet from "./tables/TableSanphamDonhangChitiet";
import TableCongcuDonhang from "./tables/TableCongcuDonhang";
import TableVattuDonhang from "./tables/TableVattuDonhang";
import TableNguyenlieuDonhang from "./tables/TableNguyenlieuDonhang";
import { formatMoney, getTableDataClass } from "../../utils";
import DialogMaterial from "../../components/DialogMaterial";
import { useSelector } from "react-redux";
import apiDaily1 from "../../axios/apiDaily1";
import { MaDonhang } from "../bophankd/styledComponents";
import HorizontalBarChart from "../../components/HorizontalBarChart";
import HorizontalBarChartItem from "../../components/HorizontalBarChartItem";
import CustomModal from "../../components/CustomModal";

const DonhangChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [singleDonhang, setSingleDonhang] = useState(null);
  const { id: donhangId } = props.match.params;
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [tiLePhanphat, setTiLePhanphat] = useState(null);
  const [tiendoHT, setTiendoHT] = useState(null);
  const [tiendoDonhang, setTiendoDonhang] = useState(null);
  const [dlXNDH, setDlXNDH] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [dlOpen, setDlOpen] = useState(false);
  const [selectedPQ, setSelectedPQ] = useState({
    dsDonhang: [],
    type: "",
    type2: "",
  });

  const emptyTableData = (dsDonhang, type) => {
    const typeName = type === "daily2" ? "?????i l?? c???p 2" : "H??? d??n";
    if (!dsDonhang.length) {
      setAlertMsg(
        `C??c ${typeName} trong nh??nh ch??a c?? ????n h??ng ${singleDonhang?.ma}`
      );
      handleOpenDL();
      return true;
    }
    return false;
  };

  const handleClickTableData = (pqType) => {
    switch (pqType) {
      case "daily1TDHT":
        if (!emptyTableData(tiendoDonhang?.daily1DSDonhang, "daily1")) {
          setSelectedPQ({
            dsDonhang: tiendoDonhang.daily1DSDonhang,
            type: "daily1Only",
            type2: "TDHT",
          });
          handleOpen();
        }
        break;
      case "daily2TTND":
        if (!emptyTableData(tiendoDonhang?.daily2DSDonhang, "daily2")) {
          setSelectedPQ({
            dsDonhang: tiendoDonhang.daily2DSDonhang,
            type: "daily2",
            type2: "TTND",
          });
          handleOpen();
        }
        break;
      case "daily2TDHT":
        if (!emptyTableData(tiendoDonhang?.daily2DSDonhang, "daily2")) {
          setSelectedPQ({
            dsDonhang: tiendoDonhang.daily2DSDonhang,
            type: "daily2",
            type2: "TDHT",
          });
          handleOpen();
        }
        break;
      case "hodanTTND":
        if (!emptyTableData(tiendoDonhang?.hodanDSDonhang, "hodan")) {
          setSelectedPQ({
            dsDonhang: tiendoDonhang.hodanDSDonhang,
            type: "hodan",
            type2: "TTND",
          });
          handleOpen();
        }
        break;
      case "hodanTDHT":
        if (!emptyTableData(tiendoDonhang?.hodanDSDonhang, "hodan")) {
          setSelectedPQ({
            dsDonhang: tiendoDonhang.hodanDSDonhang,
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

  const handleOpenDL = () => setDlOpen(true);
  const handleCloseDL = () => setDlOpen(false);

  const handleOpenXNDL = () => setDlXNDH(true);
  const handleCloseXNDL = () => setDlXNDH(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleXacnhan = async () => {
    const { success } = await apiDonhang.xacnhan(donhangId);
    if (success) {
      handleClose();
      setSuccess(true);
      props.setRefresh(true);
      props.history.push(`/daily1/donhang/chitiet/${donhangId}/them`);
      toast.success("X??c nh???n th??nh c??ng!", {
        theme: "colored",
      });
    }
  };

  const getChartData = (dssubdh) => {
    let fullPercent = 0;
    dssubdh.forEach((dh) => {
      let sum = dh.dssanpham.reduce((acc, sp) => acc + sp.soluong, 0);
      fullPercent = fullPercent + sum;
    });
    // ti le phan phat
    const tilephanphat = dssubdh.map((dh) => ({
      label: dh.to.daily2.ten,
      percent:
        (dh.dssanpham.reduce((acc, sp) => acc + sp.soluong, 0) * 100) /
        fullPercent,
    }));
    // tien do hoan thanh
    const tiendoHT = dssubdh.map((dh) => ({
      label: dh.to.daily2.ten,
      percent:
        (dh.dssanpham.reduce(
          (acc, sp) => acc + (sp.danhan ? sp.danhan : 0),
          0
        ) *
          100) /
        dh.dssanpham.reduce((acc, sp) => acc + sp.soluong, 0),
    }));
    setTiLePhanphat(tilephanphat);
    setTiendoHT(tiendoHT);
  };

  const fetchDonhang = async () => {
    setLoading(true);
    const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    let { donhang } = await apiDonhang.singleDonhang(donhangId);
    const data = await apiDaily1.tiendoDonhang(daily1._id, donhang.ma);
    const { subdonhang } = await apiDaily1.dssubdonhangOfSingleDH(
      daily1._id,
      donhang.ma
    );
    donhang = {
      ...donhang,
      dssanpham: donhang.dssanpham.map((sp) => ({ ...sp, ...sp.sanpham })),
      dscongcu: donhang.dscongcu.map((cc) => ({ ...cc, ...cc.congcu })),
      dsvattu: donhang.dsvattu.map((vt) => ({ ...vt, ...vt.vattu })),
      dsnguyenlieu: donhang.dsnguyenlieu.map((ngl) => ({
        ...ngl,
        ...ngl.nguyenlieu,
      })),
    };
    setTiendoDonhang(data);
    getChartData(subdonhang);
    setSingleDonhang(donhang);
    setLoading(false);
  };

  useEffect(() => {
    setSuccess(false);
    fetchDonhang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay l???i danh s??ch ????n h??ng"
          titleBack
          onClick={() => props.history.push("/daily1/donhang")}
        />
        <Content>
          <Form className="px-5">
            <TiendoProcess className="text-right">
              {singleDonhang?.ngaydathang ? (
                <TiendoProcessText
                  onClick={() =>
                    props.history.push(
                      `/daily1/donhang/chitiet/${donhangId}/tiendo`
                    )
                  }
                >
                  <span>Theo d??i ti???n ?????</span>
                  <i class="fas fa-long-arrow-alt-right"></i>
                </TiendoProcessText>
              ) : (
                <TiendoProcessText
                  onClick={() => {
                    if (singleDonhang?.xacnhan) {
                      props.history.push(
                        `/daily1/donhang/chitiet/${donhangId}/them`
                      );
                    } else {
                      toast.warning("Vui l??ng x??c nh???n ????n h??ng!", {
                        theme: "colored",
                      });
                    }
                  }}
                >
                  <span>Ti???n h??nh ph??n ph??t</span>
                  <i class="fas fa-long-arrow-alt-right"></i>
                </TiendoProcessText>
              )}
            </TiendoProcess>

            {singleDonhang?.ngaydathang ? (
              <>
                <MaDonhang>
                  <span>M?? ????n h??ng:</span>
                  <span>{singleDonhang?.ma}</span>
                </MaDonhang>

                <TiendoDonhang>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>?????i l?? c???p 1</th>
                        <th colSpan="2">?????i l?? c???p 2</th>
                        <th colSpan="2">H??? d??n</th>
                      </tr>
                      <tr>
                        <th>T??nh tr???ng ti???n ?????</th>
                        <th>T??nh tr???ng nh???n ????n</th>
                        <th>T??nh tr???ng ti???n ?????</th>
                        <th>T??nh tr???ng nh???n ????n</th>
                        <th>T??nh tr???ng ti???n ?????</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          onClick={() => handleClickTableData("daily1TDHT")}
                          className={getTableDataClass(
                            tiendoDonhang?.daily1TDHT
                          )}
                        >{`${tiendoDonhang?.daily1TDHT} %`}</td>
                        <td
                          onClick={() => handleClickTableData("daily2TTND")}
                          className={getTableDataClass(
                            tiendoDonhang?.daily2TTND
                          )}
                        >{`${tiendoDonhang?.daily2TTND} %`}</td>
                        <td
                          onClick={() => handleClickTableData("daily2TDHT")}
                          className={getTableDataClass(
                            tiendoDonhang?.daily2TDHT
                          )}
                        >{`${tiendoDonhang?.daily2TDHT} %`}</td>
                        <td
                          onClick={() => handleClickTableData("hodanTTND")}
                          className={getTableDataClass(
                            tiendoDonhang?.hodanTTND
                          )}
                        >{`${tiendoDonhang?.hodanTTND} %`}</td>
                        <td
                          onClick={() => handleClickTableData("hodanTDHT")}
                          className={getTableDataClass(
                            tiendoDonhang?.hodanTDHT
                          )}
                        >{`${tiendoDonhang?.hodanTDHT} %`}</td>
                      </tr>
                    </tbody>
                  </table>
                </TiendoDonhang>

                <div className="d-flex justify-content-between">
                  <HorizontalBarChart title="T??? l??? ph??n ph??t">
                    {tiLePhanphat &&
                      tiLePhanphat.length &&
                      tiLePhanphat.map((tl) => (
                        <HorizontalBarChartItem
                          label={tl?.label}
                          percent={Math.round(tl?.percent)}
                        />
                      ))}
                  </HorizontalBarChart>
                  <HorizontalBarChart title="Ti???n ????? ho??n th??nh">
                    {tiendoHT &&
                      tiendoHT.length &&
                      tiendoHT.map((td) => (
                        <HorizontalBarChartItem
                          label={td?.label}
                          percent={Math.round(td?.percent)}
                        />
                      ))}
                  </HorizontalBarChart>
                </div>
              </>
            ) : (
              <div className="text-left">
                <MaDonhang>
                  <span>M?? ????n h??ng:</span>
                  <span>{singleDonhang?.ma}</span>
                </MaDonhang>

                <DetailsInfo className="mb-5 mt-0">
                  <DetailsInfoTitle>
                    <h5>T??? gi??m s??t v??ng</h5>
                  </DetailsInfoTitle>

                  <DetailsInfoContent>
                    <DetailsInfoTexts>
                      <table>
                        <tr>
                          <td>
                            <img src={ten} alt="ten" />
                            <span>T??n:</span>
                          </td>
                          <td>{singleDonhang?.from.giamsatvung.ten}</td>
                        </tr>
                        <tr>
                          <td>
                            <img src={sdt} alt="sdt" />
                            <span>S??T:</span>
                          </td>
                          <td>{singleDonhang?.from.giamsatvung.sdt}</td>
                        </tr>
                        <tr>
                          <td>
                            <img src={email} alt="email" />
                            <span>E-mail:</span>
                          </td>
                          <td>{singleDonhang?.from.giamsatvung.email}</td>
                        </tr>
                        <tr>
                          <td>
                            <img src={diachi} alt="diachi" />
                            <span>?????a ch???:</span>
                          </td>
                          <td>{`${singleDonhang?.from.giamsatvung.xa}, ${singleDonhang?.from.giamsatvung.huyen}, ${singleDonhang?.from.giamsatvung.tinh}`}</td>
                        </tr>
                      </table>
                    </DetailsInfoTexts>
                  </DetailsInfoContent>
                </DetailsInfo>
              </div>
            )}

            <TableSection className="noCheckbox">
              <TableTitle>
                <img src={dssanpham} alt="dssanpham" />
                <span>S???n ph???m ????n h??ng</span>
              </TableTitle>
              <TableSanphamDonhangChitiet
                dsSanpham={singleDonhang?.dssanpham}
              />
              <div className="text-right mb-3">
                <Total>T???ng ????n gi??: </Total>
                <TotalValue>
                  {formatMoney(singleDonhang?.tongdongia)} vn??
                </TotalValue>
              </div>
            </TableSection>

            <TableSection className="noCheckbox">
              <TableTitle>
                <img src={dscongcu} alt="dscongcu" />
                <span>C??ng c??? ????n h??ng</span>
              </TableTitle>
              <TableCongcuDonhang dsCongcu={singleDonhang?.dscongcu} />
              <div className="text-right mb-3">
                <Total>T???ng s??? l?????ng: </Total>
                <TotalValue>{singleDonhang?.tongcongcu}</TotalValue>
              </div>
            </TableSection>

            <TableSection className="noCheckbox">
              <TableTitle>
                <img src={dsvattu} alt="dsvattu" />
                <span>V???t t?? ????n h??ng</span>
              </TableTitle>
              <TableVattuDonhang dsVattu={singleDonhang?.dsvattu} />
              <div className="text-right mb-3">
                <Total>T???ng s??? l?????ng: </Total>
                <TotalValue>{singleDonhang?.tongvattu}</TotalValue>
              </div>
            </TableSection>

            <TableSection className="noCheckbox">
              <TableTitle>
                <img src={dsnglieu} alt="dsnglieu" />
                <span>Nguy??n li???u ????n h??ng</span>
              </TableTitle>
              <TableNguyenlieuDonhang
                dsNguyenlieu={singleDonhang?.dsnguyenlieu}
              />
              <div className="text-right mb-3">
                <Total>T???ng kh???i l?????ng: </Total>
                <TotalValue>{singleDonhang?.tongnguyenlieu} kg</TotalValue>
              </div>
            </TableSection>

            <div className="text-left mt-4">
              {singleDonhang?.xacnhan ? (
                <button type="button" class="btn btn-outline-success">
                  <i class="fas fa-check"></i> ???? duy???t
                </button>
              ) : (
                <button
                  className="btn btn-success px-4"
                  onClick={handleOpenXNDL}
                >
                  X??c nh???n
                </button>
              )}
            </div>
          </Form>
        </Content>
      </Container>

      <DialogMaterial
        open={dlXNDH}
        onClose={handleCloseXNDL}
        title="X??c nh???n"
        content="X??c nh???n ????n h??ng ?"
        text1="H???y"
        text2="?????ng ??"
        onClick1={handleCloseXNDL}
        onClick2={handleXacnhan}
      />

      <CustomModal
        open={open}
        setOpen={setOpen}
        phanquyen={selectedPQ}
        singleDonhang={singleDonhang}
      />

      <DialogMaterial
        open={dlOpen}
        onClose={handleCloseDL}
        title="Ch??a c?? ????n h??ng"
        content={alertMsg}
        text2="OK"
        onClick2={handleCloseDL}
      />
    </>
  );
};

export default DonhangChitiet;
