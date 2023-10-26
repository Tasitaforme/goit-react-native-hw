import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { View } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

import "react-native-gesture-handler";

import { persistor, store } from "./src/redux/store";
import Main from "./src/components/Main/Main";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    //700
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    //500
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    //400
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Pacifico-Regular": require("./assets/fonts/Pacifico-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // console.log("Шрифти завантажені");
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // console.log("Шрифти не завантажені");
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Main />
        </View>
      </PersistGate>
    </Provider>
  );
}
