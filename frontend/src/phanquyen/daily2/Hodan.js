import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  AddButton,
  Container,
  Content,
  Filter,
  FilterSection,
  SearchBox,
  TableSection,
  Title,
  TitleWrapper,
} from "./styledComponents";
import TableHodan from "./tables/TableHodan";
import BackdropMaterial from "../../components/BackdropMaterial";
import { useSelector } from "react-redux";
import apiDaily2 from "../../axios/apiDaily2";
import { links } from "./arrayOfLinks";

const Hodan = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState([
    "daidien",
    "sdt",
    "cmnd",
    "taikhoan",
    "namsinh",
  ]);
  const [dsHodan, setDsHodan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsRemoved, setRowsRemoved] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const fetchDsHodan = async () => {
    setLoading(true);
    const { daily2 } = await apiDaily2.singleDaily2BasedUser(userInfo._id);
    const { hodan } = await apiDaily2.dsHodan(daily2._id);
    setDsHodan(
      hodan && hodan.length
        ? hodan.map((item) => ({
            ...item,
            taikhoan: item.user ? item.user?.taikhoan : "",
            langnghe: item.langnghe ? item.langnghe?.ten : "",
            langngheId: item.langnghe?._id,
          }))
        : []
    );
    setLoading(false);
  };

  const search = (dsHodan) => {
    return (
      dsHodan &&
      dsHodan.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    setRowsRemoved(false);
    fetchDsHodan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Hộ dân" arrOfLinks={links} vaitro="daily2" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách hộ dân</Title>
              <AddButton
                className="btn btn-primary"
                onClick={() => props.history.push("/daily2/hodan/them")}
              >
                <span>Thêm</span>
                <i class="fas fa-plus-circle"></i>
              </AddButton>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim hộ dân theo tên đại diện, số điện thoại, cmnd, tài khoản, năm sinh"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>
            <TableSection>
              <TableHodan
                dsHodan={search(dsHodan)}
                setRowsRemoved={setRowsRemoved}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Hodan;
