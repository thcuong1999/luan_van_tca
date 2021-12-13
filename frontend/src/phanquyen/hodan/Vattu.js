import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BackdropMaterial from "../../components/BackdropMaterial";
import styled from "styled-components";
import Header from "../../components/Header";
import apiHodan from "../../axios/apiHodan";
import ModalChitietVattu from "../../components/ModalChitietVattu";
import TableVattu from "./tables/TableVattu";

const Vattu = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "bophankd", "daily2"]);
  const [loading, setLoading] = useState(false);
  const [dsVattu, setDsVattu] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [vattu, setVattu] = useState(null);
  const { userInfo } = useSelector((state) => state.user);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const fetchDsCongcu = async () => {
    setLoading(true);
    const { hodan } = await apiHodan.singleHodanBasedUser(userInfo._id);
    const { dsvattu } = await apiHodan.dsVattu(hodan._id);
    setDsVattu(
      dsvattu && dsvattu.length
        ? dsvattu.map((item) => ({
            ...item,
            ten: item.vattu.ten,
            bophankd: item?.phanphat?.from?.bophankd.ten,
            daily2: item?.phanphat?.to?.daily2.ten,
          }))
        : []
    );
    setLoading(false);
  };

  const search = (dsVattu) => {
    return (
      dsVattu &&
      dsVattu.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    fetchDsCongcu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Wrapper>
        <Header title="Vật tư" />
        <Content>
          <FilterSection>
            <TitleWrapper>
              <Title>Danh sách vật tư</Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim công cụ theo tên, công dụng"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            <TableSection>
              <TableVattu
                dsVattu={search(dsVattu)}
                handleOpenModal={handleOpenModal}
                setVattu={setVattu}
              />
            </TableSection>
          </FilterSection>
        </Content>
      </Wrapper>

      <ModalChitietVattu
        open={modalOpen}
        onClose={handleCloseModal}
        vattu={vattu}
      />
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 26px 36px;
  font-family: "Poppins", sans-serif;
`;
const FilterSection = styled.div`
  background: #fff;
`;
const Title = styled.div`
  margin: 0;
  padding: 14px 17px;
  font-weight: 500;
  color: #1e93e8;
  display: inline-block;
  border-bottom: 2px solid #1e93e8;
`;
const TitleWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const Filter = styled.div`
  background: #fff;
  padding: 14px 17px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const SearchBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.15);
  width: 50%;
  border-radius: 4px;
  display: flex;
  overflow: hidden;
  i {
    display: inline-block;
    padding: 10px;
    color: rgba(0, 0, 0, 0.35);
  }
  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0 10px;
    color: #182537;
    font-size: 14px;
    &::placeholder {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.35);
    }
  }
`;
const TableSection = styled.div`
  table {
    th,
    td {
      font-family: "Poppins", sans-serif;
    }
    th:first-child {
      display: none;
    }
    td:first-child {
      display: none;
    }
  }
`;

export default Vattu;
