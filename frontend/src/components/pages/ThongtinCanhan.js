import React, { useEffect, useState } from "react";
import {
  Avatar,
  Container,
  Section,
  Input,
  InputBox,
  Label,
  MenuItem,
  Menus,
  Title,
  Wrapper,
  Button,
  EditAvatar,
  ButtonBox,
  ToggleBtn,
  Btn,
  FlexRow,
  FlexCollumn,
  ButtonsWrapper,
} from "./styledComponents";
import { useSelector } from "react-redux";
import Axios from "axios";
import BackdropMaterial from "../BackdropMaterial";
import apiBophankd from "../../axios/apiBophankd";
import apiGSV from "../../axios/apiGSV";
import apiDaily1 from "../../axios/apiDaily1";
import apiDaily2 from "../../axios/apiDaily2";

const ThongtinCanhan = ({ type }) => {
  const [activeTab, setActiveTab] = useState("canhan");
  const [loading, setLoading] = useState(false);
  const [hinhanh, setHinhanh] = useState(null);
  const [imgToDisplay, setImgToDisplay] = useState(null);
  const [data, setData] = useState(null);
  const { userInfo } = useSelector((state) => state.user);

  const fetchThongtinCanhan = async () => {
    switch (type) {
      case "admin":
        setLoading(true);
        const { data } = await Axios.get(
          `/api/admin/baseduserid/${userInfo._id}`
        );
        setData(data.admin);
        setLoading(false);
        break;
      case "bophankd":
        setLoading(true);
        const { bophankd } = await apiBophankd.bophankdBasedUserId(
          userInfo._id
        );
        setData(bophankd);
        setLoading(false);
        break;
      case "giamsatvung":
        setLoading(true);
        const { gsv } = await apiGSV.singleGsvBasedUserId(userInfo._id);
        setData(gsv);
        setLoading(false);
        break;
      case "daily1":
        setLoading(true);
        const { daily1 } = await apiDaily1.singleDaily1BasedUser(userInfo._id);
        setData(daily1);
        setLoading(false);
        break;
      case "daily2":
        setLoading(true);
        const { daily2 } = await apiDaily2.singleDaily2BasedUser(userInfo._id);
        setData(daily2);
        setLoading(false);
        break;

      default:
        return;
    }
  };

  useEffect(() => {
    fetchThongtinCanhan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Container>
      <Wrapper>
        <Title>Cá nhân</Title>

        <Menus>
          <MenuItem>Thông tin chi tiết</MenuItem>
        </Menus>

        <Avatar>
          <img
            src="https://avatarfiles.alphacoders.com/115/115265.png"
            alt="avatar"
          />
          <label htmlFor="contained-button-file">
            <input accept="image/*" id="contained-button-file" type="file" />
            <EditAvatar>
              <i class="fas fa-pencil-alt"></i>
            </EditAvatar>
          </label>
        </Avatar>

        {type === "admin" ? (
          <>
            <Section
              className={
                activeTab === "canhan" ? "canhanActive" : "canhanDeactive"
              }
            >
              <FlexRow>
                <InputBox>
                  <Label>Tên</Label>
                  <Input type="text" value={data?.ten} />
                </InputBox>
                <InputBox>
                  <Label>Số điện thoại</Label>
                  <Input type="text" value={data?.sdt} />
                </InputBox>
              </FlexRow>

              <FlexRow>
                <InputBox>
                  <Label>E-mail</Label>
                  <Input type="text" value={data?.email} />
                </InputBox>
                <InputBox>
                  <Label>Xã</Label>
                  <Input type="text" value={data?.diachi.split(", ")[0]} />
                </InputBox>
              </FlexRow>

              <FlexRow>
                <InputBox>
                  <Label>Huyện</Label>
                  <Input type="text" value={data?.diachi.split(", ")[1]} />
                </InputBox>
                <InputBox>
                  <Label>Tỉnh</Label>
                  <Input type="text" value={data?.diachi.split(", ")[2]} />
                </InputBox>
              </FlexRow>
            </Section>

            <Section
              className={
                activeTab === "taikhoan" ? "taikhoanActive" : "taikhoanDeactive"
              }
            >
              <FlexCollumn>
                <InputBox>
                  <Label>Tài khoản</Label>
                  <Input type="text" value="nguyenvana" />
                </InputBox>

                <InputBox>
                  <Label>Mật khẩu cũ</Label>
                  <Input
                    type="password"
                    style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
                  />
                </InputBox>

                <InputBox>
                  <Label>Mật khẩu mới</Label>
                  <Input
                    type="password"
                    style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
                  />
                </InputBox>

                <InputBox>
                  <Label>Xác nhận mật khẩu</Label>
                  <Input
                    type="password"
                    style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
                  />
                </InputBox>
              </FlexCollumn>
            </Section>
          </>
        ) : null}

        {type === "bophankd" ||
        type === "giamsatvung" ||
        type === "daily1" ||
        type === "daily2" ? (
          <>
            <Section
              className={
                activeTab === "canhan" ? "canhanActive" : "canhanDeactive"
              }
            >
              <FlexRow>
                <InputBox>
                  <Label>Tên</Label>
                  <Input type="text" value={data?.ten} />
                </InputBox>
                <InputBox>
                  <Label>Số điện thoại</Label>
                  <Input type="text" value={data?.sdt} />
                </InputBox>
              </FlexRow>

              <FlexRow>
                <InputBox>
                  <Label>E-mail</Label>
                  <Input type="text" value={data?.email} />
                </InputBox>
                <InputBox>
                  <Label>Xã</Label>
                  <Input type="text" value={data?.xa} />
                </InputBox>
              </FlexRow>

              <FlexRow>
                <InputBox>
                  <Label>Huyện</Label>
                  <Input type="text" value={data?.tinh} />
                </InputBox>
                <InputBox>
                  <Label>Tỉnh</Label>
                  <Input type="text" value={data?.huyen} />
                </InputBox>
              </FlexRow>
            </Section>

            <Section
              className={
                activeTab === "taikhoan" ? "taikhoanActive" : "taikhoanDeactive"
              }
            >
              <FlexCollumn>
                <InputBox>
                  <Label>Tài khoản</Label>
                  <Input type="text" value="nguyenvana" />
                </InputBox>

                <InputBox>
                  <Label>Mật khẩu cũ</Label>
                  <Input
                    type="password"
                    style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
                  />
                </InputBox>

                <InputBox>
                  <Label>Mật khẩu mới</Label>
                  <Input
                    type="password"
                    style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
                  />
                </InputBox>

                <InputBox>
                  <Label>Xác nhận mật khẩu</Label>
                  <Input
                    type="password"
                    style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
                  />
                </InputBox>
              </FlexCollumn>
            </Section>
          </>
        ) : null}

        <ButtonsWrapper>
          <Button>Lưu</Button>
          <ButtonBox>
            <Btn className={activeTab === "canhan" ? "canhan" : "taikhoan"} />
            <ToggleBtn onClick={() => setActiveTab("canhan")}>
              Cá nhân
            </ToggleBtn>
            <ToggleBtn onClick={() => setActiveTab("taikhoan")}>
              Tài khoản
            </ToggleBtn>
          </ButtonBox>
        </ButtonsWrapper>
      </Wrapper>
    </Container>
  );
};

export default ThongtinCanhan;
