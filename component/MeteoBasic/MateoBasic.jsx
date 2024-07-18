import { View } from "react-native";
import { s } from "./MeteoBasic.style";
import { Txt } from "../Txt/Txt";
import { Image } from "react-native";
import { Clock } from "../Clock/Clock";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function MeteoBasic({
  temperature,
  interpretation,
  city,
  dailyWeather,
}) {
  const nav = useNavigation();
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
        <TouchableOpacity
          onPress={() => nav.navigate("Forecasts", { city, ...dailyWeather })}
        >
          <Txt style={s.temperature}>{temperature}°</Txt>
        </TouchableOpacity>
        <Image style={s.img} source={interpretation.image} />
      </View>
    </>
  );
}
