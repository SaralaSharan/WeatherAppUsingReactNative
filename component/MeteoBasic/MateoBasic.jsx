import { View } from "react-native";
import { s } from "./MeteoBasic.style";
import { Txt } from "../Txt/Txt";
import { Image } from "react-native";
import { Clock } from "../Clock/Clock";

export function MeteoBasic({ temperature, interpretation, city }) {
  console.log(city);
  return (
    <>
      <View style={s.clock}>
        <Clock />
      </View>
      <View style={s.city}>
        <Txt>{city}</Txt>
      </View>
      <View style={s.interpretation}>
        <Txt style={s.interpretation.txt}>{interpretation.label}</Txt>
      </View>
      <View style={s.temperature_box}>
        <Txt style={s.temperature}>{temperature}°</Txt>
        <Image style={s.img} source={interpretation.image} />
      </View>
    </>
  );
}
