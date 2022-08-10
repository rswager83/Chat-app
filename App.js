import "react-native-gesture-handler";
import React, { Component } from "react";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import StartScreen from "./components/Start";
import ChatScreen from "./components/Chat";

import { render } from "react-dom";

// create the navigator
const Stack = createStackNavigator();

export default class HelloWorld extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartScreen">
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
