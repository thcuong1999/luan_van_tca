import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { toast } from "react-toastify";
import TableVattu from "./tables/TableVattu";
import apiGSV from "../../axios/apiGSV";
import ModalHuloi from "../../components/ModalHuloi";
import styled from "styled-components";
import { links } from "./arrayOfLinks";

const Vattu = (props) => {
  const [query, setQuery] = useState("");
  const [searchColumns] = useState(["ten", "congdung"]);
  const [loading, setLoading] = useState(false);
  const [dsVattu, setDsVattu] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  //---------------
  const [open, setOpen] = useState(false);
  const [dsVattuHuloiShow, setDsVattuHuloiShow] = useState([]);
  const [dsVattuHuloi, setDsVattuHuloi] = useState([]);
  const [gsvInfo, setGsvInfo] = useState(null);
  const [active, setActive] = useState({
    code: 1,
    present: "dsvattu",
  });

  const handleClick = async () => {
    const { success } = await apiGSV.themVattuHuloi(gsvInfo._id, {
      dsvtLoi: dsVattuHuloi,
    });
    if (success) {
      setOpen(false);
      toast.success("Thêm thành công!", { theme: "colored" });
      fetchDsVattu();
    }
  };

  const fetchDsVattu = async () => {
    setLoading(true);
    const { gsv } = await apiGSV.singleGsvBasedUserId(userInfo._id);
    let { dsvattu } = await apiGSV.dsVattu(gsv._id);
    dsvattu = dsvattu.map((vt) => ({
      ...vt.vattu,
      ...vt,
    }));
    let { dsvattuhuloi } = await apiGSV.dsVattuHuloi(gsv._id);
    dsvattuhuloi = dsvattuhuloi.map((vt) => ({
      ...vt.vattu,
      ...vt,
    }));
    setGsvInfo(gsv);
    setDsVattuHuloiShow(dsvattuhuloi);
    setDsVattu(dsvattu);
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
    fetchDsVattu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header title="Vật tư" arrOfLinks={links} />
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
                {" "}
                {active.code === 1
                  ? "Danh sách vật tư"
                  : "Danh sách vật tư hư lỗi"}
              </Title>
            </TitleWrapper>

            <Filter>
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim vật tư theo tên, công dụng"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>

            {active.code === 1 ? (
              <TableSection>
                <TableVattu
                  dsVattu={search(dsVattu)}
                  setOpen={setOpen}
                  setDsVattuHuloi={setDsVattuHuloi}
                />
              </TableSection>
            ) : active.code === 2 ? (
              <TableSection className="noCheckbox">
                <TableVattu dsVattu={dsVattuHuloiShow} dsvattuhuloi />
              </TableSection>
            ) : null}
          </FilterSection>
        </Content>
      </Container>

      <ModalHuloi
        type="vattu"
        open={open}
        setOpen={setOpen}
        dsVattuHuloi={dsVattuHuloi}
        setDsVattuHuloi={setDsVattuHuloi}
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

export default Vattu;
