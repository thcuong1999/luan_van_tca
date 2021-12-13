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
import VatTu from "../VatTu";

const ListVatTu = (props) => {
  const {navigation} = props;
  const idHodan = props.route.params.idHodan;
  const [listVatTu, setListVatTu] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const getData = await hodanApi.dsVattu(idHodan);
      setListVatTu(getData.dsvattu);
    };
    fetchData();
  }, []);
 
  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.headerContainer}>
        <Text style={{ color: "white" }}>Danh sách vật tư</Text>
      </View>
      {listVatTu && (
        <FlatList
          data={listVatTu}
          renderItem={(item) => <VatTu vattu={item}  navigation={navigation} idHodan={idHodan}  />}
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

export default ListVatTu;
