import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from "axios";
import apiBophankd from "../axios/apiBophankd";
import apiGSV from "../axios/apiGSV";
import apiDaily1 from "../axios/apiDaily1";
import apiDaily2 from "../axios/apiDaily2";

const Header = ({
  title,
  onClick,
  titleBack,
  headerRight,
  arrOfLinks,
  vaitro,
}) => {
  const [active, setActive] = useState(false);
  const [data, setData] = useState(null);
  const { userInfo } = useSelector((state) => state.user);

  const fetchThongtinCanhan = async (vt) => {
    switch (vt) {
      case "admin":
        const {
          data: { admin },
        } = await Axios.get(`/api/admin/baseduserid/${userInfo._id}`);
        setData(admin);
        break;
      case "bophankd":
        const { bophankd } = await apiBophankd.bophankdBasedUserId(
          userInfo._id
        );
        setData(bophankd);
        break;
      case "giamsatvung":
        const { gsv } = await apiGSV.singleGsvBasedUserId(userInfo._id);
        setData(gsv);
        break;
      case "daily1":
        const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
        setData(daily1);
        break;
      case "daily2":
        const { daily2 } = await apiDaily2.singleDaily2BasedUser(userInfo._id);
        setData(daily2);
        break;

      default:
        return;
    }
  };

  useEffect(() => {
    fetchThongtinCanhan(vaitro);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaitro]);

  return (
    <Wrapper>
      {titleBack ? (
        <TitleBack onClick={onClick}>
          <i class="fas fa-angle-left"></i>
          <span>{title}</span>
        </TitleBack>
      ) : (
        <Title>{title}</Title>
      )}
      {!titleBack ? (
        <AvatarWrapper onClick={() => setActive(!active)}>
          <Avatar
            alt="Remy Sharp"
            src={
              data?.avatar
                ? `/uploads/${data?.avatar}`
                : "/static/images/avatar/1.jpg"
            }
            sx={{ width: 35, height: 35 }}
          />
          <span>{data?.ten}</span>
          <ExpandMoreIcon style={{ color: "#666" }} />
          <div className={`dropdown ${active && "active"}`}>
            <ul>
              {arrOfLinks &&
                arrOfLinks.map((link) => (
                  <li>
                    <Link to={link.url}>{link.text}</Link>
                  </li>
                ))}
            </ul>
          </div>
        </AvatarWrapper>
      ) : (
        <HeaderRight>{headerRight}</HeaderRight>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  background: #fff;
  min-height: 50px;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
`;
const Title = styled.h5`
  font-size: 18px;
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: #666;
`;
const TitleBack = styled.h5`
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #666;
  font-family: "Roboto", sans-serif;
  i {
    color: rgba(0, 0, 0, 0.35);
    margin-right: 10px;
    font-size: 20px;
  }
`;
const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    font-size: 15px;
    margin-left: 10px;
    color: #666;
    font-family: "Roboto", sans-serif;
  }
  .dropdown {
    display: none;
    position: absolute;
    right: 0;
    background: #fff;
    top: 38px;
    right: 0;
    z-index: 1;
    width: 260px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    ul {
      list-style: none;
      width: 100%;
      height: 100%;
      padding-top: 12px;
      li > a {
        display: block;
        padding: 10px 0 10px 45px;
        text-decoration: none;
        color: rgba(0, 0, 0, 0.45);
        font-family: "Roboto", sans-serif;
        background-color: rgba(0, 0, 0, 0.03);
        border-top-left-radius: 70px;
        border-bottom-left-radius: 10px;
        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
          font-weight: bold;
        }
      }
    }
    &.active {
      display: block;
    }
  }
`;
const HeaderRight = styled.div`
  display: flex;
  i {
    font-size: 22px;
    margin-left: 8px;
  }
  button {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 16px;
  }
`;

export default Header;
