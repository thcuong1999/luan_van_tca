import React, { useEffect, useState } from "react";
import {
  Container,
  Content,
  Filter,
  FilterSection,
  Form,
  FormContent,
  FormGroup,
  FormTitle,
  Input,
  Label,
  SearchBox,
  TableSection,
  Title,
  TitleWrapper,
} from "./styledComponents";
import Header from "../../components/Header";
import apiLangnghe from "../../axios/apiLangnghe";
import BackdropMaterial from "../../components/BackdropMaterial";
import _ten from "../../assets/icons/ten.png";
import _tinh from "../../assets/icons/tinh.png";
import _huyen from "../../assets/icons/huyen.png";
import loai from "../../assets/icons/loai.png";
import TableHodan from "../daily2/tables/TableHodan";

const LangngheChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [singleLN, setSingleLN] = useState(null);
  const [dsHodan, setDsHodan] = useState([]);
  const { id: langngheId } = props.match.params;

  const fetchData = async () => {
    setLoading(true);
    const { langnghe } = await apiLangnghe.singleLangnghe(langngheId);
    let { hodan } = await apiLangnghe.dsHodan(langngheId);
    hodan = hodan.map((hd) => ({ ...hd, langnghe: hd.langnghe.ten }));
    setDsHodan(hodan);
    setSingleLN(langnghe);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Container>
      <Header
        title="Quay lại danh sách làng nghề"
        titleBack
        onClick={() => props.history.push("/giamsatvung/langnghe")}
      />
      <Content>
        <Form>
          <FormContent>
            <FormTitle>
              <span>Chi tiết làng nghề</span>
            </FormTitle>

            <FormGroup>
              <Label>
                <img src={_ten} alt="ten" />
                <span>Tên làng:</span>
              </Label>
              <Input type="text" value={singleLN?.ten} disabled />
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={_tinh} alt="tinh" />
                <span>Tỉnh:</span>
              </Label>
              <Input type="text" value={singleLN?.tinh} disabled />
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={_huyen} alt="_huyen" />
                <span>Huyện:</span>
              </Label>
              <Input type="text" value={singleLN?.huyen} disabled />
            </FormGroup>

            <FormGroup>
              <Label>
                <img src={loai} alt="loai" />
                <span>Loại sản phẩm:</span>
              </Label>
              <Input
                type="text"
                value={singleLN?.loaisanpham.map((lsp) => lsp.ten).join(", ")}
                disabled
              />
            </FormGroup>
          </FormContent>

          <FilterSection className="px-4 mt-3">
            <TitleWrapper>
              <Title className="pl-0">Danh sách hộ dân</Title>
            </TitleWrapper>
            <Filter className="pl-0">
              <SearchBox>
                <i class="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Tim hộ dân theo tên đại diện, số điện thoại, cmnd, tài khoản, năm sinh"
                  // value={query}
                  // onChange={(e) => setQuery(e.target.value)}
                />
              </SearchBox>
            </Filter>
            <TableSection className="noCheckbox">
              <TableHodan dsHodan={dsHodan} readOnly />
            </TableSection>
          </FilterSection>
        </Form>
      </Content>
    </Container>
  );
};

export default LangngheChitiet;
