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

import TableDaily1 from "./tables/TableDaily1";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiGSV from "../../axios/apiGSV";
import { useSelector } from "react-redux";
import { links } from "./arrayOfLinks";

const Daily1 = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "sdt", "email", "taikhoan"]);
  const [dsDaily1, setDsDaily1] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsRemoved, setRowsRemoved] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const fetchDsDaily1 = async () => {
    setLoading(true);
    const { gsv } = await apiGSV.singleGsvBasedUserId(userInfo._id);
    const { daily1 } = await apiGSV.dsDaily1(gsv._id);
    setDsDaily1(daily1 && daily1.length ? daily1 : []);
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

  useEffect(() => {
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
        <Header title="Đại lý cấp 1" arrOfLinks={links} vaitro="giamsatvung" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách đại lý cấp 1</Title>
              <AddButton
                className="btn btn-primary"
                onClick={() => props.history.push("/giamsatvung/daily1/them")}
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
                  placeholder="Tim đại lý 1 theo tên, số điện thoại, email, tài khoản"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>
            <TableSection>
              <TableDaily1
                dsDaily1={search(dsDaily1)}
                setRowsRemoved={setRowsRemoved}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Daily1;
