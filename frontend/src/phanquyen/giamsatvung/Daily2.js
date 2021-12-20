import React, { useEffect, useState } from "react";
import TableDaily2 from "./tables/TableDaily2";
import BackdropMaterial from "../../components/BackdropMaterial";
import { useSelector } from "react-redux";
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

import Header from "../../components/Header";
import apiGSV from "../../axios/apiGSV";
import { links } from "./arrayOfLinks";

const Daily2 = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "sdt", "email", "taikhoan"]);
  const [dsDaily2, setDsDaily2] = useState([]);
  const [gsvInfo, setGsvInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [success, setSuccess] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { gsv } = await apiGSV.singleGsvBasedUserId(userInfo._id);
    const { daily2 } = await apiGSV.dsDaily2(gsv._id);
    setGsvInfo(gsv);
    setDsDaily2(daily2 && daily2.length ? daily2 : []);
    setLoading(false);
  };

  const search = (dsDaily2) => {
    return (
      dsDaily2 &&
      dsDaily2.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    setSuccess(false);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Đại lý cấp 2" arrOfLinks={links} vaitro="giamsatvung" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách đại lý cấp 2</Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tìm đại lý theo tên, số điện thoại, email và tài khoản"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableDaily2
                dsDaily2={search(dsDaily2)}
                gsvId={gsvInfo?._id}
                setSuccess={setSuccess}
                setRefresh={props.setRefresh}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Daily2;
