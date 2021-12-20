import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiDaily1 from "../../axios/apiDaily1";
import apiGiaohang from "../../axios/apiGiaohang";
import BackdropMaterial from "../../components/BackdropMaterial";
import Header from "../../components/Header";
import { links } from "./arrayOfLinks";
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
import TableHanggiaodi from "./tables/TableHanggiaodi";

const Hanggiaodi = () => {
  const [loading, setLoading] = useState(false);
  const [dsHanggiaodi, setDsHanggiaodi] = useState([]);
  const { userInfo } = useSelector((state) => state.user);

  const fetchDsGiaohangDen = async () => {
    setLoading(true);
    const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
    let { dsgiaohang } = await apiGiaohang.dsGiaohangDiDaily1Gsv(daily1._id);
    dsgiaohang = dsgiaohang
      .map((item) => ({
        ...item,
        tongsanpham: item.dssanpham.reduce((acc, sp) => acc + sp.dagiao, 0),
      }))
      .reverse();
    setDsHanggiaodi(dsgiaohang);
    setLoading(false);
  };

  useEffect(() => {
    fetchDsGiaohangDen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Hàng giao đi" arrOfLinks={links} vaitro="daily1" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách hàng giao đi</Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim hàng theo mã đơn hàng"
                  // value={query}
                  // onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>
            <TableSection className="noCheckbox">
              <TableHanggiaodi
                dsGiaohang={dsHanggiaodi}
                //   setSuccess={setSuccess}
                //   daily1Id={daily1Info?._id}
                //   setRefresh={props.setRefresh}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Container>
    </>
  );
};

export default Hanggiaodi;
