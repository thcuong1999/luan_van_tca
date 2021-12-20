import React from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import Header from "../../components/Header";
import TableLoaiSanpham from "./tables/TableLoaiSanpham";
import apiLoaiSanpham from "../../axios/apiLoaiSanpham";
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

const LoaiSanpham = (props) => {
  const [query, setQuery] = React.useState("");
  const [searchColumns] = React.useState(["ma", "ten", "mota"]);
  const [loading, setLoading] = React.useState(false);
  const [dsSanpham, setDsSanpham] = React.useState([]);
  const [rowsRemoved, setRowsRemoved] = React.useState(false);

  const fetchDsSanpham = async () => {
    setLoading(true);
    const { loaiSanpham } = await apiLoaiSanpham.dsLoaiSanpham();
    setDsSanpham(loaiSanpham);
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

  React.useEffect(() => {
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
        <Header title="Loại sản phẩm" arrOfLinks={links} vaitro="admin" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách loại sản phẩm</Title>
              <AddButton
                className="btn btn-primary"
                onClick={() => props.history.push("/admin/loaisanpham/them")}
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
                  placeholder="Tìm loại sản phẩm theo mã, tên và mô tả"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableLoaiSanpham
                dsSanpham={search(dsSanpham)}
                setRowsRemoved={setRowsRemoved}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default LoaiSanpham;
