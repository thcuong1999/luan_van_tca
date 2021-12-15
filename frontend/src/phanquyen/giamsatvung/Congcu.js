import React, { useEffect, useState } from "react";
import TableCongcu from "./tables/TableCongcu";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BackdropMaterial from "../../components/BackdropMaterial";
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
import ModalHuloi from "../../components/ModalHuloi";
import styled from "styled-components";
import { links } from "./arrayOfLinks";

const Congcu = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "congdung"]);
  const [loading, setLoading] = useState(false);
  const [dsCongcu, setDsCongcu] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  //-------------------------
  const [open, setOpen] = useState(false);
  const [dsCongcuHuloiShow, setDsCongcuHuloiShow] = useState([]);
  const [dsCongcuHuloi, setDsCongcuHuloi] = useState([]);
  const [gsvInfo, setGsvInfo] = useState(null);
  const [active, setActive] = useState({
    code: 1,
    present: "dscongcu",
  });

  const handleClick = async () => {
    const { success } = await apiGSV.themCongcuHuloi(gsvInfo._id, {
      dsccLoi: dsCongcuHuloi,
    });
    if (success) {
      setOpen(false);
      toast.success("Thêm thành công!", { theme: "colored" });
      fetchDsCongcu();
    }
  };

  const fetchDsCongcu = async () => {
    setLoading(true);
    const { gsv } = await apiGSV.singleGsvBasedUserId(userInfo._id);
    let { dscongcu } = await apiGSV.dsCongcu(gsv._id);
    dscongcu = dscongcu.map((cc) => ({
      ...cc.congcu,
      ...cc,
    }));
    let { dscongcuhuloi } = await apiGSV.dsCongcuHuloi(gsv._id);
    dscongcuhuloi = dscongcuhuloi.map((cc) => ({
      ...cc.congcu,
      ...cc,
    }));
    setGsvInfo(gsv);
    setDsCongcuHuloiShow(dscongcuhuloi);
    setDsCongcu(dscongcu);
    setLoading(false);
  };

  const search = (dsCongcu) => {
    return (
      dsCongcu &&
      dsCongcu.filter((item) =>
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
      <Container>
        <Header title="Công cụ" arrOfLinks={links} />
        <Content>
          <div className="text-right mb-3">
            {active.code === 1 ? (
              <Button
                className="btn btn-primary px-4"
                onClick={() => setActive({ code: 2, present: "dscongcuhuloi" })}
              >
                Hư lỗi
              </Button>
            ) : (
              <Button
                className="btn btn-primary px-3"
                onClick={() => setActive({ code: 1, present: "dscongcu" })}
              >
                Danh sách
              </Button>
            )}
          </div>
          <FilterSection>
            <TitleWrapper className="d-flex justify-content-between align-items-center">
              <Title>
                {active.code === 1
                  ? "Danh sách công cụ"
                  : "Danh sách công cụ hư lỗi"}
              </Title>
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

            {active.code === 1 ? (
              <TableSection>
                <TableCongcu
                  dsCongcu={search(dsCongcu)}
                  setOpen={setOpen}
                  setDsCongcuHuloi={setDsCongcuHuloi}
                />
              </TableSection>
            ) : active.code === 2 ? (
              <TableSection className="noCheckbox">
                <TableCongcu dsCongcu={dsCongcuHuloiShow} dscongcuhuloi />
              </TableSection>
            ) : null}
          </FilterSection>
        </Content>
      </Container>

      <ModalHuloi
        type="congcu"
        open={open}
        setOpen={setOpen}
        dsCongcuHuloi={dsCongcuHuloi}
        setDsCongcuHuloi={setDsCongcuHuloi}
        onClick={handleClick}
      />
    </>
  );
};

const Button = styled.button`
  font-size: 15px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
`;

export default Congcu;
