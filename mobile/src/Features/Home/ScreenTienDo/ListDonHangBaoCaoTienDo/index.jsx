import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, LogBox } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function ListDonHangBaoCaoTienDo(props) {
  const {
    dataList: { item: data },
    navigation,
    hodanId,
  } = props;

  useEffect(() => {
    LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop']);
  }, []);

  // console.log(checkComplelteOrder);
  const handleClickOrder = () => {
    navigation.navigate("BCTienDo", { data, hodanId });
  };
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const completeNumberProduct = data.dssanpham
    .map((item) => item.soluonghoanthanh)
    .reduce(reducer);
  const numberProduct = data.dssanpham
    .map((item) => item.soluong)
    .reduce(reducer);
  const completePercent = Number.parseInt(
    (completeNumberProduct / numberProduct) * 100
  );
  //check complete order
  //   console.log(completePercent);

  //   console.log(data);
  return (
    <>
      {data.xacnhan && (
        <View
          style={{
            flexDirection: "row",
            paddingTop: 20,
            paddingBottom: 20,
            borderRadius: 10,
            backgroundColor: "white",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ marginRight: 5 }} onPress={handleClickOrder}>
            <Ionicons name="cart" size={50} color="black" />
          </Text>
          <View style={{ marginRight: 10 }}>
            <Text>Mã đơn hàng : {data.ma}</Text>
            {data.dssanpham.map((item) => (
              <>
                <Text key={item.sanpham._id}>
                  <Ionicons name="square" size={5} color="black" />{" "}
                  {item.sanpham.ten} : {item.soluonghoanthanh}/{item.soluong}
                </Text>
              </>
            ))}
          </View>

          <Text
            style={[
              styles.btnClass,
              { backgroundColor: "#ff6600", fontSize: 9 },
            ]}
          >
            Hoàn thành : {completePercent} %
          </Text>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  btnClass: {
    padding: 5,
    borderRadius: 10,
    color: "white",
    marginRight: 10,
  },
});
export default ListDonHangBaoCaoTienDo;
