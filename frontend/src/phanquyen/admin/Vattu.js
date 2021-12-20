import React, { useEffect, useState } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import Header from "../../components/Header";
import TableVattu from "./tables/TableVattu";
import apiVattu from "../../axios/apiVattu";
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

const Vattu = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "congdung"]);
  const [loading, setLoading] = useState(false);
  const [dsVattu, setDsVattu] = useState([]);
  const [rowsRemoved, setRowsRemoved] = useState(false);

  const fetchDsVattu = async () => {
    setLoading(true);
    const { vattu } = await apiVattu.dsVattu();
    setDsVattu(vattu);
    setLoading(false);
  };

  const search = (dsVattu) => {
    return (
      dsVattu &&
      dsVattu.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    setRowsRemoved(false);
    fetchDsVattu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Vật tư" arrOfLinks={links} vaitro="admin" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách vật tư</Title>
              <AddButton
                className="btn btn-primary"
                onClick={() => props.history.push("/admin/vattu/them")}
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
                  placeholder="Tim vật tư theo tên, công dụng"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>
            <TableSection>
              <TableVattu
                dsVattu={search(dsVattu)}
                setRowsRemoved={setRowsRemoved}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Vattu;
