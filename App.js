import { useFonts } from "expo-font";
import { fonts } from "./src/global/fonts.js";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import store from "./src/store";
import TabNavigator from "./src/navigation/TabNavigator.jsx";

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <TabNavigator />
      </SafeAreaView>
    </Provider>
  );
}
