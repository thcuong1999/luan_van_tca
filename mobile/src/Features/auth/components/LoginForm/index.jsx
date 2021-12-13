import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../../userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import userApi from "../../../../api/userApi";
import { MaterialDialog } from "react-native-material-dialog";
const SignupSchema = Yup.object().shape({
  taikhoan: Yup.string().required("Tài khoản chưa hợp lệ "),
  matkhau: Yup.string().required("Mật khẩu chưa hợp lệ"),
});

function LoginForm(props) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [check, setCheck] = useState();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const dataApi = await userApi.getAll();
      setCheck(dataApi);
    };
    getData();
  }, []);
  const handleClose = () => {
    setVisible(false);
  };
  const handleOpen = () => {
    setVisible(true);
  };
  const handleSumitLogin = async (values) => {
    // console.log(check);

    try {
      const dataForm ={
        taikhoan : values.taikhoan.toLowerCase(),
        matkhau : values.matkhau,
      }
      // const dataForm = {
      //   taikhoan: "hodan",
      //   matkhau: "123456",
      // };
      // console.log(dataForm);

      const action = loginUser(dataForm);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      // const getData2 = await AsyncStorage.getItem("user");
      // console.log(getData2);
      values.taikhoan = "";
      values.matkhau = "";
      navigation.navigate("TabNav");
    } catch (error) {
      handleOpen();
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
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
          <Text>
            Bạn đã nhập sai tài khoản hoặc mật khẩu, vui lòng xem lại thông tin
            !
          </Text>
        </MaterialDialog>

        <Formik
          initialValues={{ matkhau: "", taikhoan: "" }}
          onSubmit={handleSumitLogin}
          validationSchema={SignupSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.containerForm}>
              <View style={styles.containerImg}>
                <Image
                  style={styles.img}
                  source={require("../../../../../assets/logo.png")}
                />
              </View>
              <Text style={[styles.text]}>TÀI KHOẢN</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    borderColor: !touched
                      ? "#ccccccf2"
                      : errors.taikhoan
                      ? "#FF5A5F"
                      : "#ccccccf2",
                  },
                ]}
                onChangeText={handleChange("taikhoan")}
                onBlur={handleBlur("taikhoan")}
                value={values.taikhoan}
                error={errors.taikhoan}
                touched={touched.taikhoan}
              />
              {errors.taikhoan && touched.taikhoan ? (
                <>
                  <Text
                    style={{
                      color: !touched
                        ? "#ccccccf2"
                        : errors.taikhoan
                        ? "#FF5A5F"
                        : "#ccccccf2",
                      marginBottom: 10,
                    }}
                  >
                    {errors.taikhoan}
                  </Text>
                </>
              ) : null}
              <Text style={styles.text}>MẬT KHẨU</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    borderColor: !touched
                      ? "#ccccccf2"
                      : errors.matkhau
                      ? "#FF5A5F"
                      : "#ccccccf2",
                  },
                ]}
                onChangeText={handleChange("matkhau")}
                onBlur={handleBlur("matkhau")}
                value={values.matkhau}
                error={errors.matkhau}
                touched={touched.matkhau}
                secureTextEntry={true}
              />
              {errors.matkhau && touched.matkhau ? (
                <>
                  <Text
                    style={{
                      color: !touched
                        ? "#ccccccf2"
                        : errors.matkhau
                        ? "#FF5A5F"
                        : "#ccccccf2",
                      marginBottom: 10,
                    }}
                  >
                    {errors.matkhau}
                  </Text>
                </>
              ) : null}
              <Button onPress={handleSubmit} title="Đăng nhập" />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#b35900",
    alignItems: "center",
    paddingTop: 150,
    paddingBottom: 230,
  },
  containerForm: {
    backgroundColor: "white",
    padding: 40,
    borderRadius: 10,
  },
  text: {
    color: "black",
  },
  textInput: {
    height: 40,
    marginBottom: 12,
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    // borderColor: "#ccccccf2",
    width: 200,
    color: "black",
  },
  img: {
    width: 100,
  },
  containerImg: {
    paddingBottom: 20,
    marginLeft: 50,
  },
});

export default LoginForm;
