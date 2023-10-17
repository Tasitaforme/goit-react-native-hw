import { StyleSheet, View } from "react-native";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function MapScreen({ route }) {
  const location = route.params.location;

  const latitude = location?.latitude ?? 37.78825;
  const longitude = location?.longitude ?? -122.4324;

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
        minZoomLevel={15}
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
