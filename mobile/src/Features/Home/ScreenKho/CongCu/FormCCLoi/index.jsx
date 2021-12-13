import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { Formik, ErrorMessage, Field } from "formik";
import Ionicons from "react-native-vector-icons/Ionicons";
import hodanApi from "../../../../../api/hodanApi";
import * as Yup from "yup";
import { MaterialDialog } from "react-native-material-dialog";

function FormCCLoi(props) {
  const {
    route: { params: data },
    route: {
      params: { idHodan },
    },
    navigation,
  } = props;
  // console.log(props, idHodan);
  const [visible, setVisible] = useState(false);

  const SignupSchema = Yup.object().shape({
    soluongloi: Yup.string().required("Trường này không được để trống"),
  });
  const handleClose = () => {
    setVisible(false);
  };
  const handleOpen = () => {
    setVisible(true);
  };
  const handleSumitForm = async (dataForm) => {
    const sendRequest = await hodanApi.themCongcuHuloi(idHodan, {
      dsccLoi: [{ ...data, ...dataForm }],
    });
    handleOpen();

    // console.log({ dsccLoi: [{ ...data, ...dataForm }] }, sendRequest);
  };
  return (
    <Formik
      initialValues={{ soluongloi: "" }}
      onSubmit={handleSumitForm}
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
        <View style={{ marginTop: 20, flex: 1, backgroundColor: "white" }}>
          <View style={styles.headerContainer}>
            <Text style={{ color: "white" }}>Thông tin công cụ lỗi</Text>
          </View>
          <View style={styles.containerForm}>
            <ScrollView>
              <Text style={[styles.text]}>Tên công cụ</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    borderColor: !touched
                      ? "#ccccccf2"
                      : errors.tencc
                      ? "#FF5A5F"
                      : "#ccccccf2",
                  },
                ]}
                editable={false}
                onChangeText={handleChange("tencc")}
                onBlur={handleBlur("tencc")}
                //   value={values.soluong}
                defaultValue={data.congcu.ten}
                //   error={errors.soluong}
                //   touched={touched.soluong}
              />

              <Text style={[styles.text]}>Mô tả</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    borderColor: !touched
                      ? "#ccccccf2"
                      : errors.mota
                      ? "#FF5A5F"
                      : "#ccccccf2",
                  },
                ]}
                editable={false}
                onChangeText={handleChange("mota")}
                onBlur={handleBlur("mota")}
                defaultValue={data.congcu.mota}
                //   error={errors.mota}
                //   touched={touched.mota}
              />

              <Text style={styles.text}>Công dụng</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    borderColor: !touched
                      ? "#ccccccf2"
                      : errors.congdung
                      ? "#FF5A5F"
                      : "#ccccccf2",
                  },
                ]}
                onChangeText={handleChange("congdung")}
                editable={false}
                onBlur={handleBlur("congdung")}
                defaultValue={data.congcu.congdung}
                //   error={errors.congdung}
                //   touched={touched.congdung}
              />
              <Text style={styles.text}>Số lượng hư hỏng</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    borderColor: !touched
                      ? "#ccccccf2"
                      : errors.soluongloi
                      ? "#FF5A5F"
                      : "#ccccccf2",
                  },
                ]}
                keyboardType="numeric"
                onChangeText={handleChange("soluongloi")}
                onBlur={handleBlur("soluongloi")}
                value={values.soluongloi}
                error={errors.soluongloi}
                touched={touched.soluongloi}
              />
              {errors.soluongloi && touched.soluongloi ? (
                <>
                  <Text
                    style={{
                      color: !touched
                        ? "#ccccccf2"
                        : errors.soluongloi
                        ? "#FF5A5F"
                        : "#ccccccf2",
                      marginBottom: 10,
                    }}
                  >
                    {errors.soluongloi}
                  </Text>
                </>
              ) : null}
              <MaterialDialog
                title="Thông báo"
                visible={visible}
                onOk={() => {
                  navigation.goBack();

                  setVisible(false);
                }}
                onCancel={() => {
                  navigation.goBack();
                  setVisible(false);
                }}
              >
                <Text style={{ color: "green" }}>Xác nhận thành công!</Text>
              </MaterialDialog>

              <Text style={styles.text}>Hình ảnh</Text>

              <View>
                <Image
                  source={{
                    uri: `http://10.3.53.160:5000/uploads/${data.congcu.hinhanh}`,
                  }}
                  style={{
                    width: Dimensions.get("window").width - 220,
                    height: 150,
                    borderRadius: 20,
                  }}
                />
              </View>
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: "row",
              //   marginTop: 35,
              paddingTop: 10,
              borderTopColor: "#b3b3b3",
              borderWidth: 1,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              borderBottomWidth: 0,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                borderColor: "#0000e6",
                borderWidth: 1,
                borderRadius: 90,
                paddingTop: 8,
                width: 50,
                textAlign: "center",
                marginLeft: 20,
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="arrow-back" size={30} color="#0000b3" />
            </Text>
            <Text
              onPress={handleSubmit}
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
            >
              Xác nhận
            </Text>
          </View>
        </View>
      )}
    </Formik>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  headerContainer: {
    backgroundColor: "#e65c00",
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
  },
  containerForm: {
    // backgroundColor: "white",
    paddingBottom: 40,
    paddingLeft: 40,
    paddingTop: 10,
    paddingRight: 30,
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
    width: 300,
    color: "black",
  },
});
export default FormCCLoi;
