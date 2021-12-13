import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import hodanApi from "../../api/hodanApi";
import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenDonHang from "./ScreenDonHang";
import ScreenTienDo from "./ScreenTienDo";

function Home(props) {
  const { navigation } = props;
  const [checkTienDo, setCheckTienDo] = useState(true);
  const [checkDonHang, setCheckDonHang] = useState(false);
  const [checkKho, setCheckKho] = useState(false);
  const [listHoDan, setListHoDan] = useState();
  const [hoDan, setHoDan] = useState();
  const [idAccount, setIdAccount] = useState();
 
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
    })();
  }, []);
  // console.log(hoDan)
  const handleChangeActiveBar1 = () => {
    setCheckTienDo(true);
    setCheckDonHang(false);
    setCheckKho(false);
  };
  const handleChangeActiveBar2 = () => {
    setCheckTienDo(false);
    setCheckDonHang(true);
    setCheckKho(false);
  };
  const handleChangeActiveBar3 = () => {
    setCheckTienDo(false);
    setCheckDonHang(false);
    setCheckKho(true);
  };
  const handleRedirectBCTienDo = () => {
    navigation.navigate("FormBCTienDo", { idHodan: `${hoDan._id}` });
  };
  const handleRedirectCongCu = () => {
    navigation.navigate("ScreenCongCu", { idHodan: `${hoDan._id}` });
  };
  const handleRedirectVatTu = () => {
    navigation.navigate("ScreenVatTu", { idHodan: `${hoDan._id}` });
  };
  const handleRedirectNguyenLieu = () => {
    navigation.navigate("ScreenNguyenLieu", { idHodan: `${hoDan._id}` });
  };
  const handleRedirectKhoLoi = () => {
    navigation.navigate("ScreenKhoLoi", { idHodan: `${hoDan._id}` });
  };
  const handleRedirectSanPham = ()=>{
    navigation.navigate("ScreenSanPham", { idHodan: `${hoDan._id}` });

  }

  return (
    <View style={styles.container}>
      {hoDan && (
        <>
          <View style={styles.headerContainer}>
            <Text style={{ color: "white" }}>Xin chào {hoDan.daidien} </Text>
          </View>
          <Text>Ứng dụng di động dành cho hộ dân</Text>

          {/****************************** {Start link bar} **************************************/}
          <View style={styles.containerLinkBar}>
            <Text
              style={[
                styles.singleBar,
                styles.tiendoBar,
                checkTienDo ? styles.activeBar : styles.noActiveBar,
              ]}
              onPress={handleChangeActiveBar1}
            >
              <View>
                <Ionicons
                  style={styles.textAlign}
                  name="calendar-outline"
                  size={40}
                  color="white"
                />
                <Text style={styles.textLinkBar}>Tiến độ</Text>
              </View>
            </Text>
            <Text
              style={[
                styles.singleBar,
                styles.donhangBar,
                checkDonHang ? styles.activeBar : styles.noActiveBar,
              ]}
              onPress={handleChangeActiveBar2}
            >
              <View>
                <Ionicons
                  style={styles.textAlign}
                  name="cart-outline"
                  size={40}
                  color="white"
                />
                <Text style={styles.textLinkBar}>Đơn hàng</Text>
              </View>
            </Text>
            <Text
              style={[
                styles.singleBar,
                { borderTopRightRadius: 10, borderBottomRightRadius: 10 },
                checkKho ? styles.activeBar : styles.noActiveBar,
              ]}
              onPress={handleChangeActiveBar3}
            >
              <View>
                <Ionicons
                  style={styles.textAlign}
                  name="folder-open-outline"
                  size={40}
                  color="white"
                />
                <Text style={styles.textLinkBar}>Kho</Text>
              </View>
            </Text>
          </View>

          {/****************************** {End link bar} **************************************/}
          {/****************************** {Start redirect screen} ******************************/}
          <ScrollView>
            <View style={styles.containerRedirectScreen}>
              {checkTienDo ? (
                <>
                  <View style={styles.containerRowRedirect}>
                    <ScreenTienDo navigation={navigation} hodanId={hoDan._id} />
                  </View>
                </>
              ) : checkKho ? (
                <>
                  <View style={styles.containerRowRedirect}>
                    <View style={{ marginRight: 20 }}>
                      <Text onPress={handleRedirectCongCu}>
                        <View style={styles.containerRedirectKho}>
                          <Ionicons
                            name="construct"
                            size={60}
                            color="#0000b3"
                          />
                        </View>
                      </Text>
                      <Text style={[{ marginTop: 10, textAlign: "center" }]}>
                        Công cụ
                      </Text>
                    </View>
                    <View style={{ marginRight: 20 }}>
                      <Text onPress={handleRedirectVatTu}>
                        <View style={styles.containerRedirectKho}>
                          <Ionicons name="basket" size={60} color="#0000b3" />
                        </View>
                      </Text>
                      <Text style={[{ marginTop: 10, textAlign: "center" }]}>
                        Vật tư
                      </Text>
                    </View>
                    <View>
                      <Text onPress={handleRedirectNguyenLieu}>
                        <View style={styles.containerRedirectKho}>
                          <Ionicons name="nuclear" size={60} color="#0000b3" />
                        </View>
                      </Text>
                      <Text style={[{ marginTop: 10, textAlign: "center" }]}>
                        Nguyên liệu
                      </Text>
                    </View>
                  </View>
                  <View style={styles.containerRowRedirect}>
                    <View style={{ marginRight: 20 }}>
                      <Text onPress={handleRedirectSanPham}>
                        <View style={styles.containerRedirectKho}>
                          <Ionicons
                            name="leaf"
                            size={60}
                            color="#0000b3"
                          />
                        </View>
                      </Text>
                      <Text style={[{ marginTop: 10, textAlign: "center" }]}>
                        Sản phẩm
                      </Text>
                    </View>
                    <View style={{ marginRight: 30 }}>
                      <Text onPress={handleRedirectKhoLoi}>
                        <View style={styles.containerRedirectKho}>
                          <Ionicons name="close-circle" size={60} color="#0000b3" />
                        </View>
                      </Text>
                      <Text style={[{ marginTop: 10, textAlign: "center" }]}>
                        Hư hỏng
                      </Text>
                    </View>
                   
                  </View>
                </>
              ) : (
                <>
                  <ScreenDonHang navigation={navigation} hodanId={hoDan._id} />
                </>
              )}
            </View>
          </ScrollView>

          {/****************************** {End redirect screen} ******************************/}
        </>
      )}
    </View>
  );
}

export default Home;
