import React, { useEffect, useState } from "react";
import TableCongcu from "./tables/TableCongcu";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BackdropMaterial from "../../components/BackdropMaterial";
import {
  Button,
  Container,
  Content,
  Filter,
  FilterSection,
  SearchBox,
  TableSection,
  Title,
  TitleWrapper,
} from "./styledComponents";
import Header from "../../components/Header";
import apiDaily1 from "../../axios/apiDaily1";
import ModalHuloi from "../../components/ModalHuloi";
import { links } from "./arrayOfLinks";
import { getCurrentDate, thisMonth } from "../../utils";
import DialogMaterial from "../../components/DialogMaterial";
import Thongke from "../../components/Thongke";

const Congcu = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "madh"]);
  const [loading, setLoading] = useState(false);
  const [dsCongcu, setDsCongcu] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  //-------------------------
  const [open, setOpen] = useState(false);
  const [dsCongcuHuloiShow, setDsCongcuHuloiShow] = useState([]);
  const [dsCongcuHuloi, setDsCongcuHuloi] = useState([]);
  const [daily1Info, setDaily1Info] = useState(null);
  const [active, setActive] = useState({
    code: 1,
    present: "dscongcu",
  });
  //-------------------
  const [alert, setAlert] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState(false);
  const [dsThongke, setdsThongke] = React.useState([]);
  const [thongkeType, setThongkeType] = useState("");
  const [dateRange, setDateRange] = React.useState({
    from: "",
    to: "",
  });

  const handleClickThang = () => {
    setThongkeType("thang");
    const { firstDay, lastDay } = thisMonth();
    const startDay = new Date(firstDay);
    const endDay = new Date(lastDay);
    let dsvt = [];
    for (const vt of dsCongcu) {
      const ngtao = new Date(vt.ngaytao.split("/").reverse().join("-"));
      if (ngtao >= startDay && ngtao <= endDay) {
        dsvt = [vt, ...dsvt];
      }
    }
    setdsThongke(dsvt);
  };

  const handleClickNam = () => {
    setThongkeType("nam");
    const currentYear = new Date().getFullYear();
    const startDay = new Date(`${currentYear}-01-01`);
    const endDay = new Date(`${currentYear}-12-31`);
    let dsvt = [];
    for (const vt of dsCongcu) {
      const ngtao = new Date(vt.ngaytao.split("/").reverse().join("-"));
      if (ngtao >= startDay && ngtao <= endDay) {
        dsvt = [vt, ...dsvt];
      }
    }
    setdsThongke(dsvt);
  };

  const handleClickThongke = () => {
    if (validateDate()) {
      setThongkeType("range");
      const startDay = new Date(dateRange.from);
      const endDay = new Date(dateRange.to);
      let dsvt = [];
      for (const vt of dsCongcu) {
        const ngtao = new Date(vt.ngaytao.split("/").reverse().join("-"));
        if (ngtao >= startDay && ngtao <= endDay) {
          dsvt = [vt, ...dsvt];
        }
      }
      setdsThongke(dsvt);
    }
  };

  const validateDate = () => {
    const from = new Date(dateRange.from);
    const to = new Date(dateRange.to);
    const today = new Date(getCurrentDate());
    if (!dateRange.from) {
      setAlertMsg("Vui lòng nhập ngày bắt đầu");
      handleOpen();
      return false;
    }
    if (from > today) {
      setAlertMsg("Ngày bắt đầu không hợp lệ");
      handleOpen();
      return false;
    }
    if (!dateRange.to) {
      setAlertMsg("Vui lòng nhập ngày kết thúc");
      handleOpen();
      return false;
    }
    if (from > to || to < from) {
      setAlertMsg("Ngày bắt đầu vượt quá ngày kết thúc");
      handleOpen();
      return false;
    }
    return true;
  };

  const handleOpen = () => setAlert(true);
  const handleClose = () => setAlert(false);

  const handleChangeDateFrom = (e) => {
    setDateRange({ ...dateRange, from: e.target.value });
  };

  const handleChangeDateTo = (e) => {
    setDateRange({ ...dateRange, to: e.target.value });
  };

  const handleClick = async () => {
    const { success } = await apiDaily1.themCongcuHuloi(daily1Info._id, {
      dsccLoi: dsCongcuHuloi,
    });
    if (success) {
      setOpen(false);
      toast.success("Thêm thành công!", { theme: "colored" });
      fetchDsCongcu();
    }
  };

  const fetchDsCongcu = async () => {
    setLoading(true);
    const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    let { dscongcu } = await apiDaily1.dsCongcu(daily1._id);
    dscongcu = dscongcu.map((cc) => ({
      ...cc.congcu,
      ...cc,
      madh: cc.donhang.ma,
    }));
    let { dscongcuhuloi } = await apiDaily1.dsCongcuHuloi(daily1._id);
    dscongcuhuloi = dscongcuhuloi.map((cc) => ({
      ...cc.congcu,
      ...cc,
      madh: cc.donhang.ma,
    }));
    setDaily1Info(daily1);
    setDsCongcuHuloiShow(dscongcuhuloi);
    setDsCongcu(dscongcu);
    setLoading(false);
  };

  const search = (dsCongcu) => {
    return (
      dsCongcu &&
      dsCongcu.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    fetchDsCongcu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Công cụ" arrOfLinks={links} vaitro="daily1" />
        <Content>
          <div className="text-right mb-3">
            {active.code === 1 ? (
              <Button
                className="btn btn-primary px-4"
                onClick={() => setActive({ code: 2, present: "dscongcuhuloi" })}
              >
                Hư lỗi
              </Button>
            ) : (
              <Button
                className="btn btn-primary px-3"
                onClick={() => setActive({ code: 1, present: "dscongcu" })}
              >
                Danh sách
              </Button>
            )}
          </div>
          <FilterSection>
            <TitleWrapper className="d-flex justify-content-between align-items-center">
              <Title>
                {active.code === 1
                  ? "Danh sách công cụ"
                  : "Danh sách công cụ hư lỗi"}
              </Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim công cụ theo mã đơn hàng, tên công cụ"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            {active.code === 1 ? (
              <TableSection>
                <TableCongcu
                  dsCongcu={search(dsCongcu)}
                  setOpen={setOpen}
                  setDsCongcuHuloi={setDsCongcuHuloi}
                />
              </TableSection>
            ) : active.code === 2 ? (
              <TableSection className="noCheckbox">
                <TableCongcu dsCongcu={dsCongcuHuloiShow} dscongcuhuloi />
              </TableSection>
            ) : null}
          </FilterSection>

          <Thongke
            onClickThang={handleClickThang}
            onClickNam={handleClickNam}
            onClickThongke={handleClickThongke}
            handleChangeDateFrom={handleChangeDateFrom}
            handleChangeDateTo={handleChangeDateTo}
            fromDate={dateRange.from}
            toDate={dateRange.to}
            dsCongcu={dsThongke}
            thongkeType={thongkeType}
          />
        </Content>
      </Container>

      <ModalHuloi
        type="congcu"
        open={open}
        setOpen={setOpen}
        dsCongcuHuloi={dsCongcuHuloi}
        setDsCongcuHuloi={setDsCongcuHuloi}
        onClick={handleClick}
      />

      <DialogMaterial
        open={alert}
        onClose={handleClose}
        title="Lỗi"
        content={alertMsg}
        text2="OK"
        onClick2={handleClose}
      />
    </>
  );
};

export default Congcu;
