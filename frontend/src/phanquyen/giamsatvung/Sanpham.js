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
import apiGSV from "../../axios/apiGSV";
import { links } from "./arrayOfLinks";

const Sanpham = (props) => {
  const [query, setQuery] = React.useState("");
  const [searchColumns] = React.useState(["ma", "ten", "madh"]);
  const [loading, setLoading] = React.useState(false);
  const [dsSanpham, setDsSanpham] = React.useState([]);
  const { userInfo } = useSelector((state) => state.user);

  const fetchDsSanpham = async () => {
    setLoading(true);
    const { gsv } = await apiGSV.singleGsvBasedUserId(userInfo._id);
    let { dssanpham } = await apiGSV.dsSanpham(gsv._id);
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
        <Header title="Sản phẩm" arrOfLinks={links} vaitro="giamsatvung" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách sản phẩm</Title>
              <AddButton
                className="btn btn-primary"
                onClick={() =>
                  props.history.push("/giamsatvung/sanpham/giaohang")
                }
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
                  placeholder="Tìm sản phẩm theo mã đơn hàng, mã sản phẩm, tên sản phẩm"
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
