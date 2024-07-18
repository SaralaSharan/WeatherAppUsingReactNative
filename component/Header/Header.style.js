import { StyleSheet } from "react-native";

const BACK_BTN_WIDTH = 30;
export const s = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection: "row",
  },
  subtitle: {
    fontSize: 20,
  },
  header_txts: {
    flex: 1,
    marginRight: BACK_BTN_WIDTH,
    alignItems: "center",
  },
  back_button: {
    width: BACK_BTN_WIDTH,
  },
});
