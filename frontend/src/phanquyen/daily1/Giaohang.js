import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiGiaohang from "../../axios/apiGiaohang";
import BackdropMaterial from "../../components/BackdropMaterial";
import DialogMaterial from "../../components/DialogMaterial";
import DropdownMaterial2 from "../../components/DropdownMaterial2";
import Header from "../../components/Header";
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
} from "./styledComponents";
import TableGiaohang from "./tables/TableGiaohang";
import { toast } from "react-toastify";
import apiDaily1 from "../../axios/apiDaily1";
import { EmptyGiaohang } from "../daily2/styledComponents";

const Giaohang = (props) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [dsDonhang, setDsDonhang] = useState([]);
  const [dsSanpham, setDsSanpham] = useState([]);
  const [selectedDonhang, setSelectedDonhang] = useState(null);
  const [daily1Info, setDaily1Info] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeSL = (e, spId) => {
    if (!exceedSoluong(e.target.value, spId)) {
      let temp = [...dsSanpham];
      temp = temp.map((item) =>
        item._id === spId ? { ...item, slgiao: e.target.value } : item
      );
      setDsSanpham(temp);
    }
  };

  const exceedSoluong = (value, spId) => {
    const sp = dsSanpham.find((sp) => sp._id === spId);
    if (value > sp.danhan - sp.dagiao) {
      setAlertMsg("Số lượng không hợp lệ");
      handleOpen();
      return true;
    }
    return false;
  };

  const handleChangeDonhang = (e) => {
    const val = e.target.value;
    setSelectedDonhang(val);
    let { dssanpham } = dsDonhang.find((dh) => dh._id === val);
    dssanpham = dssanpham.filter((sp) => sp.danhan - sp.dagiao >= 1);
    dssanpham = dssanpham.map((sp) => ({
      ...sp.sanpham,
      slgiao: 1,
      dagiao: sp.dagiao,
      danhan: sp.danhan,
      soluong: sp.soluong,
      soluonghoanthanh: sp.soluonghoanthanh,
    }));
    console.log({ dssanpham });
    setDsSanpham(dssanpham);
  };

  const fetchDsDonhang = async () => {
    setLoading(true);
    const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    let { donhang } = await apiDaily1.dsDonhang(daily1._id);
    setDaily1Info(daily1);
    setDsDonhang(donhang);
    setLoading(false);
  };

  const emptyField = () => {
    if (!selectedDonhang) {
      setErrMsg("Vui lòng chọn đơn hàng");
      return true;
    } else if (dsSanpham.length === 0) {
      setAlertMsg("Không có sản phẩm giao");
      handleOpen();
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (!emptyField()) {
      const dl = {
        daily1Id: daily1Info._id,
        donhangId: selectedDonhang,
        dssanpham: dsSanpham.map((sp) => ({
          sanpham: sp._id,
          dagiao: parseInt(sp.slgiao),
        })),
      };

      const { success } = await apiGiaohang.daily1ToGSV(dl);
      if (success) {
        toast.success("Thêm thành công!", { theme: "colored" });
        props.history.push("/daily1/hanggiaodi");
      }
    }
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
          title="Quay lại danh sách sản phẩm"
          titleBack
          onClick={() => props.history.push("/daily1/sanpham")}
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
                <span>Giao hàng</span>
              </FormTitle>

              <FormGroup>
                <Label>
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
            </FormContent>

            <div className="px-3 py-5">
              {selectedDonhang ? (
                <>
                  <TableSection className="noCheckbox">
                    <TableGiaohang
                      dsSanpham={dsSanpham}
                      handleChangeSL={handleChangeSL}
                    />
                  </TableSection>
                  {!dsSanpham.length && (
                    <EmptyGiaohang>
                      Không còn hoặc không có hàng để giao
                    </EmptyGiaohang>
                  )}
                </>
              ) : null}
            </div>
          </Form>
        </Content>
      </Container>

      <DialogMaterial
        open={open}
        onClose={handleClose}
        title="Lỗi"
        content={alertMsg}
        text2="OK"
        onClick2={handleClose}
      />
    </>
  );
};

export default Giaohang;
