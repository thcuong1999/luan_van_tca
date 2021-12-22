import React, { useEffect, useState } from "react";
import TableNguyenlieu from "./tables/TableNguyenlieu";
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
import apiDaily2 from "../../axios/apiDaily2";
import ModalHuloi from "../../components/ModalHuloi";
import { links } from "./arrayOfLinks";
import { getCurrentDate, thisMonth } from "../../utils";
import DialogMaterial from "../../components/DialogMaterial";
import Thongke from "../../components/Thongke";

const Nguyenlieu = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "madh"]);
  const [loading, setLoading] = useState(false);
  const [dsNguyenlieu, setDsNguyenlieu] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  //---------------
  const [open, setOpen] = useState(false);
  const [dsNguyenlieuHuloiShow, setDsNguyenlieuHuloiShow] = useState([]);
  const [dsNguyenlieuHuloi, setDsNguyenlieuHuloi] = useState([]);
  const [daily2Info, setDaily2Info] = useState(null);
  const [active, setActive] = useState({
    code: 1,
    present: "dsnguyenlieu",
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
    let dsngl = [];
    for (const ngl of dsNguyenlieu) {
      const ngtao = new Date(ngl.ngaytao.split("/").reverse().join("-"));
      if (ngtao >= startDay && ngtao <= endDay) {
        dsngl = [ngl, ...dsngl];
      }
    }
    setdsThongke(dsngl);
  };

  const handleClickNam = () => {
    setThongkeType("nam");
    const currentYear = new Date().getFullYear();
    const startDay = new Date(`${currentYear}-01-01`);
    const endDay = new Date(`${currentYear}-12-31`);
    let dsngl = [];
    for (const ngl of dsNguyenlieu) {
      const ngtao = new Date(ngl.ngaytao.split("/").reverse().join("-"));
      if (ngtao >= startDay && ngtao <= endDay) {
        dsngl = [ngl, ...dsngl];
      }
    }
    setdsThongke(dsngl);
  };

  const handleClickThongke = () => {
    if (validateDate()) {
      setThongkeType("range");
      const startDay = new Date(dateRange.from);
      const endDay = new Date(dateRange.to);
      let dsngl = [];
      for (const ngl of dsNguyenlieu) {
        const ngtao = new Date(ngl.ngaytao.split("/").reverse().join("-"));
        if (ngtao >= startDay && ngtao <= endDay) {
          dsngl = [ngl, ...dsngl];
        }
      }
      setdsThongke(dsngl);
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
    const { success } = await apiDaily2.themNguyenlieuHuloi(daily2Info._id, {
      dsnglLoi: dsNguyenlieuHuloi,
    });
    if (success) {
      setOpen(false);
      toast.success("Thêm thành công!", { theme: "colored" });
      fetchDsNguyenlieu();
    }
  };

  const fetchDsNguyenlieu = async () => {
    setLoading(true);
    const { daily2 } = await apiDaily2.singleDaily2BasedUser(userInfo._id);
    let { dsnguyenlieu } = await apiDaily2.dsNguyenlieu(daily2._id);
    dsnguyenlieu = dsnguyenlieu.map((ngl) => ({
      ...ngl.nguyenlieu,
      ...ngl,
      madh: ngl.donhang.ma,
    }));
    let { dsnguyenlieuhuloi } = await apiDaily2.dsNguyenlieuHuloi(daily2._id);
    dsnguyenlieuhuloi = dsnguyenlieuhuloi.map((ngl) => ({
      ...ngl.nguyenlieu,
      ...ngl,
      madh: ngl.donhang.ma,
    }));
    setDaily2Info(daily2);
    setDsNguyenlieuHuloiShow(dsnguyenlieuhuloi);
    setDsNguyenlieu(dsnguyenlieu);
    setLoading(false);
  };

  const search = (dsNguyenlieu) => {
    return (
      dsNguyenlieu &&
      dsNguyenlieu.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    fetchDsNguyenlieu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Nguyên liệu" arrOfLinks={links} vaitro="daily2" />
        <Content>
          <div className="text-right mb-3">
            {active.code === 1 ? (
              <Button
                className="btn btn-primary px-4"
                onClick={() =>
                  setActive({ code: 2, present: "dsnguyenlieuhuloi" })
                }
              >
                Hư lỗi
              </Button>
            ) : (
              <Button
                className="btn btn-primary px-3"
                onClick={() => setActive({ code: 1, present: "dsnguyenlieu" })}
              >
                Danh sách
              </Button>
            )}
          </div>
          <FilterSection>
            <TitleWrapper>
              <Title>
                {active.code === 1
                  ? "Danh sách nguyên liệu"
                  : "Danh sách nguyên liệu hư lỗi"}
              </Title>
            </TitleWrapper>

            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim nguyên liệu theo tên, mã đơn hàng"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            {active.code === 1 ? (
              <TableSection>
                <TableNguyenlieu
                  dsNguyenlieu={search(dsNguyenlieu)}
                  setOpen={setOpen}
                  setDsNguyenlieuHuloi={setDsNguyenlieuHuloi}
                />
              </TableSection>
            ) : active.code === 2 ? (
              <TableSection className="noCheckbox">
                <TableNguyenlieu
                  dsNguyenlieu={dsNguyenlieuHuloiShow}
                  dsnguyenlieuhuloi
                />
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
            dsNguyenlieu={dsThongke}
            thongkeType={thongkeType}
          />
        </Content>
      </Container>

      <ModalHuloi
        type="nguyenlieu"
        open={open}
        setOpen={setOpen}
        dsNguyenlieuHuloi={dsNguyenlieuHuloi}
        setDsNguyenlieuHuloi={setDsNguyenlieuHuloi}
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

export default Nguyenlieu;
