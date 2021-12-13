import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import ListDonHangBaoCaoTienDo from "./ListDonHangBaoCaoTienDo";
import Ionicons from "react-native-vector-icons/Ionicons";
import hodanApi from "../../../api/hodanApi";

function ScreenTienDo(props) {
  const {navigation, hodanId } = props;
  // console.log(hodanId);
  const [orderList, setOrderList] = useState();
  const [orderNoComplete, setOrderNoComplete] = useState();
  useEffect(() => {
    (async () => {
      const getListOrder = await hodanApi.dsDonhang(hodanId);
      setOrderList(getListOrder.dsdonhang);
      setOrderNoComplete(getListOrder.dsdonhang.filter(order=>order.dssanpham.find(sp=>sp.soluong !==sp.soluonghoanthanh)));
    })();
  }, []);
//   console.log(orderNoComplete)
 
  return (
    <View style={{}}>
      {orderNoComplete && (
        <FlatList
          data={orderNoComplete}
          renderItem={(item, index) => <ListDonHangBaoCaoTienDo dataList={item} navigation={navigation} hodanId={hodanId} />}
          keyExtractor={(item) => item._id}
        />
      )}
       
    </View>
  );
}

export default ScreenTienDo;
