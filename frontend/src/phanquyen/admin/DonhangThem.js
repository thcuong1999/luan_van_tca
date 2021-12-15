import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import MultipleSelect from "../../components/MultipleSelect";
import MenuItem from "@mui/material/MenuItem";
import apiSanpham from "../../axios/apiSanpham";
import BackdropMaterial from "../../components/BackdropMaterial";
import TableSanphamDonhang from "./tables/TableSanphamDonhang";
import TableCongcuDonhang from "./tables/TableCongcuDonhang";
import {
  formatMoney,
  getDsNguyenVatlieu,
  getTongNguyenVatlieu,
} from "../../utils";
import {
  Container,
  Content,
  ErrMsg,
  Form,
  FormContent,
  FormGroup,
  FormTitle,
  Input,
  Label,
  TableSection,
  TableTitle,
  Total,
  TotalValue,
} from "./styledComponents";
import TableVattuDonhang from "./tables/TableVattuDonhang";
import TableNguyenlieuDonhang from "./tables/TableNguyenlieuDonhang";
import apiDonhang from "../../axios/apiDonhang";
import _ma from "../../assets/icons/ma.png";
import sp from "../../assets/icons/sanpham.png";
import dssanpham from "../../assets/icons/dssanpham.png";
import dscongcu from "../../assets/icons/dscongcu.png";
import dsvattu from "../../assets/icons/dsvattu.png";
import dsnglieu from "../../assets/icons/dsnglieu.png";

