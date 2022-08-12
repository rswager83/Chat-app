import React from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { View, KeyboardAvoidingView, Platform } from "react-native";

// Firebase Database
const firebase = require("firebase");
require("firebase/firestore");

export default class ChatScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
    };

    // Initialize firestore
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBUxggHrxeGoxtUas4OkFBlbzWbX8bPIVw",
        authDomain: "chat-app-b7de7.firebaseapp.com",
        projectId: "chat-app-b7de7",
        storageBucket: "chat-app-b7de7.appspot.com",
        messagingSenderId: "501103748985",
        appId: "1:501103748985:web:ce75c19b5b3eda879e31a8",
        measurementId: "G-7R7ETGX90K",
      });
    }
    // reference to messages collection
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.referenceMessagesUser = null;
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each doc
    querySnapshot.forEach((doc) => {
      // get the queryDocumentSnapshots data
      var data = doc.data();
      messages.push({
        _id: data._id,
        createdAt: data.createdAt.toDate(),
        text: data.text,
        uid: data.uid,
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      });
    });
    this.setState({
      messages,
    });
  };

  componentDidMount() {
    // Required for listing name in default message
    // Used to display title/name at very top of page
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    // reference to messages collection
    this.referenceChatMessages = firebase.firestore().collection("messages");

    // authentication for user
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [
          {
            _id: user.uid,
            text: `What's goin on ${name}`,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "react",
              avatar: "https://placeimg.com/140/140/any",
            },
          },
        ],
        user: {
          _id: user.uid,
          name: name,
          avatar: "https://placeimg.com/140/140/any",
        },
      });

      // reference to active messages collection
      this.referenceMessagesUser = firebase
        .firestore()
        .collection("messages")
        .where("uid", "==", this.state.uid);

      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  // Add messages to state
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
      }
    );
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

  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text,
      user: message.user,
    });
  }
  componentWillUnmount() {
    // unsubscribe() used to stop receiving updates from collection
    this.unsubscribe();
    this.authUnsubscribe();
  }

  render() {
    // Sets selected background color from start page
    let { bgColor, name } = this.props.route.params;

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
            _id: this.state.user._id,
            name: name,
            avatar: this.state.user.avatar,
          }}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}
