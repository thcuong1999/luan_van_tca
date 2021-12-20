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
import TableLangnghe from "./tables/TableLangnghe";
import apiLangnghe from "../../axios/apiLangnghe";
import BackdropMaterial from "../../components/BackdropMaterial";
import { links } from "./arrayOfLinks";

const Langnghe = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "tinh", "huyen"]);
  const [dsLangnghe, setDsLangnghe] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsRemoved, setRowsRemoved] = useState(false);

  const fetchDsLangnghe = async () => {
    setLoading(true);
    const { langnghe } = await apiLangnghe.dsLangnghe();
    setDsLangnghe(langnghe && langnghe.length ? langnghe : []);
    setLoading(false);
  };

  const search = (dsLangnghe) => {
    return (
      dsLangnghe &&
      dsLangnghe.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    setRowsRemoved(false);
    fetchDsLangnghe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Làng nghề" arrOfLinks={links} vaitro="giamsatvung" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách làng nghề</Title>
              <AddButton
                className="btn btn-primary"
                onClick={() => props.history.push("/giamsatvung/langnghe/them")}
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
                  placeholder="Tim làng nghề theo tên, tỉnh, huyện"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableLangnghe
                dsLangnghe={search(dsLangnghe)}
                setRowsRemoved={setRowsRemoved}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Langnghe;
