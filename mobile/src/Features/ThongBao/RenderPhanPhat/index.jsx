import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Dimensions,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import hodanApi from "../../../api/hodanApi";
import { Snackbar } from "react-native-paper";
function RenderPhanPhat(props) {
  const { phanphat, hodanId, checkCallBack } = props;
  const { item: data } = phanphat;
  // console.log(props);
  const [visible, setVisible] = useState(false);
  // const formatter = new Intl.NumberFormat("es");

  const handleComfirm = async () => {
    //call to send request
    try {
      const sendRequest = await hodanApi.xacnhan(hodanId, data._id);
      checkCallBack("Callback");
      setVisible(true);
    } catch (error) {
      console.log(error, RNRestart);
    }
  };
  return (
    <>
      <View
        style={{ marginBottom: 30, flexDirection: "column-reverse" }}
        key={data._id}
      >
        <View
          style={{
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          <Snackbar
            visible={visible}
            onDismiss={() => setVisible(false)}
            duration={6000}
            style={{ backgroundColor: "green" }}
          >
            Xác nhận đơn hàng thành công !
          </Snackbar>
        </View>

        <View
          style={{
            padding: 10,
            backgroundColor: "white",
            borderColor: "#cccccc",
            borderWidth: 1,
            marginTop: 10,
            marginLeft: 50,
            marginRight: 40,
            borderRadius: 20,
            marginBottom: 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              style={{ position: "relative", marginLeft: -55, marginTop: -5 }}
              name="logo-buffer"
              size={30}
              color="black"
            />
            <Ionicons
              style={{
                position: "relative",
                marginLeft: -3,
                marginTop: -3,
                transform: [{ rotate: "60deg" }],
              }}
              name="play"
              size={15}
              color="#cccccc"
            />
          </View>
          <View style={{ marginLeft: 3, position: "relative", marginTop: -30 }}>
            <Text>Mã đơn hàng : {data.ma}</Text>
            {data.dssanpham.map((item, index) => (
              <>
                <View key={item._id}>
                  <Text>Sản phẩm {index + 1}</Text>
                  <View style={{ marginLeft: 10 }}>
                    <Text>
                      <Ionicons name="square" size={5} color="black" /> Tên sản
                      phẩm : {item.sanpham.ten}
                    </Text>
                    <Text>
                      <Ionicons name="square" size={5} color="black" /> Mã sản
                      phẩm : {item.sanpham.ma}
                    </Text>
                    <Text>
                      <Ionicons name="square" size={5} color="black" /> Số lượng
                      : {item.soluong}m
                    </Text>

                    {/* <Text><Ionicons name="square" size={5} color="black"  />
                    {" "}Đơn vị : {item.donvi}</Text> */}
                    <Text>
                      <Ionicons name="square" size={5} color="black" /> Đơn giá
                      : {item.sanpham.gia} vnđ/m
                    </Text>
                    <Text>
                      <Ionicons name="square" size={5} color="black" /> Mô tả :{" "}
                      {item.sanpham.mota}
                    </Text>
                    {item.sanpham.dscongcu &&
                      item.sanpham.dscongcu.map((item, index) => (
                        <>
                          <View key={item._id}>
                            <Text>
                              <Ionicons name="square" size={5} color="black" />{" "}
                              Công cụ
                            </Text>
                            <View style={{ marginLeft: 40 }}>
                              <Text>
                                <Ionicons
                                  name="square"
                                  size={5}
                                  color="black"
                                />{" "}
                                Tên công cụ : {item.congcu.ten}
                              </Text>
                              <Text>
                                <Ionicons
                                  name="square"
                                  size={5}
                                  color="black"
                                />{" "}
                                Số lượng: {item.soluong} máy
                              </Text>
                              <Text>
                                <Ionicons
                                  name="square"
                                  size={5}
                                  color="black"
                                />{" "}
                                Mô tả : {item.congcu.mota}
                              </Text>
                            </View>
                          </View>
                        </>
                      ))}
                    {item.sanpham.dsvattu &&
                      item.sanpham.dsvattu.map((item, index) => (
                        <>
                          <View key={item._id}>
                            <Text>
                              <Ionicons name="square" size={5} color="black" />{" "}
                              Vật tư
                            </Text>
                            <View style={{ marginLeft: 40 }}>
                              <Text>
                                <Ionicons
                                  name="square"
                                  size={5}
                                  color="black"
                                />{" "}
                                Tên vật tư : {item.vattu.ten}
                              </Text>
                              <Text>
                                <Ionicons
                                  name="square"
                                  size={5}
                                  color="black"
                                />{" "}
                                Số lượng: {item.soluong} cái
                              </Text>
                              <Text>
                                <Ionicons
                                  name="square"
                                  size={5}
                                  color="black"
                                />{" "}
                                Mô tả : {item.vattu.mota}
                              </Text>
                            </View>
                          </View>
                        </>
                      ))}
                    {item.sanpham.dsnguyenlieu &&
                      item.sanpham.dsnguyenlieu.map((item, index) => (
                        <>
                          <View key={item._id}>
                            <Text>
                              <Ionicons name="square" size={5} color="black" />{" "}
                              Nguyên liệu
                            </Text>
                            <View style={{ marginLeft: 40 }}>
                              <Text>
                                Tên nguyên liệu: {item.nguyenlieu.ten}
                              </Text>
                              <Text>
                                Số lượng: {item.khoiluong} {item.donvitinh}
                              </Text>
                              <Text>Mô tả : {item.nguyenlieu.mota}</Text>
                            </View>
                          </View>
                        </>
                      ))}
                  </View>
                </View>
              </>
            ))}

            <Text>Tổng tiền : {data.tongdongia} VNĐ</Text>
            <Text>Ngày gửi : {data.ngaytao}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            {data.xacnhan ? (
              <Text style={[styles.btnClass, { backgroundColor: "#a6a6a6" }]}>
                Đã xác nhận
              </Text>
            ) : (
              <Text
                style={[styles.btnClass, { backgroundColor: "#0000e6" }]}
                onPress={handleComfirm}
              >
                Xác nhận
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ padding: 10, backgroundColor: "#cccccc" }}>
            Ngày {data.ngaytao}
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imgClass: {
    width: Dimensions.get("window").width - 300,
    height: 100,
    borderRadius: 5,
  },
  containerItem: {
    flexDirection: "row",
    marginLeft: 0,
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
  },
  containerText: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  txt: {
    color: "black",
  },
  btnClass: {
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 13,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: "white",
  },
});
export default RenderPhanPhat;
