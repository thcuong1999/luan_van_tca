import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import BackdropMaterial from "../../components/BackdropMaterial";
import splnIcon from "../../assets/icons/spln.png";
import dl2Icon from "../../assets/icons/daily2.png";
import langngheIcon from "../../assets/icons/langnghe.png";
import dl1Icon from "../../assets/icons/daily1.png";
import hodan from "../../assets/icons/hodan.png";
import apiGSV from "../../axios/apiGSV";
import TableSanpham from "../giamsatvung/tables/TableSanpham";
import TableCongcu from "../giamsatvung/tables/TableCongcu";
import TableVattu from "../giamsatvung/tables/TableVattu";
import TableNguyenlieu from "../giamsatvung/tables/TableNguyenlieu";
import TableDaily1 from "../giamsatvung/tables/TableDaily1";
import TableDaily2 from "../giamsatvung/tables/TableDaily2";
import TableLangnghe from "../giamsatvung/tables/TableLangnghe";
import TableDonhang from "../giamsatvung/tables/TableDonhang";
import apiLangnghe from "../../axios/apiLangnghe";
import TableHodan from "../daily2/tables/TableHodan";
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";
import {
  Details,
  DetailsBoxes,
  DetailsBoxTitle,
  DetailsContent,
  DetailsInfo,
  DetailsInfoContent,
  DetailsInfoTexts,
  DetailsInfoTitle,
  DetailsSubComponents,
} from "./styledComponents";

const GiamsatvungChitiet = (props) => {
  const [active, setActive] = useState({
    code: 1,
    present: "congcu",
    payload: "",
  });
  const [loading, setLoading] = useState(false);
  const [dsLangnghe, setDsLangnghe] = useState([]);
  const [dsHodan, setDsHodan] = useState([]);
  const [singleGSV, setSingleGSV] = useState(null);
  const { id: gsvId } = props.match.params;

  const fetchSingleGSV = async () => {
    setLoading(true);
    const { langnghe } = await apiLangnghe.dsLangnghe();
    let { gsv } = await apiGSV.singleGsv(gsvId);
    // fetch ds ho dan
    let { dshodan } = await apiGSV.dsHodan(gsv._id);
    dshodan = dshodan.map((hd) => ({ ...hd, langnghe: hd.langnghe.ten }));
    gsv = {
      ...gsv,
      dssanpham: gsv.dssanpham.map((sp) => ({ ...sp, ...sp.sanpham })),
      dscongcu: gsv.dscongcu.map((cc) => ({ ...cc, ...cc.congcu })),
      dsvattu: gsv.dsvattu.map((vt) => ({ ...vt, ...vt.vattu })),
      dsnguyenlieu: gsv.dsnguyenlieu.map((ngl) => ({
        ...ngl,
        ...ngl.nguyenlieu,
      })),
    };
    setDsHodan(dshodan);
    setDsLangnghe(langnghe);
    setSingleGSV(gsv);
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleGSV();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Details>
        <Header
          title="Quay lại danh sách giám sát vùng"
          titleBack
          onClick={() => props.history.push("/bophankd/giamsatvung")}
        />
        <DetailsContent>
          <DetailsBoxes>
            <Box
              onClick={() =>
                setActive({
                  code: 1,
                  present: "sanpham",
                  payload: "",
                })
              }
              className={active.code === 1 && "active"}
            >
              <img src={splnIcon} width="30" alt="splangnghe" />
              <DetailsBoxTitle>Sản phẩm</DetailsBoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 2,
                  present: "congcu",
                  payload: "",
                })
              }
              className={active.code === 2 && "active"}
            >
              <i class="fas fa-tools"></i>
              <DetailsBoxTitle>Công cụ</DetailsBoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 3,
                  present: "vattu",
                  payload: "",
                })
              }
              className={active.code === 3 && "active"}
            >
              <i class="fab fa-accusoft"></i>
              <DetailsBoxTitle>Vật tư</DetailsBoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 4,
                  present: "nguyenlieu",
                  payload: "",
                })
              }
              className={active.code === 4 && "active"}
            >
              <i class="fab fa-bandcamp"></i>
              <DetailsBoxTitle>Nguyên liệu</DetailsBoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 5,
                  present: "daily1",
                  payload: "",
                })
              }
              className={active.code === 5 && "active"}
            >
              <img src={dl1Icon} width="30" alt="dl1" />
              <DetailsBoxTitle>Đại lý cấp 1</DetailsBoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 6,
                  present: "daily2",
                  payload: "",
                })
              }
              className={active.code === 6 && "active"}
            >
              <img src={dl2Icon} width="30" alt="dl2" />
              <DetailsBoxTitle>Đại lý cấp 2</DetailsBoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 7,
                  present: "langnghe",
                  payload: "",
                })
              }
              className={active.code === 7 && "active"}
            >
              <img src={langngheIcon} width="30" alt="lannghe" />
              <DetailsBoxTitle>Làng nghề</DetailsBoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 8,
                  present: "donhang",
                  payload: "",
                })
              }
              className={active.code === 8 && "active"}
            >
              <i class="far fa-newspaper"></i>
              <DetailsBoxTitle>Đơn hàng</DetailsBoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 9,
                  present: "dshodan",
                  payload: "",
                })
              }
              className={active.code === 9 && "active"}
            >
              <img src={hodan} width="30" alt="hodan" />
              <DetailsBoxTitle>Hộ dân</DetailsBoxTitle>
            </Box>
          </DetailsBoxes>

          <DetailsInfo>
            <DetailsInfoTitle>
              <h5>Thông tin giám sát vùng</h5>
            </DetailsInfoTitle>
            <DetailsInfoContent>
              <DetailsInfoTexts>
                <table>
                  <tr>
                    <td>
                      <img src={ten} alt="ten" />
                      <span>Tên:</span>
                    </td>
                    <td>{singleGSV?.ten}</td>
                  </tr>
                  <tr>
                    <td>
                      <img src={sdt} alt="sdt" />
                      <span>SĐT:</span>
                    </td>
                    <td>{singleGSV?.sdt}</td>
                  </tr>
                  <tr>
                    <td>
                      <img src={email} alt="email" />
                      <span>E-mail:</span>
                    </td>
                    <td>{singleGSV?.email}</td>
                  </tr>
                  <tr>
                    <td>
                      <img src={diachi} alt="diachi" />
                      <span>Địa chỉ:</span>
                    </td>
                    <td>{`${singleGSV?.xa}, ${singleGSV?.huyen}, ${singleGSV?.tinh}`}</td>
                  </tr>
                </table>
              </DetailsInfoTexts>
            </DetailsInfoContent>
          </DetailsInfo>

          <DetailsSubComponents>
            {active.code === 1 ? (
              <TableSanpham dsSanpham={singleGSV?.dssanpham} readOnly />
            ) : active.code === 2 ? (
              <TableCongcu dsCongcu={singleGSV?.dscongcu} readOnly />
            ) : active.code === 3 ? (
              <TableVattu dsVattu={singleGSV?.dsvattu} readOnly />
            ) : active.code === 4 ? (
              <TableNguyenlieu
                dsNguyenlieu={singleGSV?.dsnguyenlieu}
                readOnly
              />
            ) : active.code === 5 ? (
              <TableDaily1 dsDaily1={singleGSV?.daily1} readOnly />
            ) : active.code === 6 ? (
              <TableDaily2 dsDaily2={singleGSV?.daily2} readOnly />
            ) : active.code === 7 ? (
              <TableLangnghe dsLangnghe={dsLangnghe} readOnly />
            ) : active.code === 8 ? (
              <TableDonhang dsDonhang={singleGSV?.donhang} readOnly />
            ) : (
              <TableHodan dsHodan={dsHodan} readOnly />
            )}
          </DetailsSubComponents>
        </DetailsContent>
      </Details>
    </>
  );
};

