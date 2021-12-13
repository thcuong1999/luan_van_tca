import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { logout } from "../auth/userSlice";

const CaNhan = ({navigation}) => {
 const dispatch = useDispatch();
  const handleChangePassWord = () => {
    // console.log("ChangePassWord");
    navigation.navigate('ScreenDoiMatKhau');
  };

  const handleClickLogout = () => {
    dispatch(logout());
    navigation.navigate('Login')
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={{ color: "white" }}>Thông tin cá nhân </Text>
      </View>
      <View style={styles.containerRowRedirect}>
       
        <View style={{ marginRight: 30 }}>
          <Text onPress={handleChangePassWord}>
            <View style={styles.containerRedirectKho}>
              <Ionicons name="basket" size={60} color="#0000b3" />
            </View>
          </Text>
          <Text style={[{ marginTop: 10, textAlign: "center" }]}>
            Đổi mật khẩu
          </Text>
        </View>
        <View>
          <Text onPress={handleClickLogout}>
            <View style={styles.containerRedirectKho}>
              <Ionicons name="close-circle" size={60} color="#0000b3" />
            </View>
          </Text>

          <Text style={[{ marginTop: 10, textAlign: "center" }]}>
            Đăng xuất
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  containerRowRedirect: {
    flexDirection: "row",
    padding: 20,
  },
  containerRedirectKho: {
    borderRadius: 90,
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 15,
    backgroundColor: "white",
    marginRight: 15,
  },
});

export default CaNhan;
