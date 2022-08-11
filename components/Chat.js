import React from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default class ChatScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    // Required for listing name in default message
    // Used to display title/name at very top of page
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        // Displays default message and date in chat
        {
          _id: 2,
          text: `${name} has entered the chat.`,
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  // Add messages to state
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  // Change properties of the bubble
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{ right: { backgroundColor: "#000" } }}
      />
    );
  }

  render() {
    // Sets selected background color from start page
    const { bgColor } = this.props.route.params;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: bgColor,
        }}
      >
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
