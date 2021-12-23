import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialDialog } from "react-native-material-dialog";
import hodanApi from "../../../api/hodanApi";

function SreenDoiMatKhau(props) {
  const [passwordOld, onChangePasswordOld] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [passwordShown3, setPasswordShown3] = useState(false);
  const [passwordNew, setPasswordNew] = useState();
  const [passwordNew2, setPasswordNew2] = useState();
  const [user, setUser] = useState();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [errPassword, setErrPassword] = useState(
    "Mật khẩu mới không tương thích "
  );
  //   console.log(props);
  const { navigation } = props;
  useEffect(() => {
    const fetchData = async () => {
      const dataAccount = await AsyncStorage.getItem("user");
      setUser(dataAccount);
    };
    fetchData();
  }, []);
  const handleClose = () => {
    setVisible(false);
  };
  const handleOpen = () => {
    setVisible(true);
  };
  const handleClose2 = () => {
    setVisible2(false);
  };
  const handleOpen2 = () => {
    setVisible2(true);
  };
  const handleClickComfirm = async () => {
    try {
      if (passwordOld) {
        const dataForm = {
          user: user.replace(`"`, "").replace(`"`, ""),
          matkhau: passwordNew2,
        };
        const sendRequest = await hodanApi.doiMatkhau(dataForm);
        handleOpen2();
        // console.log(sendRequest);
      } else {
        handleOpen();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
      <View style={styles.headerContainer}>
        <Text style={{ color: "white" }}>Đổi mật khẩu </Text>
      </View>
      <MaterialDialog
        title="Cảnh báo"
        visible={visible}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Text style={{ color: "red" }}>Vui lòng nhập mật khẩu !</Text>
      </MaterialDialog>
      <MaterialDialog
        title="Cảnh báo"
        visible={visible2}
        onOk={() => {
          setVisible2(false);
          navigation.goBack();
        }}
        onCancel={() => {
          setVisible2(false);
          navigation.goBack();
        }}
      >
        <Text style={{ color: "green" }}>Đổi mật khẩu thành công !</Text>
      </MaterialDialog>
      <ScrollView>
        <View style={{ marginLeft: 40, marginTop: 10 }}>
          <Text>Nhập mật khẩu cũ</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={{
                height: 40,
                marginBottom: 12,
                marginTop: 12,
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                width: 250,
                color: "black",
              }}
              placeholder="Mật khẩu cũ"
              secureTextEntry={passwordShown ? false : true}
              onChangeText={onChangePasswordOld}
              value={passwordOld}
            />
            <Ionicons
              onPress={() => {
                setPasswordShown(!passwordShown);
              }}
              style={{ position: "relative", marginTop: 20, marginLeft: -30 }}
              name="eye"
              size={25}
              color="#0000b3"
            />
          </View>
          <Text>Nhập mật mới</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={{
                height: 40,
                marginBottom: 12,
                marginTop: 12,
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                width: 250,
                color: "black",
              }}
              placeholder="Mật khẩu cũ"
              secureTextEntry={passwordShown2 ? false : true}
              onChangeText={setPasswordNew}
              value={passwordNew}
            />
            <Ionicons
              onPress={() => {
                setPasswordShown2(!passwordShown2);
              }}
              style={{ position: "relative", marginTop: 20, marginLeft: -30 }}
              name="eye"
              size={25}
              color="#0000b3"
            />
          </View>
          <Text>Nhập lại mật khẩu mới</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={{
                height: 40,
                marginBottom: 12,
                marginTop: 12,
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                width: 250,
                color: "black",
              }}
              placeholder="Mật khẩu cũ"
              secureTextEntry={passwordShown3 ? false : true}
              onChangeText={setPasswordNew2}
              value={passwordNew2}
            />
            <Ionicons
              onPress={() => {
                setPasswordShown3(!passwordShown3);
              }}
              style={{ position: "relative", marginTop: 20, marginLeft: -30 }}
              name="eye"
              size={25}
              color="#0000b3"
            />
          </View>
          <Text style={{ color: "red" }}>
            {passwordNew === passwordNew2 ? "" : errPassword}
          </Text>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          paddingTop: 10,
          borderTopColor: "#b3b3b3",
          borderWidth: 1,
          borderRightWidth: 0,
          borderLeftWidth: 0,
          borderBottomWidth: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            borderColor: "#0000e6",
            borderWidth: 1,
            borderRadius: 90,
            width: 50,
            padding: 10,
            marginBottom: 10,
            textAlign: "center",
          }}
          onPress={() => {
            navigation.navigate("TabNav");
          }}
        >
          <Ionicons name="arrow-back" size={25} color="#0000b3" />
        </Text>
        <Text
          style={{
            padding: 10,
            marginBottom: 10,
            borderRadius: 10,
            backgroundColor: "#0000e6",
            width: 200,
            textAlign: "center",
            color: "white",
            marginLeft: 30,
          }}
          onPress={handleClickComfirm}
        >
          Xác nhận
        </Text>
      </View>
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
    paddingBottom: 15,
    alignItems: "center",
  },
});
export default SreenDoiMatKhau;
