import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiDonhang from "../../axios/apiDonhang";
import { useSelector } from "react-redux";
import TableSanphamDonhang from "./tables/TableSanphamDonhang";
import TableDonhangGoc from "./tables/TableDonhangGoc";
import {
  formatMoney,
  getDsNguyenVatlieu,
  getTongNguyenVatlieu,
} from "../../utils";
import MultipleSelect from "../../components/MultipleSelect";
import apiDaily2 from "../../axios/apiDaily2";
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
import ma from "../../assets/icons/ma.png";
import hodan from "../../assets/icons/hodan2.png";
import dssanpham from "../../assets/icons/dssanpham.png";
import DialogMaterial from "../../components/DialogMaterial";
import CustomAlert from "../../components/CustomAlert";

const DonhangThem = (props) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [singleDonhang, setSingleDonhang] = useState(null);
  const [singleDaily2, setSingleDaily2] = useState(null);
  const [selectedHodan, setselectedHodan] = useState([]);
  const { id: donhangId } = props.match.params;
  const { userInfo } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const stateRef = useRef();
  const [dsThoaman, setDsThoaman] = useState([
    {
      hodan: null,
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

  const handleChangeSlSanpham = (e, spId, hodanId) => {
    const val = e.target.value;
    if (!exceedSoluong(val, spId, hodanId)) {
      setDsThoaman(
        dsThoaman.map((tm) =>
          tm.hodan._id === hodanId
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

  const calcTongSoluong1Sanpham = (val, spId, hodanId) => {
    stateRef.current = stateRef.current.map((tm) =>
      tm.hodan._id === hodanId
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
      if (tm.hodan._id !== hodanId) {
        const sp = tm.dssanpham.find((sp) => sp._id === spId);
        if (sp) {
          tongsl = tongsl + parseInt(sp.soluongpp);
        }
      }
    });

    return tongsl;
  };

  const exceedSoluong = (val, spId, hodanId) => {
    const sanphamGoc = singleDonhang.dssanpham.find(
      (sp) => sp.sanpham._id === spId
    );
    const tongsl = calcTongSoluong1Sanpham(val, spId, hodanId);
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

  const handleChangeHodan = (e) => {
    const {
      target: { value },
    } = e;
    setselectedHodan(typeof value === "string" ? value.split(",") : value);
    let temp = [...dsThoaman];
    temp = temp.map((tm) =>
      value.includes(tm.hodan._id)
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

  const getDsThoaman = (donhang, dsHodan) => {
    let temp = [
      {
        hodan: null,
        dssanpham: [],
      },
    ];
    dsHodan.forEach((hodan) => {
      temp = [
        {
          hodan: {
            _id: hodan._id,
            ten: hodan.daidien,
          },
          dssanpham: [],
        },
        ...temp,
      ];
      donhang.dssanpham.forEach((sp) => {
        if (hodan.loaisanpham._id === sp.sanpham.loaisanpham._id) {
          temp = temp.map((t) =>
            t.hodan !== null && t.hodan._id === hodan._id
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
      (item) => item.hodan !== null && item.dssanpham.length > 0
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
    if (!selectedHodan.length) {
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
          if (selectedHodan.includes(tm.hodan._id)) {
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
                daily2: singleDaily2._id,
              },
              to: {
                hodan: tm.hodan._id,
              },
            };
            dsdonhang.push(dl);
          }
        });
        const { success } = await apiDonhang.daily2ToHodan({
          donhangId: singleDonhang._id,
          dsdonhang,
          daily2Id: singleDaily2._id,
        });
        if (success) {
          toast.success("Thêm thành công!", { theme: "colored" });
          props.history.push(`/daily2/donhang/chitiet/${donhangId}/tiendo`);
        }
      }
    }
  };

  const fetchDsDonhang = async () => {
    setLoading(true);
    const { donhang } = await apiDonhang.singleDonhang(donhangId);
    if (!donhang.xacnhan) {
      props.history.push(`/daily2/donhang/chitiet/${donhangId}`);
    }
    const { daily2 } = await apiDaily2.singleDaily2BasedUser(userInfo._id);
    let { hodan } = await apiDaily2.dsHodan(daily2._id);
    hodan = hodan.filter((hd) => hd.user);

    getDsThoaman(donhang, hodan);
    setSingleDonhang(donhang);
    setSingleDaily2(daily2);
    setLoading(false);
  };

  const getMappedDSSP = (dssp) => {
    let arr =
      dssp &&
      dssp.length &&
      dssp.map((sp) => ({ ...sp.sanpham, soluong: sp.soluong }));
    return arr;
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
          onClick={() => props.history.push("/daily2/donhang")}
          headerRight={
            <button className="btn btn-primary px-3" onClick={handleSubmit}>
              <span>Lưu</span>
              <i class="fas fa-save"></i>
            </button>
          }
        />
        <Content>
          <Form className="px-5">
            <FormContent>
              <FormTitle>Phân phát đơn hàng</FormTitle>
              <FormGroup>
                <Label>
                  <img src={ma} alt="ma" />
                  <span>Mã đơn hàng:</span>
                </Label>
                <Input type="text" defaultValue={singleDonhang?.ma} disabled />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={hodan} alt="hodan" />
                  <span>Hộ dân:</span>
                </Label>
                {dsThoaman && dsThoaman.length ? (
                  <MultipleSelect
                    label="Chọn hộ dân"
                    value={selectedHodan}
                    onChange={handleChangeHodan}
                  >
                    {dsThoaman.map((hd) => (
                      <MenuItem key={hd?.hodan?._id} value={hd?.hodan?._id}>
                        {hd?.hodan?.ten}
                      </MenuItem>
                    ))}
                  </MultipleSelect>
                ) : (
                  <MultipleSelect label="Chọn hộ dân" />
                )}
                {selectedHodan.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
              </FormGroup>
            </FormContent>

            <TableSection className="noCheckbox">
              <TableTitle>
                <img src={dssanpham} alt="dssanpham" />
                <span>Sản phẩm đơn hàng</span>
              </TableTitle>
              <TableDonhangGoc donhang={singleDonhang} />
              <div className="text-right">
                <Total>Tổng đơn hàng:</Total>
                <TotalValue>
                  {formatMoney(
                    singleDonhang?.dssanpham.length &&
                      getTongDonhang(getMappedDSSP(singleDonhang?.dssanpham))
                  )}
                </TotalValue>
              </div>
            </TableSection>

            {dsThoaman.map((tm) =>
              selectedHodan.includes(tm?.hodan?._id) ? (
                <TableSection className="noCheckbox">
                  <TableTitle>
                    <img src={hodan} alt="hodan" />
                    <span>{tm?.hodan?.ten}</span>
                  </TableTitle>
                  <TableSanphamDonhang
                    dsSanpham={tm?.dssanpham}
                    handleChangeSlSanpham={handleChangeSlSanpham}
                    hodanId={tm?.hodan?._id}
                  />
                  <div className="text-right">
                    <Total>Tổng đơn hàng:</Total>
                    <TotalValue>
                      {formatMoney(getTongDonhang(tm?.dssanpham))}
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
                                  tm?.hodan?._id
                                )
                            )
                              ? ""
                              : sp?.soluong -
                                calcTongSoluong1Sanpham(
                                  sp?.soluongpp,
                                  sp?._id,
                                  tm?.hodan?._id
                                )}
                          </span>
                        </p>
                      ))}
                    </CustomAlert>
                  </div>
                </TableSection>
              ) : null
            )}
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

// import React, { useEffect, useState } from "react";
// import Header from "../../components/Header";
// import { toast } from "react-toastify";
// import MenuItem from "@mui/material/MenuItem";
// import BackdropMaterial from "../../components/BackdropMaterial";
// import apiDonhang from "../../axios/apiDonhang";
// import { useSelector } from "react-redux";
// import TableSanphamDonhang from "./tables/TableSanphamDonhang";
// import TableDonhangGoc from "./tables/TableDonhangGoc";
// import {
//   formatMoney,
//   getDsNguyenVatlieu,
//   getTongNguyenVatlieu,
// } from "../../utils";
// import MultipleSelect from "../../components/MultipleSelect";
// import apiDaily2 from "../../axios/apiDaily2";
// import {
//   Container,
//   Content,
//   ErrMsg,
//   Form,
//   FormContent,
//   FormGroup,
//   FormTitle,
//   Input,
//   Label,
//   TableSection,
//   TableTitle,
//   Total,
//   TotalValue,
// } from "./styledComponents";
// import ma from "../../assets/icons/ma.png";
// import hodan from "../../assets/icons/hodan2.png";
// import dssanpham from "../../assets/icons/dssanpham.png";

// const DonhangThem = (props) => {
//   const [loading, setLoading] = useState(false);
//   const [errMsg, setErrMsg] = useState("");
//   const [singleDonhang, setSingleDonhang] = useState(null);
//   const [singleDaily2, setSingleDaily2] = useState(null);
//   const [dsHodan, setDsHodan] = useState([]);
//   const [selectedHodan, setselectedHodan] = useState([]);
//   const { id: donhangId } = props.match.params;
//   const { userInfo } = useSelector((state) => state.user);

//   const getTongDonhang = (dssp) => {
//     const { tongdongia } = getDsNguyenVatlieu(dssp);
//     return tongdongia;
//   };

//   const handleChangeSlSanpham = (e, spId, dl2Id) => {
//     let tong =
//       Number(e.target.value) || e.target.value === "" ? e.target.value : 1;
//     let tongExceptGSV = 0;
//     const slgoc = singleDonhang.dssanpham.find(
//       (sp) => sp.sanpham._id === spId
//     ).soluong;
//     dsHodan.forEach((hd) => {
//       if (hd._id !== dl2Id && selectedHodan.includes(hd._id)) {
//         hd.dsthoaman.forEach((sp) => {
//           if (sp._id === spId) {
//             tong = parseInt(tong) + parseInt(sp.soluong);
//             tongExceptGSV = tongExceptGSV + parseInt(sp.soluong);
//           }
//         });
//       }
//     });
//     setDsHodan((prev) =>
//       prev.map((hd) =>
//         hd._id === dl2Id
//           ? {
//               ...hd,
//               dsthoaman: hd.dsthoaman.map((sp) =>
//                 sp._id === spId
//                   ? {
//                       ...sp,
//                       soluong:
//                         tong > slgoc
//                           ? slgoc - tongExceptGSV
//                           : Number(e.target.value) || e.target.value === ""
//                           ? e.target.value
//                           : 1,
//                     }
//                   : sp
//               ),
//             }
//           : hd
//       )
//     );
//   };

//   const handleChangeDaily2 = (e) => {
//     const {
//       target: { value },
//     } = e;
//     setselectedHodan(typeof value === "string" ? value.split(",") : value);
//   };

//   const handleGetDsThoaman = (dssp, hodan) => {
//     console.log({ dssp, hodan });
//     dssp.forEach((sp) => {
//       setDsHodan((prev) =>
//         prev.length
//           ? prev.map((hd) =>
//               hd.loaisanpham._id === sp.loaisanpham._id && //*** */
//               !hd.dsthoaman
//                 .map((item) => item.loaisanpham)
//                 .includes(sp.loaisanpham._id)
//                 ? {
//                     ...hd,
//                     dsthoaman: [{ ...sp, soluong: 1 }, ...hd.dsthoaman],
//                   }
//                 : hd
//             )
//           : hodan.map((hd) =>
//               hd.loaisanpham._id === sp.loaisanpham._id &&
//               !hd.dsthoaman
//                 .map((item) => item.loaisanpham)
//                 .includes(sp.loaisanpham._id)
//                 ? {
//                     ...hd,
//                     dsthoaman: [{ ...sp, soluong: 1 }, ...hd.dsthoaman],
//                   }
//                 : hd
//             )
//       );
//     });
//   };

//   const emptyFields = () => {
//     if (!selectedHodan.length) {
//       setErrMsg("Thông tin không được để trống");
//       return true;
//     }
//     return false;
//   };

//   const handleSubmit = async () => {
//     if (!emptyFields()) {
//       let dsdonhang = [];
//       dsHodan.forEach((hd) => {
//         if (selectedHodan.includes(hd._id)) {
//           const {
//             danhsachcongcu,
//             danhsachvattu,
//             danhsachnguyenlieu,
//             tongdongia,
//           } = getDsNguyenVatlieu(hd.dsthoaman);
//           let dl = {
//             ma: singleDonhang.ma,
//             dssanpham: hd.dsthoaman.map((item) => ({
//               sanpham: item._id,
//               soluong: item.soluong,
//               soluonghoanthanh: 0,
//             })),
//             tongsanpham: getTongNguyenVatlieu(hd.dsthoaman, "sanpham"),
//             dscongcu: danhsachcongcu.map((item) => ({
//               congcu: item.congcu._id,
//               soluong: item.soluong,
//             })),
//             tongcongcu: getTongNguyenVatlieu(danhsachcongcu, "congcu"),
//             dsvattu: danhsachvattu.map((item) => ({
//               vattu: item.vattu._id,
//               soluong: item.soluong,
//             })),
//             tongvattu: getTongNguyenVatlieu(danhsachvattu, "vattu"),
//             dsnguyenlieu: danhsachnguyenlieu.map((item) => ({
//               nguyenlieu: item.nguyenlieu._id,
//               khoiluong: item.khoiluong,
//             })),
//             tongnguyenlieu: getTongNguyenVatlieu(
//               danhsachnguyenlieu,
//               "nguyenlieu"
//             ),
//             tongdongia,
//             from: {
//               daily2: singleDaily2._id,
//             },
//             to: {
//               hodan: hd._id,
//             },
//           };
//           dsdonhang.push(dl);
//         }
//       });
//       const { success } = await apiDonhang.daily2ToHodan({
//         donhangId: singleDonhang._id,
//         dsdonhang,
//         daily2Id: singleDaily2._id,
//       });
//       if (success) {
//         toast.success("Thêm thành công!", { theme: "colored" });
//         props.history.push(`/daily2/donhang/chitiet/${donhangId}/tiendo`);
//       }
//     }
//   };

//   const fetchDsDonhang = async () => {
//     setLoading(true);
//     const { donhang } = await apiDonhang.singleDonhang(donhangId);
//     if (!donhang.xacnhan) {
//       props.history.push(`/daily2/donhang/chitiet/${donhangId}`);
//     }
//     const { daily2 } = await apiDaily2.singleDaily2BasedUser(userInfo._id);
//     let { hodan } = await apiDaily2.dsHodan(daily2._id);
//     hodan = hodan.filter((hd) => hd.user);
//     hodan = hodan.map((item) => ({ ...item, dsthoaman: [] }));
//     setSingleDonhang(donhang);
//     setSingleDaily2(daily2);

//     // get ds thoa man
//     const dssp = donhang.dssanpham.map((sp) => ({
//       ...sp.sanpham,
//       soluong: sp.soluong,
//     }));
//     handleGetDsThoaman(dssp, hodan);
//     setLoading(false);
//   };

//   const getMappedDSSP = (dssp) => {
//     let arr =
//       dssp &&
//       dssp.length &&
//       dssp.map((sp) => ({ ...sp.sanpham, soluong: sp.soluong }));
//     return arr;
//   };

//   useEffect(() => {
//     fetchDsDonhang();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (loading) {
//     return <BackdropMaterial />;
//   }

//   return (
//     <>
//       <Container>
//         <Header
//           title="Quay lại danh sách đơn hàng"
//           titleBack
//           onClick={() => props.history.push("/daily2/donhang")}
//           headerRight={
//             <button className="btn btn-primary px-3" onClick={handleSubmit}>
//               <span>Lưu</span>
//               <i class="fas fa-save"></i>
//             </button>
//           }
//         />
//         <Content>
//           <Form className="px-5">
//             <FormContent>
//               <FormTitle>Phân phát đơn hàng</FormTitle>
//               <FormGroup>
//                 <Label>
//                   <img src={ma} alt="ma" />
//                   <span>Mã đơn hàng:</span>
//                 </Label>
//                 <Input type="text" defaultValue={singleDonhang?.ma} disabled />
//               </FormGroup>

//               <FormGroup>
//                 <Label>
//                   <img src={hodan} alt="hodan" />
//                   <span>Hộ dân:</span>
//                 </Label>
//                 {dsHodan && dsHodan.length ? (
//                   <MultipleSelect
//                     label="Chọn hộ dân"
//                     value={selectedHodan}
//                     onChange={handleChangeDaily2}
//                   >
//                     {dsHodan.map((hd) =>
//                       hd.dsthoaman.length ? (
//                         <MenuItem key={hd._id} value={hd._id}>
//                           {hd.daidien}
//                         </MenuItem>
//                       ) : null
//                     )}
//                   </MultipleSelect>
//                 ) : (
//                   <MultipleSelect label="Chọn hộ dân" />
//                 )}
//                 {selectedHodan.length === 0 && <ErrMsg>{errMsg}</ErrMsg>}
//               </FormGroup>
//             </FormContent>

//             <TableSection className="noCheckbox">
//               <TableTitle>
//                 <img src={dssanpham} alt="dssanpham" />
//                 <span>Sản phẩm đơn hàng</span>
//               </TableTitle>
//               <TableDonhangGoc donhang={singleDonhang} />
//               <div className="text-right">
//                 <Total>Tổng đơn hàng:</Total>
//                 <TotalValue>
//                   {formatMoney(
//                     singleDonhang?.dssanpham.length &&
//                       getTongDonhang(getMappedDSSP(singleDonhang?.dssanpham))
//                   )}
//                 </TotalValue>
//               </div>
//             </TableSection>

//             {dsHodan.map((hd) =>
//               selectedHodan.includes(hd._id) ? (
//                 <TableSection className="noCheckbox">
//                   <TableTitle>
//                     <img src={hodan} alt="hodan" />
//                     <span>{hd?.daidien}</span>
//                   </TableTitle>
//                   <TableSanphamDonhang
//                     dsSanpham={hd?.dsthoaman}
//                     handleChangeSlSanpham={handleChangeSlSanpham}
//                     dl2Id={hd._id}
//                   />
//                   <div className="text-right">
//                     <Total>Tổng đơn hàng:</Total>
//                     <TotalValue>
//                       {formatMoney(getTongDonhang(hd?.dsthoaman))}
//                     </TotalValue>
//                   </div>
//                 </TableSection>
//               ) : null
//             )}
//           </Form>
//         </Content>
//       </Container>
//     </>
//   );
// };

// export default DonhangThem;
