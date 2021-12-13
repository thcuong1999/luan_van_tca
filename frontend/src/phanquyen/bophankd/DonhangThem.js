import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Content,
  ErrMsg,
  Form,
  FormContent,
  FormGroup,
  FormTitle,
  Label,
  TableSection,
  TableTitle,
  Total,
  TotalValue,
} from "./styledComponents";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiDonhang from "../../axios/apiDonhang";
import apiBophankd from "../../axios/apiBophankd";
import { useSelector } from "react-redux";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import TableSanphamDonhang from "./tables/TableSanphamDonhang";
import TableDonhangGoc from "./tables/TableDonhangGoc";
import {
  formatMoney,
  getDsNguyenVatlieu,
  getTongNguyenVatlieu,
} from "../../utils";
import MultipleSelect from "../../components/MultipleSelect";
import ma from "../../assets/icons/ma.png";
import _gsv from "../../assets/icons/gsv_2.png";
import dhgoc from "../../assets/icons/dhgoc.png";
import DialogMaterial from "../../components/DialogMaterial";
import CustomAlert from "../../components/CustomAlert";

const DonhangThem = (props) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [dsDonhang, setDsDonhang] = useState([]);
  const [selectedDonhang, setSelectedDonhang] = useState(null);
  const [singleDonhang, setSingleDonhang] = useState(null);
  const [singleBophankd, setSingleBophankd] = useState(null);
  const [dsGSV, setDsGSV] = useState([]);
  const [selectedGSV, setselectedGSV] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const stateRef = useRef();
  const [dsThoaman, setDsThoaman] = useState([
    {
      gsv: null,
      dssanpham: [],
    },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const lackOfTotalSoluong = () => {
    let tongSLSPGoc = singleDonhang.dssanpham.reduce((acc, item) => {
      return acc + item.soluong;
    }, 0);
    let tongSLSPPhanphat = 0;
    dsThoaman.forEach((tm) => {
      let tongsl = tm.dssanpham.reduce((acc, item) => {
        return acc + parseInt(item.soluongpp);
      }, 0);
      tongSLSPPhanphat = tongSLSPPhanphat + tongsl;
    });
    if (tongSLSPGoc !== tongSLSPPhanphat) {
      setAlertMsg(`Tổng số lượng sản phẩm phân phát chưa đạt: ${tongSLSPGoc}`);
      handleOpen();
      return true;
    }
    return false;
  };

  const getTongDonhang = (dssp) => {
    dssp = dssp.map((item) =>
      item.soluongpp ? { ...item, soluong: item.soluongpp } : item
    );
    const { tongdongia } = getDsNguyenVatlieu(dssp);
    return tongdongia;
  };

  const handleChangeSlSanpham = (e, spId, gsvId) => {
    const val = e.target.value;
    if (!exceedSoluong(val, spId, gsvId)) {
      setDsThoaman(
        dsThoaman.map((tm) =>
          tm.gsv._id === gsvId
            ? {
                ...tm,
                dssanpham: tm.dssanpham.map((sp) =>
                  sp._id === spId
                    ? {
                        ...sp,
                        soluongpp: val,
                      }
                    : sp
                ),
              }
            : tm
        )
      );
    }
  };

  const calcTongSoluong1Sanpham = (val, spId, gsvId) => {
    stateRef.current = stateRef.current.map((tm) =>
      tm.gsv._id === gsvId
        ? {
            ...tm,
            dssanpham: tm.dssanpham.map((sp) =>
              sp._id === spId
                ? {
                    ...sp,
                    soluongpp: val,
                  }
                : sp
            ),
          }
        : tm
    );

    let tongsl = parseInt(val);
    stateRef.current.forEach((tm) => {
      if (tm.gsv._id !== gsvId) {
        const sp = tm.dssanpham.find((sp) => sp._id === spId);
        if (sp) {
          tongsl = tongsl + parseInt(sp.soluongpp);
        }
      }
    });

    return tongsl;
  };

  const exceedSoluong = (val, spId, gsvId) => {
    const sanphamGoc = singleDonhang.dssanpham.find(
      (sp) => sp.sanpham._id === spId
    );
    const tongsl = calcTongSoluong1Sanpham(val, spId, gsvId);
    if (tongsl > sanphamGoc.soluong) {
      let msg = `
      Tổng số lượng sản phẩm "${sanphamGoc.sanpham.ma}" vượt quá ${
        tongsl - sanphamGoc.soluong
      } so với số lượng gốc ${sanphamGoc.soluong}
      `;
      setAlertMsg(msg);
      handleOpen();
      return true;
    }
    return false;
  };

  const handleChangeGSV = (e) => {
    const {
      target: { value },
    } = e;
    setselectedGSV(typeof value === "string" ? value.split(",") : value);
    let temp = [...dsThoaman];
    temp = temp.map((tm) =>
      value.includes(tm.gsv._id)
        ? {
            ...tm,
            dssanpham: tm.dssanpham.map((sp) => ({ ...sp, soluongpp: 1 })),
          }
        : {
            ...tm,
            dssanpham: tm.dssanpham.map((sp) => ({ ...sp, soluongpp: 0 })),
          }
    );
    stateRef.current = temp;
    setDsThoaman(temp);
  };

  const handleChangeDonhang = (e) => {
    const val = e.target.value;
    setSelectedDonhang(val);
    const donhang = dsDonhang.find((dh) => dh._id === val);
    setSingleDonhang(donhang);
    getDsThoaman(donhang);
  };

  const getDsThoaman = (donhang) => {
    let temp = [
      {
        gsv: null,
        dssanpham: [],
      },
    ];
    dsGSV.forEach((gsv) => {
      temp = [
        {
          gsv: {
            _id: gsv._id,
            ten: gsv.ten,
          },
          dssanpham: [],
        },
        ...temp,
      ];
      donhang.dssanpham.forEach((sp) => {
        if (gsv.loaisanpham.includes(sp.sanpham.loaisanpham)) {
          temp = temp.map((t) =>
            t.gsv !== null && t.gsv._id === gsv._id
              ? {
                  ...t,
                  dssanpham: [
                    ...t.dssanpham,
                    { ...sp.sanpham, soluong: sp.soluong },
                  ],
                }
              : t
          );
        }
      });
    });
    temp = temp.filter(
      (item) => item.gsv !== null && item.dssanpham.length > 0
    );
    temp =
      temp.length > 1
        ? temp.map((item) => ({
            ...item,
            dssanpham: item.dssanpham.map((sp) => ({ ...sp, soluongpp: 1 })),
          }))
        : temp.map((item) => ({
            ...item,
            dssanpham: item.dssanpham.map((sp) => ({
              ...sp,
              soluongpp: sp.soluong,
            })),
          }));

    setDsThoaman(temp);
    stateRef.current = temp;
  };

  const emptyFields = () => {
    if (!selectedDonhang || !selectedGSV.length) {
      setErrMsg("Thông tin không được để trống");
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (!emptyFields()) {
      if (!lackOfTotalSoluong()) {
        let dsdonhang = [];

        let dsthoamanTemp = [...dsThoaman];
        dsthoamanTemp = dsthoamanTemp.map((tm) => ({
          ...tm,
          dssanpham: tm.dssanpham.map((sp) => ({
            ...sp,
            soluong: sp.soluongpp,
          })),
        }));
        dsthoamanTemp.forEach((tm) => {
          if (selectedGSV.includes(tm.gsv._id)) {
            const {
              danhsachcongcu,
              danhsachvattu,
              danhsachnguyenlieu,
              tongdongia,
            } = getDsNguyenVatlieu(tm.dssanpham);
            let dl = {
              ma: singleDonhang.ma,
              dssanpham: tm.dssanpham.map((item) => ({
                sanpham: item._id,
                soluong: item.soluong,
                soluonghoanthanh: 0,
              })),
              tongsanpham: getTongNguyenVatlieu(tm.dssanpham, "sanpham"),
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
              tongnguyenlieu: getTongNguyenVatlieu(
                danhsachnguyenlieu,
                "nguyenlieu"
              ),
              tongdongia,
              from: {
                bophankd: singleBophankd._id,
              },
              to: {
                giamsatvung: tm.gsv._id,
              },
            };
            dsdonhang.push(dl);
          }
        });
        console.log({ dsdonhang });
        const { success, savedDonhang } = await apiDonhang.bophankdToGsv({
          donhangId: selectedDonhang,
          dsdonhang,
          bophankdId: singleBophankd._id,
        });
        if (success) {
          toast.success("Thêm thành công!", { theme: "colored" });
          props.history.push(
            `/bophankd/donhang/chitiet/${savedDonhang._id}/tiendo`
          );
        }
      }
    }
  };

  const fetchDsDonhang = async () => {
    setLoading(true);
    const { donhang } = await apiDonhang.dsDonhang();
    const { bophankd } = await apiBophankd.bophankdBasedUserId(userInfo._id);
    const { giamsatvung } = await apiBophankd.bophankdDsGSV(bophankd._id);

    setDsGSV(giamsatvung);
    setDsDonhang(donhang);
    setSingleBophankd(bophankd);
    setLoading(false);
  };

  useEffect(() => {
    fetchDsDonhang();
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
                  <img src={ma} alt="ma" />
                  <span>Mã đơn hàng:</span>
                </Label>
                {dsDonhang && dsDonhang.length ? (
                  <DropdownMaterial2
                    label="Chọn mã đơn hàng"
                    value={selectedDonhang}
                    onChange={handleChangeDonhang}
                  >
                    {dsDonhang.map((item) => (
                      <MenuItem value={item._id}>{item.ma}</MenuItem>
                    ))}
                  </DropdownMaterial2>
                ) : (
                  <DropdownMaterial2 label="Chọn mã đơn hàng" />
                )}
                {!selectedDonhang && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={_gsv} alt="gsv" />
                  <span>Giám sát vùng:</span>
                </Label>
                {dsThoaman && dsThoaman.length ? (
                  <MultipleSelect
                    label="Chọn gám sát vùng"
                    value={selectedGSV}
                    onChange={handleChangeGSV}
                  >
                    {dsThoaman.map((tm) => (
                      <MenuItem key={tm?.gsv?._id} value={tm?.gsv?._id}>
                        {tm?.gsv?.ten}
                      </MenuItem>
                    ))}
                  </MultipleSelect>
                ) : (
                  <MultipleSelect label="Chọn gám sát vùng" />
                )}
                {selectedGSV.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>
            </FormContent>

            <div className="px-5">
              {selectedDonhang ? (
                <TableSection className="noCheckbox">
                  <TableTitle>
                    <img src={dhgoc} alt="dhgoc" />
                    <span>Đơn hàng gốc</span>
                  </TableTitle>
                  <TableDonhangGoc donhang={singleDonhang} />
                  <div className="text-right">
                    <Total>Tổng đơn hàng:</Total>
                    <TotalValue>
                      {formatMoney(
                        getTongDonhang(
                          singleDonhang.dssanpham.map((sp) => ({
                            ...sp.sanpham,
                            soluong: sp.soluong,
                          }))
                        )
                      )}{" "}
                      vnđ
                    </TotalValue>
                  </div>
                </TableSection>
              ) : null}

              {dsThoaman.map((tm) =>
                selectedGSV.includes(tm?.gsv?._id) ? (
                  <TableSection className="noCheckbox">
                    <TableTitle>
                      <img src={_gsv} alt="gsv" />
                      <span>{tm?.gsv?.ten}</span>
                    </TableTitle>
                    <TableSanphamDonhang
                      dsSanpham={tm?.dssanpham}
                      handleChangeSlSanpham={handleChangeSlSanpham}
                      gsvId={tm?.gsv?._id}
                    />
                    <div className="text-right">
                      <Total>Tổng đơn hàng:</Total>
                      <TotalValue>
                        {formatMoney(getTongDonhang(tm?.dssanpham))} vnđ
                      </TotalValue>
                      <CustomAlert title="Số lượng còn lại">
                        {tm?.dssanpham.map((sp) => (
                          <p>
                            {`${sp?.ten} (${sp?.ma})`}:
                            <span>
                              {isNaN(
                                sp?.soluong -
                                  calcTongSoluong1Sanpham(
                                    sp?.soluongpp,
                                    sp?._id,
                                    tm?.gsv?._id
                                  )
                              )
                                ? ""
                                : sp?.soluong -
                                  calcTongSoluong1Sanpham(
                                    sp?.soluongpp,
                                    sp?._id,
                                    tm?.gsv?._id
                                  )}
                            </span>
                          </p>
                        ))}
                      </CustomAlert>
                    </div>
                  </TableSection>
                ) : null
              )}
            </div>
          </Form>
        </Content>
      </Container>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Lỗi số lượng"
        content={alertMsg}
        text2="OK"
        onClick2={handleClose}
      />
    </>
  );
};

export default DonhangThem;
