import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiDonhang from "../../axios/apiDonhang";
import TableSanphamDonhangChitiet from "./tables/TableSanphamDonhangChitiet";
import TableCongcuDonhang from "./tables/TableCongcuDonhang";
import TableVattuDonhang from "./tables/TableVattuDonhang";
import TableNguyenlieuDonhang from "./tables/TableNguyenlieuDonhang";
import { formatMoney, getTableDataClass } from "../../utils";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";
import dssanpham from "../../assets/icons/dssanpham.png";
import dscongcu from "../../assets/icons/dscongcu.png";
import dsvattu from "../../assets/icons/dsvattu.png";
import dsnglieu from "../../assets/icons/dsnglieu.png";
import {
  BoxInfo,
  BoxInfoTitle,
  Container,
  Content,
  Form,
  MaDonhang,
  TableSection,
  TableTitle,
  TiendoDonhang,
  TiendoProcess,
  TiendoProcessText,
  Total,
  TotalValue,
} from "./styledComponents";
import HorizontalBarChart from "../../components/HorizontalBarChart";
import HorizontalBarChartItem from "../../components/HorizontalBarChartItem";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";

const DonhangChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [singleDonhang, setSingleDonhang] = useState(null);
  const { id: donhangId } = props.match.params;
  const { userInfo } = useSelector((state) => state.user);
  const [tiLePhanphat, setTiLePhanphat] = useState(null);
  const [tiendoHT, setTiendoHT] = useState(null);
  const [tiendoDonhang, setTiendoDonhang] = useState(null);

  const getChartData = (dssubdh) => {
    let fullPercent = 0;
    dssubdh.forEach((dh) => {
      let sum = dh.dssanpham.reduce((acc, sp) => acc + sp.soluong, 0);
      fullPercent = fullPercent + sum;
    });
    // ti le phan phat
    const tilephanphat = dssubdh.map((dh) => ({
      label: dh.to.giamsatvung.ten,
      percent:
        (dh.dssanpham.reduce((acc, sp) => acc + sp.soluong, 0) * 100) /
        fullPercent,
    }));
    // tien do hoan thanh
    const tiendoHT = dssubdh.map((dh) => ({
      label: dh.to.giamsatvung.ten,
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
    const { bophankd } = await apiBophankd.bophankdBasedUserId(userInfo._id);
    let { donhang } = await apiDonhang.singleDonhang(donhangId);
    const data = await apiBophankd.tiendoDonhang(bophankd._id, donhang.ma);
    const { subdonhang } = await apiBophankd.dssubdonhangOfSingleDH(
      bophankd._id,
      donhang.ma
    );
    donhang = {
      ...donhang,
      dssanpham: donhang?.dssanpham.map((sp) => ({ ...sp, ...sp.sanpham })),
      dscongcu: donhang?.dscongcu.map((cc) => ({ ...cc, ...cc.congcu })),
      dsvattu: donhang?.dsvattu.map((vt) => ({ ...vt, ...vt.vattu })),
      dsnguyenlieu: donhang?.dsnguyenlieu.map((ngl) => ({
        ...ngl,
        ...ngl.nguyenlieu,
      })),
    };
    //
    setTiendoDonhang(data);
    getChartData(subdonhang);
    setSingleDonhang(donhang);
    setLoading(false);
  };

  useEffect(() => {
    fetchDonhang();
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
          onClick={() => props.history.push("/bophankd/donhang")}
        />
        <Content>
          <Form className="px-5">
            <TiendoProcess className="text-right">
              <TiendoProcessText
                onClick={() =>
                  props.history.push(
                    `/bophankd/donhang/chitiet/${donhangId}/tiendo`
                  )
                }
              >
                <span>Theo dõi tiến độ</span>
                <i class="fas fa-long-arrow-alt-right"></i>
              </TiendoProcessText>
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
                        <th>BPKD</th>
                        <th colSpan="2">Giám sát vùng</th>
                        <th colSpan="2">Đại lý cấp 1</th>
                        <th colSpan="2">Đại lý cấp 2</th>
                        <th colSpan="2">Hộ dân</th>
                      </tr>
                      <tr>
                        <th>Tình trạng tiến độ</th>
                        <th>Tình trạng nhận đơn</th>
                        <th>Tình trạng tiến độ</th>
                        <th>Tình trạng nhận đơn</th>
                        <th>Tình trạng tiến độ</th>
                        <th>Tình trạng nhận đơn</th>
                        <th>Tình trạng tiến độ</th>
                        <th>Tình trạng nhận đơn</th>
                        <th>Tình trạng tiến độ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          className={getTableDataClass(
                            tiendoDonhang?.bophankdTDHT
                          )}
                        >{`${tiendoDonhang?.bophankdTDHT} %`}</td>
                        <td
                          className={getTableDataClass(tiendoDonhang?.gsvTTND)}
                        >{`${tiendoDonhang?.gsvTTND} %`}</td>
                        <td
                          className={getTableDataClass(tiendoDonhang?.gsvTDHT)}
                        >{`${tiendoDonhang?.gsvTDHT} %`}</td>
                        <td
                          className={getTableDataClass(
                            tiendoDonhang?.daily1TTND
                          )}
                        >{`${tiendoDonhang?.daily1TTND} %`}</td>
                        <td
                          className={getTableDataClass(
                            tiendoDonhang?.daily1TDHT
                          )}
                        >{`${tiendoDonhang?.daily1TDHT} %`}</td>
                        <td
                          className={getTableDataClass(
                            tiendoDonhang?.daily2TTND
                          )}
                        >{`${tiendoDonhang?.daily2TTND} %`}</td>
                        <td
                          className={getTableDataClass(
                            tiendoDonhang?.daily2TDHT
                          )}
                        >{`${tiendoDonhang?.daily2TDHT} %`}</td>
                        <td
                          className={getTableDataClass(
                            tiendoDonhang?.hodanTTND
                          )}
                        >{`${tiendoDonhang?.hodanTTND} %`}</td>
                        <td
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
                <BoxInfo>
                  <BoxInfoTitle>Bộ phận kinh doanh</BoxInfoTitle>
                  <table>
                    <tr>
                      <td>
                        <img src={ten} alt="ten" />
                        <span>Tên:</span>
                      </td>
                      <td>{singleDonhang?.from.bophankd.ten}</td>
                    </tr>
                    <tr>
                      <td>
                        <img src={sdt} alt="sdt" />
                        <span>SĐT:</span>
                      </td>
                      <td>{singleDonhang?.from.bophankd.sdt}</td>
                    </tr>
                    <tr>
                      <td>
                        <img src={email} alt="email" />
                        <span>E-mail:</span>
                      </td>
                      <td>{singleDonhang?.from.bophankd.email}</td>
                    </tr>
                    <tr>
                      <td>
                        <img src={diachi} alt="diachi" />
                        <span>Địa chỉ:</span>
                      </td>
                      <td>{`${singleDonhang?.from.bophankd.xa}, ${singleDonhang?.from.bophankd.huyen}, ${singleDonhang?.from.bophankd.tinh}`}</td>
                    </tr>
                  </table>
                </BoxInfo>
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
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default DonhangChitiet;