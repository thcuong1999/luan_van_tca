import React from "react";
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
import TableDonhang from "./tables/TableDonhang";
import apiBophankd from "../../axios/apiBophankd";
import { useSelector } from "react-redux";
import { links } from "./arrayOfLinks";

const Donhang = (props) => {
  const [query, setQuery] = React.useState("");
  const [searchColumns] = React.useState(["ma"]);
  const [loading, setLoading] = React.useState(false);
  const [dsDonhang, setDsDonhang] = React.useState([]);
  const [rowsRemoved, setRowsRemoved] = React.useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const fetchDsSanpham = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.bophankdBasedUserId(userInfo._id);
    const { donhang } = await apiBophankd.dsDonhang(bophankd._id);
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
        <Header title="Đơn hàng" arrOfLinks={links} vaitro="bophankd" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách đơn hàng</Title>
              <AddButton
                className="btn btn-primary"
                onClick={() => props.history.push("/bophankd/donhang/them")}
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
