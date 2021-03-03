import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import HomeScreen from "./react/screens/HomeScreen";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  { initialRouteName: "Home" }
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return <AppContainer />;
}
