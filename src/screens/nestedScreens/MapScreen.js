import { StyleSheet, View } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  const location = route.params.location;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location?.latitude || 37.78825,
          longitude: location?.longitude || -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // showsUserLocation={true}
        mapType="standard"
        minZoomLevel={15}
      >
        {location?.latitude && (
          <Marker
            title="Це було тут!!!"
            coordinates={location}
            description="Чудово!!!"
            key={"YOUR_KEY_VALUE"}
            color={"YOUR_COLOR_VALUE"}
          />
        )}
        <Marker />
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
