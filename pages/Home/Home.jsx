import { s } from "./Home.style";
import { MeteoBasic } from "../../component/MeteoBasic/MateoBasic";
import { Text, View } from "react-native";
import { getWeatherInterpretation } from "../../utils/meteo-utils";

export function Home({ weather, city }) {
  const currentWeather = weather.current_weather;
  const currentInterpretation = getWeatherInterpretation(
    currentWeather.weathercode
  );
  return (
    <>
      <View style={s.meteo_basic}>
        <MeteoBasic
          city={city}
          interpretation={currentInterpretation}
          temperature={Math.round(currentWeather.temperature)}
        />
      </View>
      <View style={s.meteo_searchbar}>
        <Text style={s.txt}>Search Bar</Text>
      </View>
      <View style={s.meteo_advanced}>
        <Text style={s.txt}>Advanced Weather Info</Text>
      </View>
    </>
  );
}
