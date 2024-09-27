import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import LoginScreen from "../pages/LoginScreen";
import ProfileScreen from "../pages/ProfileScreen";
import SearchScreen from "../pages/SearchScreen";
import TabNav from "./TabNav";
import AnimateScreen from "../pages/AnimateScreen";
import DetailScreen from "../pages/DetailScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNav() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: true, // Hide headers if you want custom headers or no headers at all
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: true,
          headerTitle: "Login Screen",
        }}
      />
      <Stack.Screen
        name="TabNavigator"
        component={TabNav}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="Animate" component={AnimateScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}
