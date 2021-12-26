import React from "react";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import { Route, NavLink } from "react-router-dom";
import { logout } from "../../redux/actions/userActions";
import TongQuan from "./Tongquan";
import Bophankd from "./Bophankd";
import BophankdThem from "./BophankdThem";
import BophankdChitiet from "./BophankdChitiet";
import BophankdChinhsua from "./BophankdChinhsua";
import GSV from "./GSV";
import GSVThem from "./GSVThem";
import GSVChitiet from "./GSVChitiet";
import GSVChinhsua from "./GSVChinhsua";
import LogoutButton from "../../components/LogoutButton";
import styled from "styled-components";
import Sanpham from "./Sanpham";
import SanphamThem from "./SanphamThem";
import SanphamChinhsua from "./SanphamChinhsua";
import SanphamChitiet from "./SanphamChitiet";
import LoaiSanphamChinhsua from "./LoaiSanphamChinhsua";
import LoaiSanpham from "./LoaiSanpham";
import LoaiSanphamThem from "./LoaiSanphamThem";
import LoaiSanphamChitiet from "./LoaiSanphamChitiet";
import homeIcon from "../../assets/icons/home.png";
import bpkdIcon from "../../assets/icons/bpkd.png";
import gsvIcon from "../../assets/icons/gsv.png";
import splnIcon from "../../assets/icons/spln.png";
import Congcu from "./Congcu";
import CongcuThem from "./CongcuThem";
import CongcuChitiet from "./CongcuChitiet";
import CongcuChinhsua from "./CongcuChinhsua";
import Vattu from "./Vattu";
import VattuThem from "./VattuThem";
import VattuChinhsua from "./VattuChinhsua";
import VattuChitiet from "./VattuChitiet";
import Nguyenlieu from "./Nguyenlieu";
import NguyenlieuThem from "./NguyenlieuThem";
import NguyenlieuChitiet from "./NguyenlieuChitiet";
import NguyenlieuChinhsua from "./NguyenlieuChinhsua";
import Donhang from "./Donhang";
import DonhangThem from "./DonhangThem";
import DonhangChitiet from "./DonhangChitiet";
import ThongtinCanhan from "../../components/pages/ThongtinCanhan";
import Taisudung from "./Taisudung";

const Dashboard = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/");
  };

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
              to="/admin"
              activeClassName={props.match.path === "/admin" && "active"}
            >
              <Image src={homeIcon} alt="home" />
              <span>Tổng quan</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/admin/bophankd" activeClassName="active">
              <Image src={bpkdIcon} alt="bpkd" />
              <span>Bộ phận kinh doanh</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/admin/gsv" activeClassName="active">
              <Image src={gsvIcon} alt="gsv" />
              <span>Giám sát vùng</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/admin/loaisanpham" activeClassName="active">
              <i class="fab fa-centercode"></i>
              <span>Loại sản phẩm</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/admin/congcu" activeClassName="active">
              <i class="fas fa-tools"></i>
              <span>Công cụ</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/admin/vattu" activeClassName="active">
              <i class="fab fa-accusoft"></i>
              <span>Vật tư</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/admin/nguyenlieu" activeClassName="active">
              <i class="fab fa-bandcamp"></i>
              <span>Nguyên liệu</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/admin/sanpham" activeClassName="active">
              <Image src={splnIcon} alt="splangnghe" />
              <span>Sản phẩm</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <NavLink to="/admin/donhang" activeClassName="active">
              <i class="far fa-newspaper"></i>
              <span>Đơn hàng</span>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <LogoutButton onClick={handleLogout}>Đăng xuất</LogoutButton>
          </MenuItem>
        </Menu>
      </LeftMenu>

      <RightContent>
        <Route exact path="/admin" component={TongQuan} />
        <Route exact path="/admin/bophankd" component={Bophankd} />
        <Route path="/admin/bophankd/them" component={BophankdThem} />
        <Route path="/admin/bophankd/chitiet/:id" component={BophankdChitiet} />
        <Route
          path="/admin/bophankd/chinhsua/:id"
          component={BophankdChinhsua}
        />

        <Route exact path="/admin/gsv" component={GSV} />
        <Route path="/admin/gsv/them" component={GSVThem} />
        <Route path="/admin/gsv/chitiet/:id" component={GSVChitiet} />
        <Route path="/admin/gsv/chinhsua/:id" component={GSVChinhsua} />

        <Route exact path="/admin/sanpham" component={Sanpham} />
        <Route path="/admin/sanpham/them" component={SanphamThem} />
        <Route path="/admin/sanpham/chitiet/:id" component={SanphamChitiet} />
        <Route path="/admin/sanpham/chinhsua/:id" component={SanphamChinhsua} />

        <Route exact path="/admin/loaisanpham" component={LoaiSanpham} />
        <Route path="/admin/loaisanpham/them" component={LoaiSanphamThem} />
        <Route
          path="/admin/loaisanpham/chitiet/:id"
          component={LoaiSanphamChitiet}
        />
        <Route
          path="/admin/loaisanpham/chinhsua/:id"
          component={LoaiSanphamChinhsua}
        />

        <Route exact path="/admin/congcu" component={Congcu} />
        <Route path="/admin/congcu/them" component={CongcuThem} />
        <Route path="/admin/congcu/chitiet/:id" component={CongcuChitiet} />
        <Route path="/admin/congcu/chinhsua/:id" component={CongcuChinhsua} />

        <Route exact path="/admin/vattu" component={Vattu} />
        <Route path="/admin/vattu/them" component={VattuThem} />
        <Route path="/admin/vattu/chitiet/:id" component={VattuChitiet} />
        <Route path="/admin/vattu/chinhsua/:id" component={VattuChinhsua} />

        <Route exact path="/admin/nguyenlieu" component={Nguyenlieu} />
        <Route path="/admin/nguyenlieu/them" component={NguyenlieuThem} />
        <Route
          path="/admin/nguyenlieu/chitiet/:id"
          component={NguyenlieuChitiet}
        />
        <Route
          path="/admin/nguyenlieu/chinhsua/:id"
          component={NguyenlieuChinhsua}
        />

        <Route exact path="/admin/donhang" component={Donhang} />
        <Route path="/admin/donhang/them" component={DonhangThem} />
        <Route path="/admin/donhang/chitiet/:id" component={DonhangChitiet} />

        <Route
          exact
          path="/admin/thongtincanhan"
          render={(props) => <ThongtinCanhan {...props} type="admin" />}
        />

        <Route path="/admin/sanpham/taisudung/:id" component={Taisudung} />
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
      margin-left: 14px;
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
