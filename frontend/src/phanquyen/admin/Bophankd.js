import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import TableBophankd from "./tables/TableBophankd";
import apiBophankd from "../../axios/apiBophankd";
import BackdropMaterial from "../../components/BackdropMaterial";
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
import { links } from "./arrayOfLinks";

const Bophankd = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "sdt", "email", "taikhoan"]);
  const [dsBophankd, setDsBophankd] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsRemoved, setRowsRemoved] = useState(false);

  const search = (dsBpkd) => {
    return (
      dsBpkd &&
      dsBpkd.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  const fetchDsBophankd = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.dsBophankd();
    setDsBophankd(
      bophankd && bophankd.length
        ? bophankd.map((item) => ({
            ...item,
            taikhoan: item.user ? item.user.taikhoan : "",
          }))
        : []
    );
    setLoading(false);
  };

  useEffect(() => {
    setRowsRemoved(false);
    fetchDsBophankd();
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Bộ phận kinh doanh" arrOfLinks={links} vaitro="admin" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách bộ phận kinh doanh</Title>
              <AddButton
                className="btn btn-primary"
                onClick={() => props.history.push("/admin/bophankd/them")}
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
                  placeholder="Tim bộ phận kinh doanh theo tên, số điện thoại, email, tài khoản"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>
            <TableSection>
              <TableBophankd
                dsBophankd={search(dsBophankd)}
                setRowsRemoved={setRowsRemoved}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Bophankd;
