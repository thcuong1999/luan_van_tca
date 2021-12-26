import React, { useEffect, useState } from "react";
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

function KhoLoi(props) {
  const { navigation, idHodan } = props;
  const dataLoi = props.kholoi.item;
  const [data, setData] = useState();
  //   console.log(dataLoi);

  useEffect(() => {
    dataLoi.congcu
      ? setData(dataLoi.congcu)
      : dataLoi.vattu
      ? setData(dataLoi.vattu)
      : setData(dataLoi.nguyenlieu);
  }, []);
   //get link image
   const getImg = (imgName)=>{
    return `${axiosClient.defaults.baseURL}uploads/${imgName}`;
  }
 
  // console.log(dataLoi, data);
  return (
    <View style={styles.container}>
      {data && (
        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              marginLeft: 40,
              backgroundColor: "red",
              borderRadius: 20,
            }}
          >
            <View
              style={{ position: "relative", marginTop: -20, marginLeft: -30 }}
            >
              <Image
                source={{
                  uri: `${getImg(data.hinhanh)}`,
                  
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
              <Text style={{ color: "white" }}>Tên :{data.ten}</Text>
              <Text style={{ color: "white" }}>Công dụng :{data.congdung}</Text>
              <Text style={{ color: "white" }}>Mô tả :{data.mota}</Text>
              {dataLoi.nguyenlieu ? (
                <Text style={{ color: "white" }}>
                  Số lượng lỗi :{dataLoi.loi.khoiluongloi}
                </Text>
              ) : (
                <Text style={{ color: "white" }}>
                  Số lượng lỗi :{dataLoi.loi.soluongloi}
                </Text>
              )}
              <Text style={{ color: "white" }}>
                Ngày báo lỗi :{dataLoi.loi.ngaybaoloi}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
});
export default KhoLoi;
