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
import KhoLoi from "../KhoLoi";

const ListKhoLoi = (props) => {
  const idHodan = props.route.params.idHodan;
  const {navigation} = props;
  const [listKhoLoi, setListKhoLoi] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const getCCLoi = await hodanApi.dsCongcuHuloi(idHodan);
      const getVTLoi = await hodanApi.dsVattuHuloi(idHodan);
      const getNLLoi = await hodanApi.dsNguyenlieuHuloi(idHodan);

      setListKhoLoi([...getCCLoi.dscongcuhuloi,...getVTLoi.dsvattuhuloi,...getNLLoi.dsnguyenlieuhuloi]);

    };
    fetchData();
  }, []);

      //  console.log(listKhoLoi);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ color: "white" }}>Danh sách kho lỗi</Text>
      </View>
      {listKhoLoi && (
        <FlatList
          data={listKhoLoi}
          renderItem={(item) => <KhoLoi kholoi={item} navigation={navigation} idHodan={idHodan} />}
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
    backgroundColor: "red",
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: "center",
  },
});

export default ListKhoLoi;