const Box = styled.div`
  width: 145px;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgb(0 0 20 / 8%), 0 1px 2px rgb(0 0 20 / 8%);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 0%;
    bottom: -16px;
    height: 6px;
    border-radius: 4px;
    transition: width 350ms;
  }
  &.active {
    &::after {
      width: 100%;
    }
  }
  i {
    color: #fff;
    font-size: 23px;
  }
  &:nth-child(1),
  &:nth-child(9) {
    background: #da542e;
    &::after {
      background: #da542e;
    }
    &:hover {
      background: #b03e1e;
      &::after {
        width: 100%;
      }
    }
    &.active {
      background: #b03e1e;
    }
  }
  &:nth-child(2),
  &:nth-child(8) {
    background: #2255a4;
    &::after {
      background: #2255a4;
    }
    &:hover {
      background: #163d7a;
      &::after {
        width: 100%;
      }
    }
    &.active {
      background: #163d7a;
    }
  }
  &:nth-child(3),
  &:nth-child(7) {
    background: #27a9e3;
    &::after {
      background: #27a9e3;
    }
    &:hover {
      background: #1d86b5;
      &::after {
        width: 100%;
      }
    }
    &.active {
      background: #1d86b5;
    }
  }
  &:nth-child(4),
  &:nth-child(6) {
    background: #28b779;
    &::after {
      background: #28b779;
    }
    &:hover {
      background: #1c8c5c;
      &::after {
        width: 100%;
      }
    }
    &.active {
      background: #1c8c5c;
    }
  }
  &:nth-child(5) {
    background: #e1c83a;
    &::after {
      background: #e1c83a;
    }
    &:hover {
      background: #c0ab37;
      &::after {
        width: 100%;
      }
    }
    &.active {
      background: #c0ab37;
    }
  }
`;

export default GiamsatvungChitiet;
