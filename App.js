import { s } from "./App.style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Home } from "./pages/Home/Home";
import { ImageBackground } from "react-native";
import backgroundImg from "./assets/background.png";
import { useFonts } from "expo-font";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { useEffect, useState } from "react";
import { MeteoAPI } from "./api/meteo";

export default function App() {
  const [coordinates, setcoordinates] = useState();
  const [weather, setWeather] = useState();
  const [city, setCity] = useState();

  const [isFontLoaded] = useFonts({
    "Alata-Regular": require("./assets/fonts/Alata-Regular.ttf"),
  });

  useEffect(() => {
    getUserCoodinates();
  }, []);

  useEffect(() => {
    if (coordinates) {
      fetchWeatherByCoords(coordinates);
      fetchCityByCoords(coordinates);
    }
  }, [coordinates]);

  async function fetchWeatherByCoords() {
    const weatherResponse = await MeteoAPI.fetchWeatherByCoords(coordinates);
    setWeather(weatherResponse);
  }

  async function fetchCityByCoords(coords) {
    const cityResponse = await MeteoAPI.fetchCityByCoords(coordinates);
    setCity(cityResponse);
  }

  async function getUserCoodinates() {
    try {
      const { status } = await requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await getCurrentPositionAsync();
        setcoordinates({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      } else {
        setcoordinates({
          lat: "42.349599",
          lng: "-71.132152",
        });
      }
    } catch (err) {
      console.error("Failed to fetch coordinates", err);
    }
  }

  return (
    <ImageBackground
      imageStyle={s.img}
      style={s.background}
      source={backgroundImg}
    >
      <SafeAreaProvider>
        <SafeAreaView style={s.container}>
          {isFontLoaded && weather && <Home weather={weather} city={city} />}
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}
