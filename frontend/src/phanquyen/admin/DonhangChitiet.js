import React, { useEffect, useState } from "react";
import {
  Container,
  Content,
  Form,
  FormContent,
  FormGroup,
  FormTitle,
  Input,
  Label,
  TableSection,
  TableTitle,
  Total,
  TotalValue,
} from "./styledComponents";
import Header from "../../components/Header";
import BackdropMaterial from "../../components/BackdropMaterial";
import TableCongcuDonhang from "./tables/TableCongcuDonhang";
import TableVattuDonhang from "./tables/TableVattuDonhang";
import TableNguyenlieuDonhang from "./tables/TableNguyenlieuDonhang";
import apiDonhang from "../../axios/apiDonhang";
import TableSanphamDonhangChitiet from "./tables/TableSanphamDonhangChitiet";
import { formatMoney } from "../../utils";
import dssanpham from "../../assets/icons/dssanpham.png";
import dscongcu from "../../assets/icons/dscongcu.png";
import dsvattu from "../../assets/icons/dsvattu.png";
import dsnglieu from "../../assets/icons/dsnglieu.png";

const DonhangChitiet = (props) => {
  const [loading, setLoading] = useState(false);
  const [singleDonhang, setSingleDonhang] = useState(null);
  const { id: donhangId } = props.match.params;

  const fetchDonhang = async () => {
    setLoading(true);
    let { donhang } = await apiDonhang.singleDonhang(donhangId);
    donhang = {
      ...donhang,
      dssanpham: donhang.dssanpham.map((sp) => ({ ...sp, ...sp.sanpham })),
      dscongcu: donhang.dscongcu.map((cc) => ({ ...cc, ...cc.congcu })),
      dsvattu: donhang.dsvattu.map((vt) => ({ ...vt, ...vt.vattu })),
      dsnguyenlieu: donhang.dsnguyenlieu.map((ngl) => ({
        ...ngl,
        ...ngl.nguyenlieu,
      })),
    };
    setSingleDonhang(donhang);
    setLoading(false);
  };

  useEffect(() => {
    fetchDonhang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay lại danh sách đơn hàng"
          titleBack
          onClick={() => props.history.push("/admin/donhang")}
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>
                <span>Chi tiết đơn hàng</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <span>Mã đơn hàng:</span>
                </Label>
                <Input type="text" value={singleDonhang?.ma} disabled />
              </FormGroup>
            </FormContent>

            <div className="px-5">
              <TableSection className="noCheckbox">
                <TableTitle>
                  <img src={dssanpham} alt="dssanpham" />
                  <span>Danh sách sản phẩm</span>
                </TableTitle>
                <TableSanphamDonhangChitiet
                  dsSanpham={singleDonhang?.dssanpham}
                />
                <div className="text-right">
                  <Total>Tổng đơn giá:</Total>
                  <TotalValue>
                    {formatMoney(singleDonhang?.tongdongia)} vnđ
                  </TotalValue>
                </div>
              </TableSection>

              <TableSection className="noCheckbox">
                <TableTitle>
                  <img src={dscongcu} alt="dscongcu" />
                  <span>Danh sách công cụ</span>
                </TableTitle>
                <TableCongcuDonhang dsCongcu={singleDonhang?.dscongcu} />
                <div className="text-right">
                  <Total>Tổng số lượng:</Total>
                  <TotalValue>{singleDonhang?.tongcongcu}</TotalValue>
                </div>
              </TableSection>

              <TableSection className="noCheckbox">
                <TableTitle>
                  <img src={dsvattu} alt="dsvattu" />
                  <span>Danh sách vật tư</span>
                </TableTitle>
                <TableVattuDonhang dsVattu={singleDonhang?.dsvattu} />
                <div className="text-right">
                  <Total>Tổng số lượng:</Total>
                  <TotalValue>{singleDonhang?.tongvattu}</TotalValue>
                </div>
              </TableSection>

              <TableSection className="noCheckbox">
                <TableTitle>
                  <img src={dsnglieu} alt="dsnglieu" />
                  <span>Danh sách nguyên liệu</span>
                </TableTitle>
                <TableNguyenlieuDonhang
                  dsNguyenlieu={singleDonhang?.dsnguyenlieu}
                />
                <div className="text-right">
                  <Total>Tổng khối lượng:</Total>
                  <TotalValue>{singleDonhang?.tongnguyenlieu} kg</TotalValue>
                </div>
              </TableSection>
            </div>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default DonhangChitiet;
