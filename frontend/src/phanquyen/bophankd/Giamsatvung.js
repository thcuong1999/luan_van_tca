import React from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiBophankd from "../../axios/apiBophankd";
import { useSelector } from "react-redux";
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
import Header from "../../components/Header";
import TableGiamsatvung from "./tables/TableGiamsatvung";
import { links } from "./arrayOfLinks";

const Giamsatvung = (props) => {
  const [query, setQuery] = React.useState("");
  const [searchColumns] = React.useState(["ten", "sdt", "email", "taikhoan"]);
  const [loading, setLoading] = React.useState(false);
  const [dsGiamsatvung, setDsGiamsatvung] = React.useState([]);
  const [bophankdInfo, setBophankdInfo] = React.useState(null);
  const { userInfo } = useSelector((state) => state.user);
  const [rowsRemoved, setRowsRemoved] = React.useState(false);

  const fetchDsDaily1 = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.bophankdBasedUserId(userInfo._id);
    const { giamsatvung } = await apiBophankd.bophankdDsGSV(bophankd._id);
    setDsGiamsatvung(
      giamsatvung && giamsatvung.length
        ? giamsatvung.map((item) => ({
            ...item,
            taikhoan: item.user ? item.user.taikhoan : "",
          }))
        : []
    );
    setBophankdInfo(bophankd);
    setLoading(false);
  };

  const search = (dsGSV) => {
    return (
      dsGSV &&
      dsGSV.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  React.useEffect(() => {
    setRowsRemoved(false);
    fetchDsDaily1();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Giám sát vùng" arrOfLinks={links} vaitro="bophankd" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách giám sát vùng</Title>
              <AddButton
                className="btn btn-primary"
                onClick={() => props.history.push("/bophankd/giamsatvung/them")}
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
                  placeholder="Tim giám sát vùng theo tên, công dụng"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableGiamsatvung
                dsGiamsatvung={search(dsGiamsatvung)}
                bophankdId={bophankdInfo?._id}
                setRowsRemoved={setRowsRemoved}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Giamsatvung;
