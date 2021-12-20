import React, { useEffect, useState } from "react";
import TableDaily2 from "./tables/TableDaily2";
import BackdropMaterial from "../../components/BackdropMaterial";
import { useSelector } from "react-redux";
import apiDaily1 from "../../axios/apiDaily1";
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
import { links } from "./arrayOfLinks";

const Daily2 = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "sdt", "email", "taikhoan"]);
  const [dsDaily2, setDsDaily2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowsRemoved, setRowsRemoved] = useState(false);
  const { userInfo } = useSelector((state) => state.user);

  const fetchData = async () => {
    setLoading(true);
    const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    const { daily2 } = await apiDaily1.dsDaily2(daily1._id);
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
    setRowsRemoved(false);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsRemoved]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Đại lý cấp 2" arrOfLinks={links} vaitro="daily1" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách đại lý cấp 2</Title>
              <AddButton
                className="btn btn-primary"
                onClick={() => props.history.push("/daily1/daily2/them")}
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
                  placeholder="Tìm đại lý theo tên, số điện thoại, email và tài khoản"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableDaily2
                dsDaily2={search(dsDaily2)}
                setRowsRemoved={setRowsRemoved}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Daily2;
