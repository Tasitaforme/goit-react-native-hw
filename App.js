import { StatusBar } from "expo-status-bar";
import {} from "react-native";
import RegistrationScreen from "./src/screens/RegistrationScreen";

export default function App() {
  return (
    <>
      <StatusBar style="auto" barStyle={"dark-content"} />
      <RegistrationScreen />
    </>
  );
}
