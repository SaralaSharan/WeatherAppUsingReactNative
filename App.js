import { s } from "./App.style";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Home } from "./pages/Home/Home";
import { Forecasts } from "./pages/Forecasts/Forecasts";
import { ImageBackground } from "react-native";
import backgroundImg from "./assets/background.png";
import { useFonts } from "expo-font";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { useEffect, useState } from "react";
import { MeteoAPI } from "./api/meteo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Alert } from "react-native";

const Stack = createNativeStackNavigator();

const navTheme = {
  colors: {
    background: "transparent",
  },
};

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

  async function fetchCoordsByCity(city) {
    try {
      conole.log("App.js");
      const coordsResponse = await MeteoAPI.fetchCoordsByCity(city);
      setcoordinates(coordsResponse);
    } catch (err) {
      Alert.alert("Ouch!", err);
    }
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
    <NavigationContainer theme={navTheme}>
      <ImageBackground
        imageStyle={s.img}
        style={s.background}
        source={backgroundImg}
      >
        <SafeAreaProvider>
          <SafeAreaView style={s.container}>
            {isFontLoaded && weather && (
              <Stack.Navigator
                screenOptions={{ headerShown: false, animation: "fade" }}
                initialRouteName="Home"
              >
                <Stack.Screen name="Home">
                  {() => (
                    <Home
                      city={city}
                      weather={weather}
                      onSubmitSearch={fetchCoordsByCity}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen name="Forecasts" component={Forecasts} />
              </Stack.Navigator>
            )}
          </SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    </NavigationContainer>
  );
}
