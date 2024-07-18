import { View } from "react-native";
import { Txt } from "../Txt/Txt";
import { s } from "./ForecastsListItem.style";
import { Image } from "react-native";

export function ForecastsListItem({ image, day, date, temperature }) {
  return (
    <View style={s.container}>
      <Image style={s.image} source={image} />
      <Txt style={s.day}>{day}</Txt>
      <Txt style={s.date}>{date}</Txt>
      <Txt style={s.temperature}>{temperature}°</Txt>
    </View>
  );
}
