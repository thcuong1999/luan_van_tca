import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View ,LogBox } from "react-native";
import { Provider } from "react-redux";
import store from "./src/app/store";
import Login from "./src/Features/auth/components/Login";
import Home from "./src/Features/Home";

export default function App() {
  LogBox.ignoreLogs(['Remote debugger']);
  return (
    <Provider store={store}>
      <Login />
      {/* <Home /> */}
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
