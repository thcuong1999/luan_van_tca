import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import CaNhan from "../CaNhan";
import Home from "../Home";
import ThongBao from "../ThongBao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import hodanApi from "../../api/hodanApi";

const Tab = createBottomTabNavigator();
function TabNav(props) {
  const [soluongdonhangchuaxacnhan, setSoluongdonhangchuaxacnhan] = useState();
  //call back number order don't confirm
  const [callback, setCallBack] = useState(false);
  const handleCallBackSL = (data)=>{
    if(data)
    {
      // console.log(data);
      setCallBack(!callback);
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
      })._id;
      const dsdonhang = await hodanApi.dsDonhang(findHoDan);
      setSoluongdonhangchuaxacnhan(
        dsdonhang.dsdonhang.filter((item) => item.xacnhan === false).length
      );
    // console.log(dsdonhang.dsdonhang);

    })();
  }, [callback]);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Trang chủ") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Đơn hàng mới") {
            iconName = focused ? "notifications" : "notifications";
          } else if (route.name === "Cá nhân") {
            iconName = focused ? "person" : "person";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Trang chủ"
        component={Home}
        options={{ header: () => null }}
      />
      <Tab.Screen
        name="Đơn hàng mới"
        // component={ThongBao}
        children={()=><ThongBao handleCallBackSL={handleCallBackSL}  />}
        options={{
          header: () => null,
          tabBarBadge: soluongdonhangchuaxacnhan && soluongdonhangchuaxacnhan,
        }}
      />
      <Tab.Screen
        name="Cá nhân"
        component={CaNhan}
        options={{ header: () => null }}
      />
    </Tab.Navigator>
  );
}

export default TabNav;
