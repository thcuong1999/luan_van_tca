import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import bpkd from "../../assets/icons/bpkd2.png";
import BackdropMaterial from "../../components/BackdropMaterial";
import gsv from "../../assets/icons/gsv_2.png";
import spln from "../../assets/icons/spln_2.png";
import axios from "axios";
import { links } from "./arrayOfLinks";

const TongQuan = (props) => {
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/admin/tongquan");
    setCounts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <Wrapper>
      <Header title="Tổng quan" arrOfLinks={links} vaitro="admin" />
      <Content>
        <div className="row mb-4">
          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/bophankd")}>
              <CardContent>
                <TextInfo>
                  <div>{counts?.bpkd}</div>
                  <span>Bộ phận kinh doanh</span>
                </TextInfo>
                <Icon>
                  <Image src={bpkd} alt="bpkd" />
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/gsv")}>
              <CardContent>
                <TextInfo>
                  <div>{counts?.gsv}</div>
                  <span>Giám sát vùng</span>
                </TextInfo>
                <Icon>
                  <Image src={gsv} alt="daily1" />
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/loaisanpham")}>
              <CardContent>
                <TextInfo>
                  <div>{counts?.loaisp}</div>
                  <span>Loại sản phẩm</span>
                </TextInfo>
                <Icon>
                  <i class="fab fa-centercode"></i>
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/congcu")}>
              <CardContent>
                <TextInfo>
                  <div>{counts?.congcu}</div>
                  <span>Công cụ</span>
                </TextInfo>
                <Icon>
                  <i class="fas fa-tools"></i>
                </Icon>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/vattu")}>
              <CardContent>
                <TextInfo>
                  <div>{counts?.vattu}</div>
                  <span>Vật tư</span>
                </TextInfo>
                <Icon>
                  <i class="fab fa-accusoft"></i>
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/nguyenlieu")}>
              <CardContent>
                <TextInfo>
                  <div>{counts?.nglieu}</div>
                  <span>Nguyên liệu</span>
                </TextInfo>
                <Icon>
                  <i class="fab fa-bandcamp"></i>
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/sanpham")}>
              <CardContent>
                <TextInfo>
                  <div>{counts?.sanpham}</div>
                  <span>Sản phẩm</span>
                </TextInfo>
                <Icon>
                  <Image src={spln} alt="splangnghe" />
                </Icon>
              </CardContent>
            </Card>
          </div>

          <div className="col-lg-3">
            <Card onClick={() => props.history.push("/admin/donhang")}>
              <CardContent>
                <TextInfo>
                  <div>{counts?.donhang}</div>
                  <span>Đơn hàng</span>
                </TextInfo>
                <Icon>
                  <i class="far fa-newspaper"></i>
                </Icon>
              </CardContent>
            </Card>
          </div>
        </div>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  background: #f0eeee;
  padding: 26px 36px;
  font-family: "Poppins", sans-serif;
`;
const Card = styled.div`
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 24px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgb(0 0 20 / 8%), 0 1px 2px rgb(0 0 20 / 8%);
  cursor: pointer;
  &:hover {
    box-shadow: 4px 6px 4px rgba(0, 0, 0, 0.2);
  }
`;
const CardContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TextInfo = styled.div`
  div {
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 4px;
    color: #0f73ba;
  }
  span {
    color: #777;
    font-size: 16px;
  }
`;
const Icon = styled.div`
  i {
    font-size: 40px;
    opacity: 0.3;
  }
`;
const Image = styled.img`
  width: 40px;
  opacity: 0.35;
`;

export default TongQuan;
