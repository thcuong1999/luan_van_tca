import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import BackdropMaterial from "../../components/BackdropMaterial";
import apiDaily1 from "../../axios/apiDaily1";
import TableSanpham from "../daily1/tables/TableSanpham";
import TableCongcu from "../daily1/tables/TableCongcu";
import TableVattu from "../daily1/tables/TableVattu";
import TableNguyenlieu from "../daily1/tables/TableNguyenlieu";
import TableDaily2 from "../daily1/tables/TableDaily2";
import TableHodan from "../daily1/tables/TableHodan";
import TableDonhang from "../daily1/tables/TableDonhang";
import splnIcon from "../../assets/icons/spln.png";
import dl2Icon from "../../assets/icons/daily2.png";
import hodanIcon from "../../assets/icons/hodan.png";
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

const Daily1Chitiet = (props) => {
  const [active, setActive] = useState({
    code: 1,
    present: "congcu",
  });
  const [loading, setLoading] = useState(false);
  const [singleDaily1, setSingleDaily1] = useState(null);
  const { id: daily1Id } = props.match.params;

  const fetchSingleDL1 = async () => {
    setLoading(true);
    let { daily1 } = await apiDaily1.singleDaily1(daily1Id);
    daily1 = {
      ...daily1,
      dssanpham: daily1.dssanpham.map((sp) => ({ ...sp, ...sp.sanpham })),
      dscongcu: daily1.dscongcu.map((cc) => ({ ...cc, ...cc.congcu })),
      dsvattu: daily1.dsvattu.map((vt) => ({ ...vt, ...vt.vattu })),
      dsnguyenlieu: daily1.dsnguyenlieu.map((ngl) => ({
        ...ngl,
        ...ngl.nguyenlieu,
      })),
    };
    setSingleDaily1(daily1);
    setLoading(false);
  };

  useEffect(() => {
    fetchSingleDL1();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Details>
        <Header
          title="Quay lại danh sách đại lý 1"
          titleBack
          onClick={() => props.history.push("/bophankd/daily1")}
        />
        <DetailsContent>
          <DetailsBoxes>
            <Box
              onClick={() =>
                setActive({
                  code: 1,
                  present: "sanpham",
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
                  present: "daily2",
                })
              }
              className={active.code === 5 && "active"}
            >
              <img src={dl2Icon} width="36" alt="splangnghe" />
              <DetailsBoxTitle>Đại lý cấp 2</DetailsBoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 6,
                  present: "hodan",
                })
              }
              className={active.code === 6 && "active"}
            >
              <img src={hodanIcon} width="36" alt="hodan" />
              <DetailsBoxTitle>Hộ dân</DetailsBoxTitle>
            </Box>

            <Box
              onClick={() =>
                setActive({
                  code: 7,
                  present: "donhang",
                })
              }
              className={active.code === 7 && "active"}
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
                    <td>{singleDaily1?.ten}</td>
                  </tr>
                  <tr>
                    <td>
                      <img src={sdt} alt="sdt" />
                      <span>SĐT:</span>
                    </td>
                    <td>{singleDaily1?.sdt}</td>
                  </tr>
                  <tr>
                    <td>
                      <img src={email} alt="email" />
                      <span>E-mail:</span>
                    </td>
                    <td>{singleDaily1?.email}</td>
                  </tr>
                  <tr>
                    <td>
                      <img src={diachi} alt="diachi" />
                      <span>Địa chỉ:</span>
                    </td>
                    <td>{`${singleDaily1?.xa}, ${singleDaily1?.huyen}, ${singleDaily1?.tinh}`}</td>
                  </tr>
                </table>
              </DetailsInfoTexts>
            </DetailsInfoContent>
          </DetailsInfo>

          <DetailsSubComponents>
            {active.code === 1 ? (
              <TableSanpham dsSanpham={singleDaily1?.dssanpham} readOnly />
            ) : active.code === 2 ? (
              <TableCongcu dsCongcu={singleDaily1?.dscongcu} readOnly />
            ) : active.code === 3 ? (
              <TableVattu dsVattu={singleDaily1?.dsvattu} readOnly />
            ) : active.code === 4 ? (
              <TableNguyenlieu
                dsNguyenlieu={singleDaily1?.dsnguyenlieu}
                readOnly
              />
            ) : active.code === 5 ? (
              <TableDaily2 dsDaily2={singleDaily1?.daily2} readOnly />
            ) : active.code === 6 ? (
              <TableHodan dsHodan={singleDaily1?.hodan} readOnly />
            ) : (
              <TableDonhang dsDonhang={singleDaily1?.donhang} readOnly />
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
  &:nth-child(1),
  &:nth-child(7) {
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

export default Daily1Chitiet;
