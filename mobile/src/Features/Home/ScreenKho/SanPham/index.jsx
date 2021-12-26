import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  Dimensions,
} from "react-native";
import axiosClient from "../../../../api/axiosClient";

function SanPham(props) {
  const { navigation, idHodan } = props;
  const data = props.sanpham.item;
  // console.log(props);
  // const formatNumber = new Intl.NumberFormat('es');
  //get link image
  const getImg = (imgName)=>{
    return `${axiosClient.defaults.baseURL}uploads/${imgName}`;
  }
  return (
    <View style={styles.container}>
      <View style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            marginLeft: 40,
            backgroundColor: "#ff751a",
            borderRadius: 20,
          }}
        >
          <View
            style={{ position: "relative", marginTop: -20, marginLeft: -30 }}
          >
            <Image
              source={{
                uri: `${getImg(data.sanpham.hinhanh)}`,
              }}
              style={{
                width: Dimensions.get("window").width - 220,
                height: 130,
                borderRadius: 20,
              }}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white" }}>Tên :{data.sanpham.ten}</Text>
            <Text style={{ color: "white" }}>Giá : {data.sanpham.gia}đ</Text>
            <Text style={{ color: "white" }}>Mô tả :{data.sanpham.mota}</Text>
            <Text style={{ color: "white" }}>
              S.Lượng yêu cầu :{data.soluong}
            </Text>
            <Text style={{ color: "white" }}>
              S.Lượng hoàn thành :{data.soluonghoanthanh}
            </Text>
            <Text style={{ color: "white" }}>
              S.Lượng đã giao :{data.dagiao}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
});
export default SanPham;
