import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Route, NavLink } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";
import TongQuan from "./Tongquan";
import Sanpham from "./Sanpham";
import SanphamChitiet from "./SanphamChitiet";
import Congcu from "./Congcu";
import CongcuChitiet from "./CongcuChitiet";
import Daily1 from "./Daily1";
import Vattu from "./Vattu";
import Nguyenlieu from "./Nguyenlieu";
import VattuChitiet from "./VattuChitiet";
import NguyenlieuChitiet from "./NguyenlieuChitiet";
import LogoutButton from "../../components/LogoutButton";
import styled from "styled-components";
import Daily1Chitiet from "./Daily1Chitiet";
import splnIcon from "../../assets/icons/spln.png";
import Giamsatvung from "./Giamsatvung";
import GiamsatvungThem from "./GiamsatvungThem";
import Daily2 from "./Daily2";
import Daily2Chitiet from "./Daily2Chitiet";
import Donhang from "./Donhang";
import DonhangThem from "./DonhangThem";
import DonhangChitiet from "./DonhangChitiet";
import Tiendo from "./Tiendo";
import dl1Icon from "../../assets/icons/daily1.png";
import dl2Icon from "../../assets/icons/daily2.png";
import gsvIcon from "../../assets/icons/gsv.png";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import apiBophankd from "../../axios/apiBophankd";
import BackdropMaterial from "../../components/BackdropMaterial";
import GiamsatvungChitiet from "./GiamsatvungChitiet";
import hodanIcon from "../../assets/icons/hodan.png";
import Hodan from "./Hodan";
import HodanChitiet from "./HodanChitiet";
import Hanggiaoden from "./Hanggiaoden";
import HanggiaodenChitiet from "./HanggiaodenChitiet";
import ThongtinCanhan from "../../components/pages/ThongtinCanhan";

