import React, { useEffect, useState } from "react";
import TableNguyenlieu from "./tables/TableNguyenlieu";
import { useSelector } from "react-redux";
import BackdropMaterial from "../../components/BackdropMaterial";
import { toast } from "react-toastify";
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

const Nguyenlieu = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "donvitinh"]);
  const [loading, setLoading] = useState(false);
  const [dsNguyenlieu, setDsNguyenlieu] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  //---------------
  const [open, setOpen] = useState(false);
  const [dsNguyenlieuHuloiShow, setDsNguyenlieuHuloiShow] = useState([]);
  const [dsNguyenlieuHuloi, setDsNguyenlieuHuloi] = useState([]);
  const [gsvInfo, setGsvInfo] = useState(null);
  const [active, setActive] = useState({
    code: 1,
    present: "dsnguyenlieu",
  });

  const handleClick = async () => {
    const { success } = await apiGSV.themNguyenlieuHuloi(gsvInfo._id, {
      dsnglLoi: dsNguyenlieuHuloi,
    });
    if (success) {
      setOpen(false);
      toast.success("Thêm thành công!", { theme: "colored" });
      fetchDsNguyenlieu();
    }
  };

  const fetchDsNguyenlieu = async () => {
    setLoading(true);
    const { gsv } = await apiGSV.singleGsvBasedUserId(userInfo._id);
    let { dsnguyenlieu } = await apiGSV.dsNguyenlieu(gsv._id);
    dsnguyenlieu = dsnguyenlieu.map((ngl) => ({
      ...ngl.nguyenlieu,
      ...ngl,
    }));
    let { dsnguyenlieuhuloi } = await apiGSV.dsNguyenlieuHuloi(gsv._id);
    dsnguyenlieuhuloi = dsnguyenlieuhuloi.map((ngl) => ({
      ...ngl.nguyenlieu,
      ...ngl,
    }));
    setGsvInfo(gsv);
    setDsNguyenlieuHuloiShow(dsnguyenlieuhuloi);
    setDsNguyenlieu(dsnguyenlieu);
    setLoading(false);
  };

  const search = (dsNguyenlieu) => {
    return (
      dsNguyenlieu &&
      dsNguyenlieu.filter((item) =>
        searchColumns.some(
          (col) =>
            item[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        )
      )
    );
  };

  useEffect(() => {
    fetchDsNguyenlieu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Nguyên liệu" arrOfLinks={links} />
        <Content>
          <div className="text-right mb-3">
            {active.code === 1 ? (
              <Button
                className="btn btn-primary px-4"
                onClick={() =>
                  setActive({ code: 2, present: "dsnguyenlieuhuloi" })
                }
              >
                Hư lỗi
              </Button>
            ) : (
              <Button
                className="btn btn-primary px-3"
                onClick={() => setActive({ code: 1, present: "dsnguyenlieu" })}
              >
                Danh sách
              </Button>
            )}
          </div>
          <FilterSection>
            <TitleWrapper>
              <Title>
                {active.code === 1
                  ? "Danh sách nguyên liệu"
                  : "Danh sách nguyên liệu hư lỗi"}
              </Title>
            </TitleWrapper>
            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim nguyên liệu theo tên, công dụng"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            {active.code === 1 ? (
              <TableSection>
                <TableNguyenlieu
                  dsNguyenlieu={search(dsNguyenlieu)}
                  setOpen={setOpen}
                  setDsNguyenlieuHuloi={setDsNguyenlieuHuloi}
                />
              </TableSection>
            ) : active.code === 2 ? (
              <TableSection className="noCheckbox">
                <TableNguyenlieu
                  dsNguyenlieu={dsNguyenlieuHuloiShow}
                  dsnguyenlieuhuloi
                />
              </TableSection>
            ) : null}
          </FilterSection>
        </Content>
      </Container>

      <ModalHuloi
        type="nguyenlieu"
        open={open}
        setOpen={setOpen}
        dsNguyenlieuHuloi={dsNguyenlieuHuloi}
        setDsNguyenlieuHuloi={setDsNguyenlieuHuloi}
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

export default Nguyenlieu;
