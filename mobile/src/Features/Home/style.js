import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "#e65c00",
    paddingTop: 10,
    paddingBottom: 10,
    // flex: 1,
    alignItems: "center",
  },
  containerLinkBar: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  singleBar: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 35,
    paddingLeft: 35,
  },
  activeBar: {
    backgroundColor: "#ff9933",
  },
  noActiveBar: {
    backgroundColor: "#e65c00",
  },
  tiendoBar: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightColor: "white",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  donhangBar: {
    borderRightColor: "white",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textAlign: {
    textAlign: "center",
  },

  textLinkBar: {
    color: "white",
    textAlign: "center",
  },
  containerRedirectScreen: {
    backgroundColor: "#e6e6e6",
    marginTop: 10,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    marginLeft: 14,
    marginRight: 14,
    borderRadius: 10,
  },
  containerRowRedirect: {
    marginBottom: 20,
    flexDirection: "row",
  },
  containerRowRedirect2: {
    flexDirection: "row",
    marginBottom: 20,
  },
  containerRowRedirect3: {
    flexDirection: "row",
  },
  containerRedirect: {
    borderRadius: 90,
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 15,
    backgroundColor: "white",
    marginRight: 15,
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
export default styles;
