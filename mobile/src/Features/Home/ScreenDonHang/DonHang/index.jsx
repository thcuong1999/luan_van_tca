import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import StickyHeaderFooterScrollView from "react-native-sticky-header-footer-scroll-view";
function DonHang(props) {
  const data = props.route.params.data;
  const { navigation } = props;
  // const formatter = new Intl.NumberFormat("es");
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
      <View style={styles.headerContainer}>
        <Text style={{ color: "white" }}>Thông tin đơn hàng</Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ marginLeft: 20 }}>
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
                      : {item.soluong}
                    </Text>
                    <Text style={{ color: "green" }}>
                      <Ionicons name="square" size={5} color="black" /> Số lượng
                      đã hoàn thành : {item.soluonghoanthanh}
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
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          paddingTop: 10,
          borderTopColor: "#b3b3b3",
          borderWidth: 1,
          borderRightWidth: 0,
          borderLeftWidth: 0,
          borderBottomWidth: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            borderColor: "#0000e6",
            borderWidth: 1,
            borderRadius: 90,
            width: 50,
            padding: 10,
            marginBottom: 10,
            textAlign: "center",
          }}
          onPress={() => {
            navigation.navigate("TabNav");
          }}
        >
          <Ionicons name="arrow-back" size={25} color="#0000b3" />
        </Text>
        <Text
          style={{
            padding: 10,
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: "#0000e6",
            width: 200,
            textAlign: "center",
            color: "white",
            marginLeft: 30,
          }}
          onPress={() => {
            navigation.navigate("TabNav");
          }}
        >
          Xác nhận
        </Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  headerContainer: {
    backgroundColor: "#e65c00",
    padding: 15,
    alignItems: "center",
  },
});
export default DonHang;
