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
import apiDaily2 from "../../axios/apiDaily2";
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
            dsDonhang: tiendoDonhang.daily2DSDonhang,
            type: "daily2Only",
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
      props.history.push(`/daily2/donhang/chitiet/${donhangId}/them`);
      toast.success("Xác nhận thành công!", {
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
      label: `${dh.to.hodan.daidien} (${dh.to.hodan.xa}, ${dh.to.hodan.huyen}, ${dh.to.hodan.tinh})`,
      percent:
        (dh.dssanpham.reduce((acc, sp) => acc + sp.soluong, 0) * 100) /
        fullPercent,
    }));
    // tien do hoan thanh
    const tiendoHT = dssubdh.map((dh) => ({
      label: `${dh.to.hodan.daidien} (${dh.to.hodan.xa}, ${dh.to.hodan.huyen}, ${dh.to.hodan.tinh})`,
      percent:
        (dh.dssanpham.reduce((acc, sp) => acc + sp.soluonghoanthanh, 0) * 100) /
        dh.dssanpham.reduce((acc, sp) => acc + sp.soluong, 0),
    }));
    setTiLePhanphat(tilephanphat);
    setTiendoHT(tiendoHT);
  };

  const fetchDonhang = async () => {
    setLoading(true);
    const { daily2 } = await apiDaily2.singleDaily2BasedUser(userInfo._id);
    let { donhang } = await apiDonhang.singleDonhang(donhangId);
    const data = await apiDaily2.tiendoDonhang(daily2._id, donhang.ma);
    const { subdonhang } = await apiDaily2.dssubdonhangOfSingleDH(
      daily2._id,
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
          title="Quay lại danh sách đơn hàng"
          titleBack
          onClick={() => props.history.push("/daily2/donhang")}
        />
        <Content>
          <Form className="px-5">
            <TiendoProcess className="text-right">
              {singleDonhang?.ngaydathang ? (
                <TiendoProcessText
                  onClick={() =>
                    props.history.push(
                      `/daily2/donhang/chitiet/${donhangId}/tiendo`
                    )
                  }
                >
                  <span>Theo dõi tiến độ</span>
                  <i class="fas fa-long-arrow-alt-right"></i>
                </TiendoProcessText>
              ) : (
                <TiendoProcessText
                  onClick={() => {
                    if (singleDonhang?.xacnhan) {
                      props.history.push(
                        `/daily2/donhang/chitiet/${donhangId}/them`
                      );
                    } else {
                      toast.warning("Vui lòng xác nhận đơn hàng!", {
                        theme: "colored",
                      });
                    }
                  }}
                >
                  <span>Tiến hành phân phát</span>
                  <i class="fas fa-long-arrow-alt-right"></i>
                </TiendoProcessText>
              )}
            </TiendoProcess>

            {singleDonhang?.ngaydathang ? (
              <>
                <MaDonhang>
                  <span>Mã đơn hàng:</span>
                  <span>{singleDonhang?.ma}</span>
                </MaDonhang>

                <TiendoDonhang>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Đại lý cấp 2</th>
                        <th colSpan="2">Hộ dân</th>
                      </tr>
                      <tr>
                        <th>Tình trạng tiến độ</th>
                        <th>Tình trạng nhận đơn</th>
                        <th>Tình trạng tiến độ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
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
                  <HorizontalBarChart title="Tỉ lệ phân phát">
                    {tiLePhanphat &&
                      tiLePhanphat.length &&
                      tiLePhanphat.map((tl) => (
                        <HorizontalBarChartItem
                          label={tl?.label}
                          percent={Math.round(tl?.percent)}
                        />
                      ))}
                  </HorizontalBarChart>
                  <HorizontalBarChart title="Tiến độ hoàn thành">
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
                  <span>Mã đơn hàng:</span>
                  <span>{singleDonhang?.ma}</span>
                </MaDonhang>

                <DetailsInfo className="mb-5 mt-0">
                  <DetailsInfoTitle>
                    <h5>Từ đại lý cấp 1</h5>
                  </DetailsInfoTitle>

                  <DetailsInfoContent>
                    <DetailsInfoTexts>
                      <table>
                        <tr>
                          <td>
                            <img src={ten} alt="ten" />
                            <span>Tên:</span>
                          </td>
                          <td>{singleDonhang?.from.daily1.ten}</td>
                        </tr>
                        <tr>
                          <td>
                            <img src={sdt} alt="sdt" />
                            <span>SĐT:</span>
                          </td>
                          <td>{singleDonhang?.from.daily1.sdt}</td>
                        </tr>
                        <tr>
                          <td>
                            <img src={email} alt="email" />
                            <span>E-mail:</span>
                          </td>
                          <td>{singleDonhang?.from.daily1.email}</td>
                        </tr>
                        <tr>
                          <td>
                            <img src={diachi} alt="diachi" />
                            <span>Địa chỉ:</span>
                          </td>
                          <td>{`${singleDonhang?.from.daily1.xa}, ${singleDonhang?.from.daily1.huyen}, ${singleDonhang?.from.daily1.tinh}`}</td>
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
                <span>Sản phẩm đơn hàng</span>
              </TableTitle>
              <TableSanphamDonhangChitiet
                dsSanpham={singleDonhang?.dssanpham}
              />
              <div className="text-right mb-3">
                <Total>Tổng đơn giá: </Total>
                <TotalValue>
                  {formatMoney(singleDonhang?.tongdongia)} vnđ
                </TotalValue>
              </div>
            </TableSection>

            <TableSection className="noCheckbox">
              <TableTitle>
                <img src={dscongcu} alt="dscongcu" />
                <span>Công cụ đơn hàng</span>
              </TableTitle>
              <TableCongcuDonhang dsCongcu={singleDonhang?.dscongcu} />
              <div className="text-right mb-3">
                <Total>Tổng số lượng: </Total>
                <TotalValue>{singleDonhang?.tongcongcu}</TotalValue>
              </div>
            </TableSection>

            <TableSection className="noCheckbox">
              <TableTitle>
                <img src={dsvattu} alt="dsvattu" />
                <span>Vật tư đơn hàng</span>
              </TableTitle>
              <TableVattuDonhang dsVattu={singleDonhang?.dsvattu} />
              <div className="text-right mb-3">
                <Total>Tổng số lượng: </Total>
                <TotalValue>{singleDonhang?.tongvattu}</TotalValue>
              </div>
            </TableSection>

            <TableSection className="noCheckbox">
              <TableTitle>
                <img src={dsnglieu} alt="dsnglieu" />
                <span>Nguyên liệu đơn hàng</span>
              </TableTitle>
              <TableNguyenlieuDonhang
                dsNguyenlieu={singleDonhang?.dsnguyenlieu}
              />
              <div className="text-right mb-3">
                <Total>Tổng khối lượng: </Total>
                <TotalValue>{singleDonhang?.tongnguyenlieu} kg</TotalValue>
              </div>
            </TableSection>

            <div className="text-left mt-4">
              {singleDonhang?.xacnhan ? (
                <button type="button" class="btn btn-outline-success">
                  <i class="fas fa-check"></i> Đã duyệt
                </button>
              ) : (
                <button
                  className="btn btn-success px-4"
                  onClick={handleOpenXNDL}
                >
                  Xác nhận
                </button>
              )}
            </div>
          </Form>
        </Content>
      </Container>

      <DialogMaterial
        open={dlXNDH}
        onClose={handleCloseXNDL}
        title="Xác nhận"
        content="Xác nhận đơn hàng ?"
        text1="Hủy"
        text2="Đồng ý"
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
        title="Chưa có đơn hàng"
        content={alertMsg}
        text2="OK"
        onClick2={handleCloseDL}
      />
    </>
  );
};

export default DonhangChitiet;
