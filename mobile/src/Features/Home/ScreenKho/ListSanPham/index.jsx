import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import hodanApi from "../../../../api/hodanApi";
import CongCu from "../CongCu";
import SanPham from "../SanPham";

const ListSanPham = (props) => {
  const idHodan = props.route.params.idHodan;
  const {navigation} = props;
  const [listSanPham, setlistSanPham] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const getData = await hodanApi.dsCongcu(idHodan);
      const getListSanPham = await hodanApi.get(idHodan);
      setlistSanPham(getListSanPham.hodan.dssanpham);
      // console.log(getListSanPham.hodan.dssanpham);
    };
    fetchData();
  }, []);
  // console.log(props);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ color: "white" }}>Danh sách sản phẩm</Text>
      </View>
      {listSanPham && (
        <FlatList
          data={listSanPham}
          renderItem={(item) => <SanPham sanpham={item} navigation={navigation} idHodan={idHodan} />}
          keyExtractor={(item) => item._id}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  headerContainer: {
    backgroundColor: "#e65c00",
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: "center",
  },
});

export default ListSanPham;
