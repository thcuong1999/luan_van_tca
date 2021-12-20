import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import Header from "../../components/Header";
import {
  Container,
  Content,
  Filter,
  FilterSection,
  SearchBox,
  TableSection,
  Title,
  TitleWrapper,
} from "./styledComponents";

import TableDonhang from "./tables/TableDonhang";
import { useSelector } from "react-redux";
import apiDaily1 from "../../axios/apiDaily1";
import { links } from "./arrayOfLinks";

const Donhang = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ma"]);
  const [loading, setLoading] = useState(false);
  const [dsDonhang, setDsDonhang] = useState([]);
  const [rowsRemoved, setRowsRemoved] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const fetchDsSanpham = async () => {
    setLoading(true);
    const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    const { donhang } = await apiDaily1.dsDonhang(daily1._id);
    setDsDonhang(donhang);
    setLoading(false);
  };

  const search = (dsSanpham) => {
    return (
      dsSanpham &&
      dsSanpham.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    setRowsRemoved(false);
    fetchDsSanpham();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Đơn hàng" arrOfLinks={links} vaitro="daily1" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách đơn hàng</Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tìm đơn hàng theo mã"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableDonhang
                dsDonhang={search(dsDonhang)}
                setRowsRemoved={setRowsRemoved}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Donhang;
