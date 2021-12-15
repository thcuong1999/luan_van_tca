import React from "react";
import TableSanpham from "./tables/TableSanpham";
import { useSelector } from "react-redux";
import BackdropMaterial from "../../components/BackdropMaterial";
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

import apiDaily2 from "../../axios/apiDaily2";
import { links } from "./arrayOfLinks";

const Sanpham = (props) => {
  const [query, setQuery] = React.useState("");
  const [searchColumns] = React.useState(["ma"]);
  const [loading, setLoading] = React.useState(false);
  const [dsSanpham, setDsSanpham] = React.useState([]);
  const { userInfo } = useSelector((state) => state.user);

  const fetchDsSanpham = async () => {
    setLoading(true);
    const { daily2 } = await apiDaily2.singleDaily2BasedUser(userInfo._id);
    let { dssanpham } = await apiDaily2.dsSanpham(daily2._id);
    dssanpham = dssanpham.map((sp) => ({
      ...sp.sanpham,
      ...sp,
      ma: sp.donhang.ma,
    }));
    setDsSanpham(dssanpham);
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
    fetchDsSanpham();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Sản phẩm" arrOfLinks={links} />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách sản phẩm</Title>
              <AddButton
                className="btn btn-primary"
                onClick={() => props.history.push("/daily2/sanpham/giaohang")}
              >
                <span>Giao hàng</span>
                <i class="fas fa-plus-circle"></i>
              </AddButton>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tìm sản phẩm theo mã"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection className="noCheckbox">
              <TableSanpham dsSanpham={search(dsSanpham)} />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Sanpham;
