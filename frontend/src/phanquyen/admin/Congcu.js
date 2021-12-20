import React, { useEffect, useState } from "react";
import TableCongcu from "./tables/TableCongcu";
import BackdropMaterial from "../../components/BackdropMaterial";
import Header from "../../components/Header";
import apiCongcu from "../../axios/apiCongcu";
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

const Congcu = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "congdung"]);
  const [loading, setLoading] = useState(false);
  const [dsCongcu, setDsCongcu] = useState([]);
  const [rowsRemoved, setRowsRemoved] = useState(false);

  const fetchDsCongcu = async () => {
    setLoading(true);
    const { congcu } = await apiCongcu.dsCongcu();
    setDsCongcu(congcu && congcu.length ? congcu : []);
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
    setRowsRemoved(false);
    fetchDsCongcu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Công cụ" arrOfLinks={links} vaitro="admin" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách công cụ</Title>
              <AddButton
                className="btn btn-primary"
                onClick={() => props.history.push("/admin/congcu/them")}
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
                  placeholder="Tim công cụ theo tên, công dụng"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableCongcu
                dsCongcu={search(dsCongcu)}
                setRowsRemoved={setRowsRemoved}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Congcu;
