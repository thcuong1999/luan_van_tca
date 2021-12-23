import React from "react";
import {
  DanhsachTieuchi,
  TableSection,
  ThongkeContainer,
  ThongkeTitle,
  ThongkeValues,
  TieuChi,
  TieuchiBtn,
} from "../phanquyen/bophankd/styledComponents";
import month from "../assets/icons/month.png";
import year from "../assets/icons/year.png";
import daterange from "../assets/icons/daterange.png";
import star from "../assets/icons/star.png";
import {
  formatMoney,
  getThongkeCongcu,
  getThongkeNguyenlieu,
  getThongkeSanpham,
  getThongkeVattu,
} from "../utils";
import Alert from "@mui/material/Alert";
import TableSanpham from "../phanquyen/daily2/tables/TableSanpham";
import TableVattu from "../phanquyen/daily2/tables/TableVattu";
import TableNguyenlieu from "../phanquyen/daily2/tables/TableNguyenlieu";
import TableCongcu from "../phanquyen/daily2/tables/TableCongcu";

const Thongke = ({
  dsSanpham = [],
  dsVattu = [],
  dsCongcu = [],
  dsNguyenlieu = [],
  onClickThang,
  onClickNam,
  onClickThongke,
  handleChangeDateFrom,
  handleChangeDateTo,
  fromDate,
  toDate,
  thongkeType,
}) => {
  const { tongDonhang, tongSanpham, tongSoluong, tongKhoiluong, tongGia } =
    dsSanpham.length
      ? getThongkeSanpham(dsSanpham)
      : dsVattu.length
      ? getThongkeVattu(dsVattu)
      : dsCongcu.length
      ? getThongkeCongcu(dsCongcu)
      : getThongkeNguyenlieu(dsNguyenlieu);

  return (
    <ThongkeContainer>
      <ThongkeTitle>Thống kê</ThongkeTitle>
      <DanhsachTieuchi>
        <TieuChi>
          <img src={month} alt="tieuchi" />
          <span>Theo</span>
          <TieuchiBtn
            className={`thang ${thongkeType === "thang" ? "active" : ""}`}
            onClick={onClickThang}
          >
            Tháng
          </TieuchiBtn>
        </TieuChi>
        <TieuChi>
          <img src={year} alt="tieuchi" />
          <span>Theo</span>
          <TieuchiBtn
            className={`nam ${thongkeType === "nam" ? "active" : ""}`}
            onClick={onClickNam}
          >
            Năm
          </TieuchiBtn>
        </TieuChi>
        <TieuChi>
          <img src={daterange} alt="tieuchi" />
          <span>Theo khoảng thời gian:</span>
          <input type="date" value={fromDate} onChange={handleChangeDateFrom} />
          <input type="date" value={toDate} onChange={handleChangeDateTo} />
          <TieuchiBtn
            className={`range ${thongkeType === "range" ? "active" : ""}`}
            onClick={onClickThongke}
          >
            Thống kê
          </TieuchiBtn>
        </TieuChi>
      </DanhsachTieuchi>

      {dsSanpham.length ||
      dsVattu.length ||
      dsNguyenlieu.length ||
      dsCongcu.length ? (
        <>
          <TableSection
            className="noCheckbox"
            style={{ paddingLeft: 26, paddingRight: 26 }}
          >
            {dsSanpham.length ? (
              <TableSanpham dsSanpham={dsSanpham} readOnly />
            ) : dsVattu.length ? (
              <TableVattu dsVattu={dsVattu} readOnly />
            ) : dsNguyenlieu.length ? (
              <TableNguyenlieu dsNguyenlieu={dsNguyenlieu} readOnly />
            ) : dsCongcu.length ? (
              <TableCongcu dsCongcu={dsCongcu} readOnly />
            ) : null}
          </TableSection>

          <ThongkeValues>
            <table>
              <tr>
                <td>
                  <img src={star} alt="ten" />
                  <span>Tổng đơn hàng:</span>
                </td>
                <td>{tongDonhang}</td>
              </tr>
              <tr>
                <td>
                  <img src={star} alt="sdt" />
                  <span>
                    {dsSanpham.length
                      ? "Tổng sản phẩm:"
                      : dsVattu.length
                      ? "Tổng vật tư:"
                      : dsNguyenlieu.length
                      ? "Tổng nguyên liệu"
                      : dsCongcu.length
                      ? "Tổng công cụ"
                      : ""}
                  </span>
                </td>
                <td>{tongSanpham}</td>
              </tr>
              {dsNguyenlieu.length ? (
                <tr>
                  <td>
                    <img src={star} alt="email" />
                    <span>Tổng khối lượng:</span>
                  </td>
                  <td>{tongKhoiluong} kg</td>
                </tr>
              ) : (
                <tr>
                  <td>
                    <img src={star} alt="email" />
                    <span>Tổng số lượng:</span>
                  </td>
                  <td>{tongSoluong}</td>
                </tr>
              )}
              {dsSanpham.length ? (
                <tr>
                  <td>
                    <img src={star} alt="diachi" />
                    <span>Tổng giá:</span>
                  </td>
                  <td style={{ fontWeight: "bold" }}>
                    {formatMoney(tongGia)} vnđ
                  </td>
                </tr>
              ) : null}
            </table>
          </ThongkeValues>
        </>
      ) : null}

      {!dsSanpham.length &&
      !dsVattu.length &&
      !dsNguyenlieu.length &&
      !dsCongcu.length &&
      thongkeType ? (
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
          <Alert severity="error">Không có item nào nằm trong điều kiện!</Alert>
        </div>
      ) : null}
    </ThongkeContainer>
  );
};

export default Thongke;
