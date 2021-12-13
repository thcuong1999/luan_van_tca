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
import NguyenLieu from "../NguyenLieu";

const ListNguyenLieu = (props) => {
  const {navigation} = props;
  const idHodan = props.route.params.idHodan;
  const [listNguyenLieu, setListNguyenLieu] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const getData = await hodanApi.dsNguyenlieu(idHodan);
      setListNguyenLieu(getData.dsnguyenlieu);
    };
    fetchData();
  }, []);
  // console.log(listCongCu);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ color: "white" }}>Danh sách Nguyên liệu</Text>
      </View>
      {listNguyenLieu && (
        <FlatList
          data={listNguyenLieu}
          renderItem={(item) => <NguyenLieu nguyenlieu={item} navigation={navigation} idHodan={idHodan} />}
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

export default ListNguyenLieu;
