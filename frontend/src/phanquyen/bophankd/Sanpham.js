import React from "react";
import TableSanpham from "./tables/TableSanpham";
import apiBophankd from "../../axios/apiBophankd";
import { useSelector } from "react-redux";
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
import { links } from "./arrayOfLinks";
const Sanpham = (props) => {
  const [query, setQuery] = React.useState("");
  const [searchColumns] = React.useState(["ma", "madh", "ten"]);
  const [loading, setLoading] = React.useState(false);
  const [dsSanpham, setDsSanpham] = React.useState([]);
  const { userInfo } = useSelector((state) => state.user);

  const fetchDsSanpham = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.bophankdBasedUserId(userInfo._id);
    let { dssanpham } = await apiBophankd.bophankdDSSanpham(bophankd._id);
    dssanpham = dssanpham.map((sp) => ({
      ...sp.sanpham,
      ...sp,
      madh: sp.donhang.ma,
    }));
    setDsSanpham(dssanpham);
    setLoading(false);
  };

  console.log({ dsSanpham });

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
        <Header title="Sản phẩm" arrOfLinks={links} vaitro="bophankd" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách sản phẩm</Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tìm sản phẩm theo mã sản phẩm, mã đơn hàng, tên sản phẩm"
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
