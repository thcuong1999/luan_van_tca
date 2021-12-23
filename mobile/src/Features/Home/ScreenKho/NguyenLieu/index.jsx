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

function NguyenLieu(props) {
  const { navigation, idHodan } = props;
  const data = props.nguyenlieu.item;
  // console.log(data);
  const handleClickError = () => {
    navigation.navigate("FormNguyenLieuLoi", { ...data, idHodan });
  };
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
                uri: `http://10.3.53.160:5000/uploads/${data.nguyenlieu.hinhanh}`,
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
            <Text style={{ color: "white" }}>Tên :{data.nguyenlieu.ten}</Text>
            <Text style={{ color: "white" }}>
              Công dụng :{data.nguyenlieu.congdung}
            </Text>
            <Text style={{ color: "white" }}>
              Mô tả :{data.nguyenlieu.mota}
            </Text>
            <Text style={{ color: "white" }}>khối lượng :{data.khoiluong} kg</Text>
            <Text
              style={{
                color: "white",
                padding: 5,
                backgroundColor: "red",
                textAlign: "center",
                marginTop: 5,
                borderRadius: 10,
              }}
              onPress={handleClickError}
            >
              Báo lỗi
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
export default NguyenLieu;
