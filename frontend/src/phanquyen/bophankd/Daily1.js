import React from "react";
import TableDaily1 from "./tables/TableDaily1";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiBophankd from "../../axios/apiBophankd";
import { useSelector } from "react-redux";
import {
  Content,
  Filter,
  FilterSection,
  SearchBox,
  TableSection,
  Title,
  TitleWrapper,
  Container,
} from "./styledComponents";
import Header from "../../components/Header";
import { links } from "./arrayOfLinks";

const Daily1 = (props) => {
  const [query, setQuery] = React.useState("");
  const [searchColumns] = React.useState(["ten", "sdt", "email", "taikhoan"]);
  const [loading, setLoading] = React.useState(false);
  const [dsDaily1, setDsDaily1] = React.useState([]);
  const [bophankdInfo, setbophankdInfo] = React.useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [success, setSuccess] = React.useState(false);

  const fetchDsDaily1 = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.bophankdBasedUserId(userInfo._id);
    const {
      daily1: { daily1 },
    } = await apiBophankd.bophankdDsDaily1(bophankd._id);
    setDsDaily1(daily1 && daily1.length ? daily1 : []);
    setbophankdInfo(bophankd);
    setLoading(false);
  };

  const search = (dsDaily1) => {
    return (
      dsDaily1 &&
      dsDaily1.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  console.log({ dsDaily1 });

  React.useEffect(() => {
    setSuccess(false);
    fetchDsDaily1();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Đại lý cấp 1" arrOfLinks={links} vaitro="bophankd" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách đại lý cấp 1</Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim đại lý theo tên, số điện thoại, email và tài khoản"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection className="noCheckbox">
              <TableDaily1
                dsDaily1={search(dsDaily1)}
                setSuccess={setSuccess}
                bophankdId={bophankdInfo._id}
                setRefresh={props.setRefresh}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Daily1;
