import React, { useEffect, useState } from "react";
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
import TableHodan from "./tables/TableHodan";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiDaily1 from "../../axios/apiDaily1";
import { useSelector } from "react-redux";
import { links } from "./arrayOfLinks";

const Hodan = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState([
    "daidien",
    "sdt",
    "cmnd",
    "taikhoan",
    "namsinh",
  ]);
  const [dsHodan, setDsHodan] = useState([]);
  const [daily1Info, setDaily1Info] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const fetchDsHodan = async () => {
    setLoading(true);
    const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    const { hodan } = await apiDaily1.dsHodan(daily1._id);
    setDaily1Info(daily1);
    setDsHodan(hodan && hodan.length ? hodan : []);
    setLoading(false);
  };

  const search = (dsHodan) => {
    return (
      dsHodan &&
      dsHodan.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    setSuccess(false);
    fetchDsHodan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Hộ dân" arrOfLinks={links} vaitro="daily1" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách hộ dân</Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim hộ dân theo tên đại diện, số điện thoại, cmnd, tài khoản, năm sinh"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>
            <TableSection className="noCheckbox">
              <TableHodan
                dsHodan={search(dsHodan)}
                setSuccess={setSuccess}
                daily1Id={daily1Info?._id}
                setRefresh={props.setRefresh}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Hodan;
