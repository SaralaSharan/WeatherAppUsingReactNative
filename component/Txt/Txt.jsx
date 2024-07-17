import { Text } from "react-native";
import { s } from "./Txt.style";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
const IPHONE_15_RATIO = 0.0010799136069114472;
export function Txt({ children, style, ...restProps }) {
  const fontSize = style?.fontSize || s.txt.fontSize;
  const { height } = useWindowDimensions();
  return (
    <Text
      style={[
        s.txt,
        style,
        {
          fontSize: Math.round(fontSize * IPHONE_15_RATIO * height),
        },
      ]}
      {...restProps}
    >
      {children}
    </Text>
  );
}
