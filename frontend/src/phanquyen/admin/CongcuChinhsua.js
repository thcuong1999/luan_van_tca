import React, { useState, useEffect } from "react";
import BackdropMaterial from "../../components/BackdropMaterial";
import {
  Container,
  Content,
  CrossButton,
  Form,
  FormContent,
  FormGroup,
  FormTitle,
  ImageToDisplay,
  Input,
  Label,
  PlusButton,
  TextArea,
} from "./styledComponents";
import Header from "../../components/Header";
import { toast } from "react-toastify";
import apiCongcu from "../../axios/apiCongcu";
import ten from "../../assets/icons/ten.png";
import cd from "../../assets/icons/congdung.png";
import mota from "../../assets/icons/mota.png";
import anh from "../../assets/icons/anh.png";
import tt from "../../assets/icons/thuoctinh.png";
import img_placeholder from "../../assets/images/img_placeholder.png";
import UploadButton from "../../components/UploadButton";

const CongcuChinhsua = (props) => {
  const [thuoctinh, setThuoctinh] = useState([{ ten: "", giatri: "" }]);
  const [loading, setLoading] = useState(false);
  const [congcu, setCongcu] = useState({});
  const { id: congcuId } = props.match.params;
  const [imgToDisplay, setImgToDisplay] = useState(null);

  const fetchCongcu = async () => {
    setLoading(true);
    const { congcu } = await apiCongcu.singleCongcu(congcuId);
    setCongcu(congcu);
    setThuoctinh(congcu.thuoctinh.length ? congcu.thuoctinh : thuoctinh);
    setLoading(false);
  };

  useEffect(() => {
    fetchCongcu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getThuocTinh = () => {
    if (
      thuoctinh.length === 1 &&
      thuoctinh[0].ten === "" &&
      thuoctinh[0].giatri === ""
    ) {
      return [];
    }
    return thuoctinh;
  };

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("ten", congcu.ten);
    formData.append("mota", congcu.mota);
    formData.append("hinhanh", congcu.hinhanh);
    formData.append("congdung", congcu.congdung);
    formData.append("thuoctinh", JSON.stringify(getThuocTinh()));
    formData.append("congcuId", congcuId);

    const { success } = await apiCongcu.suaCongcu(formData);
    if (success) {
      toast.success("C???p nh???t th??nh c??ng!", { theme: "colored" });
      props.history.push("/admin/congcu");
    }
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...thuoctinh];
    list[index][name] = value;
    setThuoctinh(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...thuoctinh];
    list.splice(index, 1);
    setThuoctinh(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setThuoctinh([...thuoctinh, { ten: "", giatri: "" }]);
  };

  // general handlechange
  const handleChange = (e) => {
    setCongcu({
      ...congcu,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <BackdropMaterial />;
  }

  return (
    <>
      <Container>
        <Header
          title="Quay l???i trang danh s??ch c??ng c???"
          titleBack
          onClick={() => props.history.push("/admin/congcu")}
          headerRight={
            <button className="btn btn-primary px-3" onClick={submitForm}>
              <span>L??u</span>
              <i class="fas fa-save"></i>
            </button>
          }
        />
        <Content>
          <Form>
            <FormContent>
              <FormTitle>
                <span>C???p nh???t c??ng c???</span>
              </FormTitle>

              <FormGroup>
                <Label>
                  <img src={ten} alt="ten" />
                  <span>T??n c??ng c???:</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Nh???p t??n c??ng c???"
                  value={congcu?.ten}
                  name="ten"
                  onChange={handleChange}
                />
                {/* {!ten && <ErrMsg>{errMsg}</ErrMsg>} */}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={mota} alt="mota" />
                  <span>M?? t??? c??ng c???:</span>
                </Label>
                <TextArea
                  value={congcu?.mota}
                  name="mota"
                  onChange={handleChange}
                  rows="4"
                  placeholder="Nh???p m?? t???"
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={anh} alt="anh" />
                  <span>H??nh ???nh:</span>
                </Label>
                <UploadButton
                  onChange={(e) => {
                    setCongcu({
                      ...congcu,
                      hinhanh: e.target.files[0],
                    });
                    if (e.target.files.length !== 0) {
                      setImgToDisplay(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
                <ImageToDisplay>
                  <img
                    src={
                      imgToDisplay
                        ? imgToDisplay
                        : congcu?.hinhanh
                        ? `/uploads/${congcu?.hinhanh}`
                        : img_placeholder
                    }
                    alt="congcuImg"
                    className={!congcu?.hinhanh && "noImage"}
                  />
                </ImageToDisplay>
              </FormGroup>
              <FormGroup>
                <Label>
                  <img src={cd} alt="congdung" />
                  <span>C??ng d???ng:</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Nh???p c??ng d???ng"
                  name="congdung"
                  value={congcu?.congdung}
                  onChange={handleChange}
                />
                {/* {!congdung && <ErrMsg>{errMsg}</ErrMsg>} */}
              </FormGroup>

              <FormGroup>
                <Label>
                  <img src={tt} alt="tt" />
                  <span>Thu???c t??nh:</span>
                </Label>
                {thuoctinh.map((item, key) => {
                  return (
                    <div className="row">
                      <div className="col-lg-4">
                        <FormGroup style={{ marginBottom: 10 }}>
                          <Input
                            type="text"
                            name="ten"
                            value={item.ten}
                            onChange={(e) => handleInputChange(e, key)}
                            placeholder="T??n thu???c t??nh"
                          />
                        </FormGroup>
                      </div>
                      <div className="col-lg-8">
                        <div className="d-flex align-items-center">
                          <Input
                            type="text"
                            name="giatri"
                            value={item.giatri}
                            onChange={(e) => handleInputChange(e, key)}
                            placeholder="Gi?? tr???"
                          />
                          {thuoctinh.length !== 1 && (
                            <CrossButton onClick={() => handleRemoveClick(key)}>
                              <i class="fas fa-times"></i>
                            </CrossButton>
                          )}
                        </div>
                      </div>

                      <div className="addElementBtn">
                        {thuoctinh.length - 1 === key && (
                          <PlusButton onClick={handleAddClick}>
                            <i class="fas fa-plus"></i>
                            <span>Th??m thu???c t??nh kh??c</span>
                          </PlusButton>
                        )}
                      </div>
                    </div>
                  );
                })}
              </FormGroup>
            </FormContent>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default CongcuChinhsua;
