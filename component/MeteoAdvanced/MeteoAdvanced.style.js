import { StyleSheet, View } from "react-native";
import { Txt } from "../Txt/Txt";

export const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#000005c",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 15,
  },
});

export function StyledContainer({ children }) {
  return <View style={{ alignItems: "center" }}>{children}</View>;
}

export function StyledLabel({ children }) {
  return <Txt style={{ fontSize: 15 }}>{children}</Txt>;
}

export function StyledValue({ children }) {
  return <Txt style={{ fontSize: 20 }}>{children}</Txt>;
}
