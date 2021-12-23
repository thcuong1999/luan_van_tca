import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function ListDonHang(props) {
  const {
    dataList: { item: data },
    navigation,
    hodanId,
  } = props;
  const checkComplelteOrder = data.dssanpham.find(
    (item) => item.soluong !== item.soluonghoanthanh
  );
  // console.log(checkComplelteOrder);
  const handleClickOrder = () => {
    navigation.navigate("DonHang", { data });
  };
  const handleClickSendOrder = () => {
    navigation.navigate("FormGiaoHang", { data, hodanId });
  };

  // console.log({ data });
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 20,
          paddingBottom: 20,
          paddingLeft: 5,
          borderRadius: 10,
          backgroundColor: "white",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ marginRight: 10 }} onPress={handleClickOrder}>
          <Ionicons name="cart" size={50} color="black" />
        </Text>
        <View style={{ marginRight: 10 }}>
          <Text>Mã đơn hàng : {data.ma}</Text>
          {checkComplelteOrder ? (
            <>
              <Text>Ngày nhận: {data.ngaytao}</Text>

              {data.dssanpham.map((item) => (
                <>
                  <Text key={item._id}>
                    <Ionicons name="square" size={5} color="black" />{" "}
                    {item.sanpham.ten} : {item.soluonghoanthanh}/{item.soluong}
                  </Text>
                </>
              ))}
            </>
          ) : (
            <Text>Ngày nhận: {data.ngaytao}</Text>
          )}
        </View>
        {!checkComplelteOrder ? (
          <Text
            style={[styles.btnClass, { backgroundColor: "green", fontSize: 9 }]}
          >
            Đã hoàn thành
          </Text>
        ) : (
          <Text
            style={[styles.btnClass, { backgroundColor: "red", fontSize: 11 }]}
            onPress={handleClickSendOrder}
          >
            Giao hàng
          </Text>
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  btnClass: {
    padding: 10,
    borderRadius: 10,
    color: "white",
  },
});
export default ListDonHang;
