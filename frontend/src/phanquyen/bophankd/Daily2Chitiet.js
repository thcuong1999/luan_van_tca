import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import splnIcon from "../../assets/icons/spln.png";
import hodanIcon from "../../assets/icons/hodan.png";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiDaily2 from "../../axios/apiDaily2";
import TableSanpham from "../daily2/tables/TableSanpham";
import TableCongcu from "../daily2/tables/TableCongcu";
import TableVattu from "../daily2/tables/TableVattu";
import TableNguyenlieu from "../daily2/tables/TableNguyenlieu";
import TableDonhang from "../daily2/tables/TableDonhang";
import TableHodan from "../daily2/tables/TableHodan";
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
import ten from "../../assets/icons/ten.png";
import sdt from "../../assets/icons/sdt.png";
import email from "../../assets/icons/email.png";
import diachi from "../../assets/icons/diachi.png";

const Daily2Chitiet = (props) => {
  const [active, setActive] = useState({
    code: 1,
    present: "congcu",
    payload: "",
  });
  const [loading, setLoading] = useState(false);
  const [singleDaily2, setSingleDaily2] = useState(null);
  const { id: daily2Id } = props.match.params;

  const fetchSingleDL2 = async () => {
    setLoading(true);
    let { daily2 } = await apiDaily2.singleDaily2(daily2Id);
    daily2 = {
      ...daily2,
      dssanpham: daily2.dssanpham.map((sp) => ({ ...sp, ...sp.sanpham })),
      dscongcu: daily2.dscongcu.map((cc) => ({ ...cc, ...cc.congcu })),
      dsvattu: daily2.dsvattu.map((vt) => ({ ...vt, ...vt.vattu })),
      dsnguyenlieu: daily2.dsnguyenlieu.map((ngl) => ({
        ...ngl,
        ...ngl.nguyenlieu,
      })),
      hodan: daily2.hodan.map((hd) => ({ ...hd, langnghe: hd.langnghe.ten })),
    };
    setSingleDaily2(daily2);
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleDL2();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Details>
        <Header
          title="Quay lại danh sách đại lý 2"
          titleBack
          onClick={() => props.history.push("/bophankd/daily2")}
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
              <img src={splnIcon} width="36" alt="splangnghe" />
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
                  present: "hodan",
                  payload: "",
                })
              }
              className={active.code === 5 && "active"}
            >
              <img src={hodanIcon} width="36" alt="hodan" />
              <DetailsBoxTitle>Hộ dân</DetailsBoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 6,
                  present: "donhang",
                  payload: "",
                })
              }
              className={active.code === 6 && "active"}
            >
              <i class="far fa-newspaper"></i>
              <DetailsBoxTitle>Đơn hàng</DetailsBoxTitle>
            </Box>
          </DetailsBoxes>

          <DetailsInfo>
            <DetailsInfoTitle>
              {/* <img src={anh} alt="anh" /> */}
              <h5>Thông tin đại lý</h5>
            </DetailsInfoTitle>
            <DetailsInfoContent>
              <DetailsInfoTexts>
                <table>
                  <tr>
                    <td>
                      <img src={ten} alt="ten" />
                      <span>Tên:</span>
                    </td>
                    <td>{singleDaily2?.ten}</td>
                  </tr>
                  <tr>
                    <td>
                      <img src={sdt} alt="sdt" />
                      <span>SĐT:</span>
                    </td>
                    <td>{singleDaily2?.sdt}</td>
                  </tr>
                  <tr>
                    <td>
                      <img src={email} alt="email" />
                      <span>E-mail:</span>
                    </td>
                    <td>{singleDaily2?.email}</td>
                  </tr>
                  <tr>
                    <td>
                      <img src={diachi} alt="diachi" />
                      <span>Địa chỉ:</span>
                    </td>
                    <td>{`${singleDaily2?.xa}, ${singleDaily2?.huyen}, ${singleDaily2?.tinh}`}</td>
                  </tr>
                </table>
              </DetailsInfoTexts>
            </DetailsInfoContent>
          </DetailsInfo>

          <DetailsSubComponents>
            {active.code === 1 ? (
              <TableSanpham dsSanpham={singleDaily2?.dssanpham} readOnly />
            ) : active.code === 2 ? (
              <TableCongcu dsCongcu={singleDaily2?.dscongcu} readOnly />
            ) : active.code === 3 ? (
              <TableVattu dsVattu={singleDaily2?.dsvattu} readOnly />
            ) : active.code === 4 ? (
              <TableNguyenlieu
                dsNguyenlieu={singleDaily2?.dsnguyenlieu}
                readOnly
              />
            ) : active.code === 5 ? (
              <TableHodan dsHodan={singleDaily2?.hodan} readOnly />
            ) : (
              <TableDonhang dsDonhang={singleDaily2?.donhang} readOnly />
            )}
          </DetailsSubComponents>
        </DetailsContent>
      </Details>
    </>
  );
};

const Box = styled.div`
  width: 200px;
  padding: 14px 28px;
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
  &:nth-child(1) {
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
  &:nth-child(6) {
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
  &:nth-child(5) {
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
  &:nth-child(4) {
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
`;

export default Daily2Chitiet;
