import { Text } from "react-native";
import { Txt } from "../../component/Txt/Txt";
import { s } from "./Forecasts.style";
import { useRoute } from "@react-navigation/native";
import { Header } from "../../component/Header/Header";
import { ForecastsListItem } from "../../component/ForecastsListItem/ForecastsListItem";
import { View } from "react-native";
import { DAYS, getWeatherInterpretation } from "../../utils/meteo-utils";

export function Forecasts({}) {
  console.log("forecasts");
  const { params } = useRoute();

  const forecastListItems = params.time.map((time, index) => {
    const weatherCode = params.weathercode[index];
    const image = getWeatherInterpretation(weatherCode).image;
    const temperature = params.temperature_2m_max[index];
    const date = new Date(time);
    const dayOfTheWeek = DAYS[date.getDay()];
    const formattedDate = date.toLocaleDateString("default", {
      day: "numeric",
      month: "numeric",
    });

    return (
      <ForecastsListItem
        key={time}
        image={image}
        day={dayOfTheWeek}
        date={formattedDate}
        temperature={temperature.toFixed(0)}
      />
    );
  });

  return (
    <>
      <Header city={params.city} />
      <View style={{ marginTop: 50 }}>{forecastListItems}</View>
    </>
  );
}
