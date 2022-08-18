import React from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";

import BackgroundImage from "../public/BackgroundImage.png";
import UserIcon from "../public/UserIcon.png";

export default class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", bgColor: "#5f9ae0" };
  }

  // Update background color for chatscreen
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  colors = {
    black: "#090C08",
    purple: "#474056",
    gray: "#8A95A5",
    green: "#B9C6AE",
  };

  render() {
    return (
      <View style={styles.pageContainer}>
        <ImageBackground
          source={BackgroundImage}
          style={styles.imageBackground}
        >
          <View style={styles.titleBox}>
            <Text style={styles.textTitle}>Chat App</Text>
          </View>

          <View style={styles.dataContainer}>
            <View style={styles.dataInput}>
              <Image style={styles.userIcon} source={UserIcon} />
              <TextInput
                style={styles.input}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder="Your Name"
              />
            </View>
            <View style={styles.bgColorText}>
              <Text>Choose Background Color:</Text>
            </View>

            {/* Bg color options - User selects the color for chatscreen */}
            <View style={styles.colorArray}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel={"Select color for chatscreen background."}
                accessibilityHint={"You can pick your own background color."}
                accessibilityRole={"button"}
                style={styles.colorButtonBlack}
                onPress={() => this.changeBgColor(this.colors.black)}
              />
              <TouchableOpacity
                accessible={true}
                accessibilityLabel={"Select color for chatscreen background."}
                accessibilityHint={"You can pick your own background color."}
                accessibilityRole={"button"}
                style={styles.colorButtonPurple}
                onPress={() => this.changeBgColor(this.colors.purple)}
              />
              <TouchableOpacity
                accessible={true}
                accessibilityLabel={"Select color for chatscreen background."}
                accessibilityHint={"You can pick your own background color."}
                accessibilityRole={"button"}
                style={styles.colorButtonGray}
                onPress={() => this.changeBgColor(this.colors.gray)}
              />
              <TouchableOpacity
                accessible={true}
                accessibilityLabel={"Select color for chatscreen background."}
                accessibilityHint={"You can pick your own background color."}
                accessibilityRole={"button"}
                style={styles.colorButtonGreen}
                onPress={() => this.changeBgColor(this.colors.green)}
              />
            </View>

            {/*  */}
            <View style={styles.button}>
              <Button
                title="Start Chatting"
                color="#FFFFFF"
                backgroundColor="rgba(117, 112, 131, .8)"
                onPress={() =>
                  this.props.navigation.navigate("ChatScreen", {
                    name: this.state.name,
                    bgColor: this.state.bgColor,
                  })
                }
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 20 : 0,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleBox: {
    flex: 50,
    alignItems: "center",
    paddingTop: 80,
  },
  textTitle: {
    color: "#FFFFFF",
    fontSize: 45,
    fontWeight: "600",
  },

  // -------------- //
  dataContainer: {
    flex: 50,
    flexDirection: "column",
    display: "relative",
    justifyContent: "space-evenly",
    width: "88%",
    padding: "6%",
    marginBottom: "6%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 5,
  },
  dataInput: {
    flex: 30,
    margin: 1,
    display: "fixed",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    justifyContent: "center",
  },
  userIcon: {
    position: "absolute",
    left: 20,
  },
  input: {
    height: 60,
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    fontWeight: "300",
    fontSize: 16,
    color: "#757083",
    textAlign: "center",
  },
  bgColorText: {
    flex: 10,
    display: "fixed",
    alignItems: "center",
  },
  colorArray: {
    flexDirection: "row",
    flex: 30,
    justifyContent: "space-between",
  },
  colorButtonBlack: {
    backgroundColor: "#090C08",
    borderRadius: 25,
    width: 50,
    height: 50,
  },

  colorButtonPurple: {
    backgroundColor: "#474056",
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  colorButtonGray: {
    backgroundColor: "#8A95A5",
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  colorButtonGreen: {
    backgroundColor: "#B9C6AE",
    borderRadius: 25,
    width: 50,
    height: 50,
  },

  button: {
    flex: 30,
    display: "fixed",
    alignItems: "center",
    justifyContent: "center",
    horizontalPadding: "6%",
    fontSize: 16,
    fontWeight: 300,
    backgroundColor: "rgba(117, 112, 131, .8)",
    borderRadius: 5,
    color: "white",
  },
});
