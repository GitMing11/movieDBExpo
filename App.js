import { SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./theme";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { NavigationContainer } from "@react-navigation/native";
import RootNav from "./src/navigations/RootNav";

export default function App() {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <StatusBar
            barStyle={isDarkMode ? "light-content" : "dark-content"}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <NavigationContainer>
            <RootNav />
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
