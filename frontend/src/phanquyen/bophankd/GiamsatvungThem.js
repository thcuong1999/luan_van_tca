import React, { useState } from "react";
import {
  Container,
  Content,
  FilterSection,
  FilterWrapper,
  SearchBox,
  TableSection,
  Title,
  TitleWrapper,
} from "./styledComponents";

import Header from "../../components/Header";
import BackdropMaterial from "../../components/BackdropMaterial";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";
import DialogMaterial from "../../components/DialogMaterial";
import TableGiamsatvungThem from "./tables/TableGiamsatvungThem";
import apiGSV from "../../axios/apiGSV";
import { toast } from "react-toastify";

const GiamsatvungThem = (props) => {
  const [success, setSuccess] = React.useState(false);
  const [query, setQuery] = React.useState("");
  // const [searchColumns, setSearchColumns] = React.useState([
  //   "ten",
  //   "sdt",
  //   "email",
  //   "taikhoan",
  // ]);
  const [loading, setLoading] = React.useState(false);
  const [dsGiamsatvung, setDsGiamsatvung] = React.useState([]);
  const [bophankdInfo, setBophankdInfo] = useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [dsSelectedGSV, setDsSelectedGSV] = useState([]);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleThemGSV = (gsvArr) => {
    setDsSelectedGSV(gsvArr);
    handleOpenDialog();
  };

  const handleSubmit = async () => {
    const dl = {
      bophankdId: bophankdInfo._id,
      giamsatvungArr: dsSelectedGSV,
    };
    // console.log({ dl });
    const { success } = await apiBophankd.bophankdThemGSV(dl);
    if (success) {
      toast.success("Thêm thành công!", { theme: "colored" });
      props.history.push("/bophankd/giamsatvung");
    }
  };

  // const search = (dsGsv) => {
  //   return (
  //     dsGsv &&
  //     dsGsv.filter((item) =>
  //       searchColumns.some(
  //         (col) =>
  //           item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
  //       )
  //     )
  //   );
  // };

  const fetchDsGiamsatvung = async () => {
    setLoading(true);
    const { giamsatvung } = await apiGSV.dsGSVBpkdNull();
    const data = await apiBophankd.bophankdBasedUserId(userInfo._id);
    // console.log({ daily1 });
    setDsGiamsatvung(
      giamsatvung && giamsatvung.length
        ? giamsatvung.map((item) => ({
            ...item,
            taikhoan: item.user ? item.user.taikhoan : "",
          }))
        : []
    );
    setBophankdInfo(data.bophankd);
    setLoading(false);
  };

  React.useEffect(() => {
    setSuccess(false);
    fetchDsGiamsatvung();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách giám sát vùng"
          onClick={() => props.history.push("/bophankd/giamsatvung")}
          titleBack
        />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Thêm giám sát vùng</Title>
            </TitleWrapper>
            <FilterWrapper>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim theo tên, số điện thoại, email, tài khoản"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </FilterWrapper>
          </FilterSection>

          <TableSection>
            <TableGiamsatvungThem
              dsGiamsatvung={dsGiamsatvung}
              handleThemGSV={handleThemGSV}
            />
          </TableSection>
        </Content>
      </Container>

      <DialogMaterial
        open={open}
        onClose={handleCloseDialog}
        title="Thêm giám sát vùng"
        content="Thêm tất cả các giám sát vùng đã chọn"
        text1="Hủy"
        text2="Thêm"
        onClick1={handleCloseDialog}
        onClick2={handleSubmit}
      />
    </>
  );
};

export default GiamsatvungThem;
