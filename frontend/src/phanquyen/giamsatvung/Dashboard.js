import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Route, NavLink } from "react-router-dom";
import Tongquan from "./Tongquan";
import { logout } from "../../redux/actions/userActions";
import Langnghe from "./Langnghe";
import LangngheThem from "./LangngheThem";
import LangngheChinhsua from "./LangngheChinhsua";
import LangngheChitiet from "./LangngheChitiet";
import LogoutButton from "../../components/LogoutButton";
import styled from "styled-components";
import homeIcon from "../../assets/icons/home.png";
import langngheIcon from "../../assets/icons/langnghe.png";
import Daily1 from "./Daily1";
import Daily1Them from "./Daily1Them";
import Daily1Chitiet from "./Daily1Chitiet";
import Daily1Chinhsua from "./Daily1Chinhsua";
import Daily2 from "./Daily2";
import Daily2Chitiet from "./Daily2Chitiet";
import Donhang from "./Donhang";
import DonhangChitiet from "./DonhangChitiet";
import Tiendo from "./Tiendo";
import DonhangThem from "./DonhangThem";
import Congcu from "./Congcu";
import Vattu from "./Vattu";
import Nguyenlieu from "./Nguyenlieu";
import Sanpham from "./Sanpham";
import dl1Icon from "../../assets/icons/daily1.png";
import dl2Icon from "../../assets/icons/daily2.png";
import splnIcon from "../../assets/icons/spln.png";
import Badge from "@mui/material/Badge";
import apiGSV from "../../axios/apiGSV";
import BackdropMaterial from "../../components/BackdropMaterial";
import hodanIcon from "../../assets/icons/hodan.png";
import Hodan from "./Hodan";
import HodanChitiet from "./HodanChitiet";
import Giaohang from "./Giaohang";
import Hanggiaoden from "./Hanggiaoden";
import HanggiaodenChitiet from "./HanggiaodenChitiet";
import Hanggiaodi from "./Hanggiaodi";
import HanggiaodiChitiet from "./HanggiaodiChitiet";
import SanphamChitiet from "./SanphamChitiet";
import CongcuChitiet from "./CongcuChitiet";
import VattuChitiet from "./VattuChitiet";
import NguyenlieuChitiet from "./NguyenlieuChitiet";
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
    const { gsv } = await apiGSV.singleGsvBasedUserId(userInfo._id);
    const data = await apiGSV.dsShowBadge(gsv._id);
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
              to="/giamsatvung/"
              activeClassName={props.match.path === "/giamsatvung" && "active"}
            >
              <Image src={homeIcon} alt="home" />
              <span className="ml-3">Tổng quan</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/giamsatvung/langnghe" activeClassName="active">
              <Image src={langngheIcon} alt="lannghe" />
              <span className="ml-3">Làng nghề</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/giamsatvung/daily1" activeClassName="active">
              <Image src={dl1Icon} alt="splangnghe" />
              <span className="ml-3">Đại lý cấp 1</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/giamsatvung/daily2" activeClassName="active">
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
            <NavLink to="/giamsatvung/hodan" activeClassName="active">
              <Image src={hodanIcon} alt="hodan" />
              <span className="ml-3">Hộ dân</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/giamsatvung/sanpham" activeClassName="active">
              <Image src={splnIcon} alt="splangnghe" />
              <span className="ml-3">Sản phẩm</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/giamsatvung/congcu" activeClassName="active">
              <i class="fas fa-tools"></i>
              <span className="ml-3">Công cụ</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/giamsatvung/vattu" activeClassName="active">
              <i class="fab fa-accusoft"></i>
              <span className="ml-3">Vật tư</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/giamsatvung/nguyenlieu" activeClassName="active">
              <i class="fab fa-bandcamp"></i>
              <span className="ml-3">Nguyên liệu</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/giamsatvung/donhang" activeClassName="active">
              {dsBadge?.donhangBadge > 0 ? (
                <Badge badgeContent={dsBadge?.donhangBadge} color="secondary">
                  <i class="far fa-newspaper"></i>
                </Badge>
              ) : (
                <i class="far fa-newspaper"></i>
              )}
              <span className="ml-3">Đơn hàng</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/giamsatvung/hanggiaoden" activeClassName="active">
              <i class="far fa-newspaper"></i>
              <span className="ml-3">Hàng giao đến</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/giamsatvung/hanggiaodi" activeClassName="active">
              <i class="far fa-newspaper"></i>
              <span className="ml-3">Hàng giao đi</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <LogoutButton onClick={handleLogout}>Đăng xuất</LogoutButton>
          </MenuItem>
        </Menu>
      </LeftMenu>

      <RightContent>
        <Route exact path="/giamsatvung" component={Tongquan} />
        <Route exact path="/giamsatvung/langnghe" component={Langnghe} />
        <Route path="/giamsatvung/langnghe/them" component={LangngheThem} />
        <Route
          path="/giamsatvung/langnghe/chinhsua/:id"
          component={LangngheChinhsua}
        />
        <Route
          path="/giamsatvung/langnghe/chitiet/:id"
          component={LangngheChitiet}
        />

        <Route exact path="/giamsatvung/daily1" component={Daily1} />
        <Route path="/giamsatvung/daily1/them" component={Daily1Them} />
        <Route
          path="/giamsatvung/daily1/chitiet/:id"
          component={Daily1Chitiet}
        />
        <Route
          path="/giamsatvung/daily1/chinhsua/:id"
          component={Daily1Chinhsua}
        />

        <Route
          exact
          path="/giamsatvung/daily2"
          render={(props) => <Daily2 {...props} setRefresh={setRefresh} />}
        />
        <Route
          path="/giamsatvung/daily2/chitiet/:id"
          component={Daily2Chitiet}
        />

        <Route exact path="/giamsatvung/donhang" component={Donhang} />
        <Route
          exact
          path="/giamsatvung/donhang/chitiet/:id"
          render={(props) => (
            <DonhangChitiet {...props} setRefresh={setRefresh} />
          )}
        />
        <Route
          path="/giamsatvung/donhang/chitiet/:id/tiendo"
          component={Tiendo}
        />
        <Route
          path="/giamsatvung/donhang/chitiet/:id/them"
          component={DonhangThem}
        />

        <Route exact path="/giamsatvung/sanpham" component={Sanpham} />
        <Route
          exact
          path="/giamsatvung/sanpham/chitiet/:id"
          component={SanphamChitiet}
        />
        <Route exact path="/giamsatvung/congcu" component={Congcu} />
        <Route
          exact
          path="/giamsatvung/congcu/chitiet/:id"
          component={CongcuChitiet}
        />
        <Route exact path="/giamsatvung/vattu" component={Vattu} />
        <Route
          exact
          path="/giamsatvung/vattu/chitiet/:id"
          component={VattuChitiet}
        />
        <Route exact path="/giamsatvung/nguyenlieu" component={Nguyenlieu} />
        <Route
          exact
          path="/giamsatvung/nguyenlieu/chitiet/:id"
          component={NguyenlieuChitiet}
        />
        <Route exact path="/giamsatvung/hodan" component={Hodan} />
        <Route path="/giamsatvung/hodan/chitiet/:id" component={HodanChitiet} />

        <Route
          exact
          path="/giamsatvung/sanpham/giaohang"
          component={Giaohang}
        />

        <Route exact path="/giamsatvung/hanggiaoden" component={Hanggiaoden} />
        <Route
          path="/giamsatvung/hanggiaoden/chitiet/:id"
          component={HanggiaodenChitiet}
        />

        <Route exact path="/giamsatvung/hanggiaodi" component={Hanggiaodi} />
        <Route
          path="/giamsatvung/hanggiaodi/chitiet/:id"
          component={HanggiaodiChitiet}
        />

        <Route
          exact
          path="/giamsatvung/thongtincanhan"
          render={(props) => <ThongtinCanhan {...props} type="giamsatvung" />}
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