const Dashboard = (props) => {
  const [loading, setLoading] = useState(false);
  const [dsBadge, setDsBadge] = useState(null);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [refresh, setRefresh] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/");
  };

  const fetchDsBadge = async () => {
    setLoading(true);
    const { bophankd } = await apiBophankd.bophankdBasedUserId(userInfo._id);
    const data = await apiBophankd.dsShowBadge(bophankd._id);
    setDsBadge(data);
    setLoading(false);
  };

  useEffect(() => {
    setRefresh(false);
    fetchDsBadge();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Container>
      <LeftMenu>
        <Logo>
          <img src={logo} alt="logo" />
          <span>Làng Nghề</span>
        </Logo>

        <Menu>
          <MenuItem>
            <NavLink
              to="/bophankd"
              activeClassName={props.match.path === "/bophankd" && "active"}
            >
              <i className="fas fa-home"></i>
              <span className="ml-3">Tổng quan</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/sanpham" activeClassName="active">
              <Image src={splnIcon} alt="splangnghe" />
              <span className="ml-3">Sản phẩm</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/vattu" activeClassName="active">
              <i class="fab fa-accusoft"></i>
              <span className="ml-3">Vật tư</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/nguyenlieu" activeClassName="active">
              <i class="fab fa-bandcamp"></i>
              <span className="ml-3">Nguyên liệu</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/congcu" activeClassName="active">
              <i class="fas fa-tools"></i>
              <span className="ml-3">Công cụ</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/giamsatvung" activeClassName="active">
              <Image src={gsvIcon} alt="gsvIcon" />
              <span className="ml-3">Giám sát vùng</span>
            </NavLink>
          </MenuItem>


          <MenuItem>
            <NavLink to="/bophankd/daily1" activeClassName="active">
              {dsBadge?.daily1Badge > 0 ? (
                <Badge badgeContent={dsBadge?.daily1Badge} color="secondary">
                  <Image src={dl1Icon} alt="splangnghe" />
                </Badge>
              ) : (
                <Image src={dl1Icon} alt="splangnghe" />
              )}

              <span className="ml-3">Đại lý cấp 1</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/daily2" activeClassName="active">
              {dsBadge?.daily2Badge > 0 ? (
                <Badge badgeContent={dsBadge?.daily2Badge} color="secondary">
                  <Image src={dl2Icon} alt="splangnghe" />
                </Badge>
              ) : (
                <Image src={dl2Icon} alt="splangnghe" />
              )}

              <span className="ml-3">Đại lý cấp 2</span>
            </NavLink>
          </MenuItem>

       
          <MenuItem>
            <NavLink to="/bophankd/hodan" activeClassName="active">
              <Image src={hodanIcon} alt="hodan" />
              <span className="ml-3">Hộ dân</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/donhang" activeClassName="active">
              <i class="far fa-newspaper"></i>
              <span className="ml-3">Đơn hàng</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/bophankd/hanggiaoden" activeClassName="active">
              <i class="far fa-newspaper"></i>
              <span className="ml-3">Hàng giao đến</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <LogoutButton onClick={handleLogout}>Đăng xuất</LogoutButton>
          </MenuItem>
        </Menu>
      </LeftMenu>

      <RightContent>
        <Route exact path="/bophankd" component={TongQuan} />
        <Route exact path="/bophankd/sanpham" component={Sanpham} />
        <Route
          path="/bophankd/sanpham/chitiet/:id"
          component={SanphamChitiet}
        />
        <Route exact path="/bophankd/congcu" component={Congcu} />
        <Route path="/bophankd/congcu/chitiet/:id" component={CongcuChitiet} />
        <Route
          exact
          path="/bophankd/daily1"
          render={(props) => <Daily1 {...props} setRefresh={setRefresh} />}
        />
        <Route exact path="/bophankd/vattu" component={Vattu} />
        <Route path="/bophankd/vattu/chitiet/:id" component={VattuChitiet} />
        <Route exact path="/bophankd/nguyenlieu" component={Nguyenlieu} />
        <Route
          path="/bophankd/nguyenlieu/chitiet/:id"
          component={NguyenlieuChitiet}
        />
        <Route path="/bophankd/daily1/chitiet/:id" component={Daily1Chitiet} />
        <Route exact path="/bophankd/giamsatvung" component={Giamsatvung} />
        <Route path="/bophankd/giamsatvung/them" component={GiamsatvungThem} />
        <Route
          path="/bophankd/giamsatvung/chitiet/:id"
          component={GiamsatvungChitiet}
        />
        <Route
          exact
          path="/bophankd/daily2"
          render={(props) => <Daily2 {...props} setRefresh={setRefresh} />}
        />
        <Route path="/bophankd/daily2/chitiet/:id" component={Daily2Chitiet} />

        <Route exact path="/bophankd/donhang" component={Donhang} />
        <Route path="/bophankd/donhang/them" component={DonhangThem} />
        <Route
          exact
          path="/bophankd/donhang/chitiet/:id"
          component={DonhangChitiet}
        />
        <Route path="/bophankd/donhang/chitiet/:id/tiendo" component={Tiendo} />
        <Route exact path="/bophankd/hodan" component={Hodan} />
        <Route path="/bophankd/hodan/chitiet/:id" component={HodanChitiet} />

        <Route exact path="/bophankd/hanggiaoden" component={Hanggiaoden} />
        <Route
          path="/bophankd/hanggiaoden/chitiet/:id"
          component={HanggiaodenChitiet}
        />

        <Route
          exact
          path="/bophankd/thongtincanhan"
          render={(props) => <ThongtinCanhan {...props} type="bophankd" />}
        />
      </RightContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;
const LeftMenu = styled.div`
  width: 230px;
  height: 100vh;
  left: 0;
  top: 0;
  position: fixed;
  background-color: #202d3f;
`;
const Logo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.7);

  img {
    width: 30px;
  }

  span {
    font-size: 20px;
    margin-left: 8px;
    color: #fff;
    font-weight: bold;
  }
`;
const Menu = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
`;
const MenuItem = styled.li`
  display: block;

  a {
    display: block;
    text-decoration: none;
    padding: 12px;
    display: flex;
    align-items: center;
    font-family: "Poppins", sans-serif;
    i {
      color: #cad6e2;
      font-size: 22px;
    }
    span {
      color: #cad6e2;
      /* margin-left: 14px; */
    }
    &:hover {
      background: #304664;
      i,
      span {
        color: #fff;
      }
    }
    &.active {
      background: #2e96e0;
      i,
      span {
        color: #fff;
      }
    }
  }
`;
const RightContent = styled.div`
  margin-left: 230px;
  flex: 1;
`;
const Image = styled.img`
  width: 22px;
`;

export default Dashboard;