const DonhangThem = (props) => {
  const [loading, setLoading] = useState(false);
  const [ma, setMa] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [dsSanpham, setDsSanpham] = useState([]);
  const [dsSP, setDsSP] = useState([]);
  const [selectedSP, setSelectedSP] = useState([]);
  const [dsMaDH, setDsMaDH] = useState([]);
  const [maDHErr, setMaDHErr] = useState("");
  const { danhsachcongcu, danhsachvattu, danhsachnguyenlieu, tongdongia } =
    getDsNguyenVatlieu(dsSP);

  const handleChangeMaDH = (e) => {
    var format = /[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/;
    const val = e.target.value;
    setMa(val);
    // check white space
    if (val.indexOf(" ") >= 0) {
      setMaDHErr("Mã không có khoảng trắng");
    } else if (dsMaDH.includes(val.toLowerCase())) {
      // check maDH exist
      setMaDHErr("Mã đã tồn tại");
    } else if (format.test(val)) {
      // check contains special chars
      setMaDHErr("Mã không được chứa kí tự đặc biệt");
    } else {
      setMaDHErr("");
    }
  };

  const validationFields = () => {
    if (maDHErr) {
      return false;
    }
    if (!ma) {
      setMaDHErr("Thông tin không được để trống");
      return false;
    }
    if (ma.length < 3) {
      setMaDHErr("Mã có ít nhất 3 kí tự");
      return false;
    }
    // check empty
    if (!selectedSP.length) {
      setErrMsg("Thông tin không được để trống");
      return false;
    }
    return true;
  };

  const handleChangeSP = (e) => {
    const {
      target: { value },
    } = e;
    setSelectedSP(typeof value === "string" ? value.split(",") : value);
    setDsSP(dsSanpham.filter((item) => value.includes(item._id)));
  };

  const handleSubmit = async () => {
    if (validationFields()) {
      const dl = {
        ma,
        dssanpham: dsSP.map((item) => ({
          sanpham: item._id,
          soluong: item.soluong,
          soluonghoanthanh: 0,
        })),
        tongsanpham: getTongNguyenVatlieu(dsSP, "sanpham"),
        dscongcu: danhsachcongcu.map((item) => ({
          congcu: item.congcu._id,
          soluong: item.soluong,
        })),
        tongcongcu: getTongNguyenVatlieu(danhsachcongcu, "congcu"),
        dsvattu: danhsachvattu.map((item) => ({
          vattu: item.vattu._id,
          soluong: item.soluong,
        })),
        tongvattu: getTongNguyenVatlieu(danhsachvattu, "vattu"),
        dsnguyenlieu: danhsachnguyenlieu.map((item) => ({
          nguyenlieu: item.nguyenlieu._id,
          khoiluong: item.khoiluong,
        })),
        tongnguyenlieu: getTongNguyenVatlieu(danhsachnguyenlieu, "nguyenlieu"),
        tongdongia,
      };
      // console.log({ dl });
      const { success } = await apiDonhang.themDonhang(dl);
      if (success) {
        toast.success("Thêm thành công!", { theme: "colored" });
        resetFields();
      }
    }
  };

  const resetFields = () => {
    setMa("");
    setErrMsg("");
    setDsSP([]);
    setSelectedSP([]);
  };

  const fetchDsSanpham = async () => {
    setLoading(true);
    const { donhang } = await apiDonhang.allDsDonhang();
    let { sanpham } = await apiSanpham.dsSanpham();
    sanpham = sanpham.map((item) => ({
      ...item,
      soluong: 1,
    }));
    setDsMaDH(donhang.map((dh) => dh.ma.toLowerCase()));
    setDsSanpham(sanpham);
    setLoading(false);
  };

  useEffect(() => {
    fetchDsSanpham();
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
          onClick={() => props.history.push("/admin/donhang")}
          headerRight={
            <button className="btn btn-primary px-3" onClick={handleSubmit}>
              Lưu
              <i class="fas fa-save"></i>
            </button>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>
                <span>Thêm đơn hàng</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={_ma} alt="ma" />
                  <span>Mã đơn hàng:</span>
                </Label>
                <Input
                  placeholder="Nhập mã"
                  type="text"
                  name="ma"
                  value={ma}
                  onChange={handleChangeMaDH}
                />
                {<ErrMsg>{maDHErr}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={sp} alt="sp" />
                  <span>Chọn sản phẩm:</span>
                </Label>
                {dsSanpham && dsSanpham.length ? (
                  <MultipleSelect
                    label="Chọn sản phẩm"
                    value={selectedSP}
                    onChange={handleChangeSP}
                  >
                    {dsSanpham.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {`${item.ma} - ${item.ten}`}
                      </MenuItem>
                    ))}
                  </MultipleSelect>
                ) : (
                  <MultipleSelect label="Chọn sản phẩm" />
                )}
                {selectedSP.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>
            </FormContent>

            {selectedSP.length ? (
              <div className="px-5">
                <TableSection className="noCheckbox">
                  <TableTitle>
                    <img src={dssanpham} alt="dssanpham" />
                    <span>Danh sách sản phẩm</span>
                  </TableTitle>
                  <TableSanphamDonhang dsSanpham={dsSP} setDsSP={setDsSP} />
                  <div className="text-right">
                    <Total>Tổng đơn giá: </Total>
                    <TotalValue>{formatMoney(tongdongia)} vnđ</TotalValue>
                  </div>
                </TableSection>

                <TableSection className="noCheckbox">
                  <TableTitle>
                    <img src={dscongcu} alt="dscongcu" />
                    <span>Danh sách công cụ</span>
                  </TableTitle>
                  <TableCongcuDonhang dsCongcu={danhsachcongcu} />
                  <div className="text-right">
                    <Total>Tổng số lượng: </Total>
                    <TotalValue>
                      {getTongNguyenVatlieu(danhsachcongcu, "congcu")}
                    </TotalValue>
                  </div>
                </TableSection>

                <TableSection className="noCheckbox">
                  <TableTitle>
                    <img src={dsvattu} alt="dsvattu" />
                    <span>Danh sách vật tư</span>
                  </TableTitle>
                  <TableVattuDonhang dsVattu={danhsachvattu} />
                  <div className="text-right">
                    <Total>Tổng số lượng: </Total>
                    <TotalValue>
                      {getTongNguyenVatlieu(danhsachvattu, "vattu")}
                    </TotalValue>
                  </div>
                </TableSection>

                <TableSection className="noCheckbox">
                  <TableTitle>
                    <img src={dsnglieu} alt="dsnglieu" />
                    <span>Danh sách nguyên liệu</span>
                  </TableTitle>
                  <TableNguyenlieuDonhang dsNguyenlieu={danhsachnguyenlieu} />
                  <div className="text-right">
                    <Total>Tổng khối lượng: </Total>
                    <TotalValue>
                      {getTongNguyenVatlieu(danhsachnguyenlieu, "nguyenlieu")}{" "}
                      kg
                    </TotalValue>
                  </div>
                </TableSection>
              </div>
            ) : null}
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default DonhangThem;
