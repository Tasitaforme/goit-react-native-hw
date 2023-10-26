import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";

export default function MapScreen({ route }) {
  const location = route.params.location;
  const cityName = route.params.cityName;

  const [cityNameLocation, setCityNameLocation] = useState("");

  // useEffect(() => {
  //   async function fetchLocationFromName(city) {
  //     const URL =
  //       "https://api.openweathermap.org/data/2.5/weather?appid=9eca7aac0b071aa16e3cb063adba0785tasita&units=metric";
  //     try {
  //       const { data } = await axios.get(`${URL}&q=${city}`);
  //       setCityNameLocation(data.coord);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchLocationFromName(cityName);
  // }, [cityName]);

  const latitude = cityNameLocation?.lat ?? location?.latitude ?? 50.4501;
  const longitude = cityNameLocation?.lon ?? location?.longitude ?? 30.5241;

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        showsUserLocation={true}
        mapType="standard"
        minZoomLevel={10}
      >
        <Marker
          title="Це було тут!!!"
          coordinate={{ latitude: latitude, longitude: longitude }}
          description="Чудово!!!"
          key={"YOUR_KEY_VALUE"}
          color={"YOUR_COLOR_VALUE"}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
