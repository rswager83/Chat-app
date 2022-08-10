import React from "react";
import { View, Text, Button } from "react-native";

export default class ChatScreen extends React.Component {
  render() {
    // Username is displayed
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    // Sets selected background color from start page
    const { bgColor } = this.props.route.params;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: bgColor,
        }}
      >
        <Text>Chat Screen</Text>
        <Button
          title="Go to start"
          onPress={() => this.props.navigation.navigate("StartScreen")}
        />
      </View>
    );
  }
}
