import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, SafeAreaView,RefreshControl } from "react-native";
import hodanApi from "../../api/hodanApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderPhanPhat from "./RenderPhanPhat";
import { useIsFocused } from '@react-navigation/native';
function ThongBao(props) {
  // const [infoHoDan, setInfoHoDan] = useState();
  const [orderList, setOrderList] = useState();
  const [hoDan, setHoDan] = useState("");
  const [callBack, setCallBack] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const isFocused = useIsFocused();
  const checkCallBack = (data)=>{
    
    if(data)
    {
      setCallBack(!callBack);
      // console.log(callBack);

    }
  }
  useEffect(() => {
    (async () => {
      //get info hodan
      const dataHodan = await hodanApi.getAll();
      //get id Account
      const dataAccount = await AsyncStorage.getItem("user");
      const findHoDan = dataHodan.hodan.find((item) => {
        return dataAccount.includes(item.user._id);
      });
      setHoDan(findHoDan);
      const getListOrder = await hodanApi.dsDonhang(findHoDan._id);
      setOrderList(getListOrder.dsdonhang);
    })();
  }, [callBack]);
  // console.log(orderList);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ color: "white" }}>Đơn hàng mới</Text>
      </View>
      {orderList && (
        <FlatList
          data={orderList}
          renderItem={(item, index) => (
            <RenderPhanPhat phanphat={item} hodanId={hoDan._id} checkCallBack={checkCallBack} />
          )}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  headerContainer: {
    backgroundColor: "#e65c00",
    paddingTop: 10,
    paddingBottom: 30,
    flex: 1,
    alignItems: "center",
  },
});
export default ThongBao;
