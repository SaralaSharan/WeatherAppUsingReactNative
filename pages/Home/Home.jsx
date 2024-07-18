import { s } from "./Home.style";
import { MeteoBasic } from "../../component/MeteoBasic/MateoBasic";
import { Text, View } from "react-native";
import { getWeatherInterpretation } from "../../utils/meteo-utils";
import { MeteoAdvanced } from "../../component/MeteoAdvanced/MeteoAdvanced";
import { SearchBar } from "../../component/SearchBar/SearchBar";

export function Home({ weather, city, onSubmitSearch }) {
  const currentWeather = weather.current_weather;
  const currentInterpretation = getWeatherInterpretation(
    currentWeather.weathercode
  );
  return (
    <>
      <View style={s.meteo_basic}>
        <MeteoBasic
          dailyWeather={weather.daily}
          city={city}
          interpretation={currentInterpretation}
          temperature={Math.round(currentWeather.temperature)}
        />
      </View>
      <View style={s.meteo_searchbar}>
        <SearchBar onSubmit={onSubmitSearch} />
      </View>
      <View style={s.meteo_advanced}>
        <MeteoAdvanced
          sunrise={weather.daily.sunrise[0].split("T")[1]}
          sunset={weather.daily.sunset[0].split("T")[1]}
          windspeed={currentWeather.windspeed}
        />
      </View>
    </>
  );
}
