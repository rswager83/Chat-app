import React from "react";

import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import CustomActions from "./actions/CustomActions";
import MapView from "react-native-maps";
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
      isConnected: false,
      image: null,
      location: null,
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
        text: data.text || "",
        uid: data.uid,
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar || "",
        },
        location: data.location || null,
        image: data.image || null,
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

    this.getMessages();

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
          // {
          //   _id: 1,
          //   text: "Hello developer",
          //   createdAt: new Date(),
          //   user: {
          //     _id: 2,
          //     name: "React Native",
          //     avatar: "https://placeimg.com/140/140/any",
          //   },
          // },
          // {
          //   _id: 1,
          //   createdAt: new Date(),
          //   user: {
          //     _id: 2,
          //     name: "React Native",
          //     avatar: "https://placeimg.com/140/140/any",
          //   },
          //   location: {
          //     latitude: 48.864601,
          //     longitude: 2.398704,
          //   },
          // },
        ],
        // user: {
        //   _id: user.uid,
        //   name: name,
        // },
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });

    // reference to active messages collection
    this.referenceMessagesUser = firebase
      .firestore()
      .collection("messages")
      .where("uid", "==", this.state.uid);

    // Checks if user online or not
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log("online");
      } else {
        this.setState({ isConnected: false });
        console.log("offline");
      }
    });
  }

  componentWillUnmount() {
    // unsubscribe() used to stop receiving updates from collection
    this.unsubscribe();
    this.authUnsubscribe();
  }

  // retrieve chat messages from asyncStorage
  async getMessages() {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // stores chat messages in asyncStorage
  async saveMessages() {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  // deletes chat messages in asyncStorage
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Add messages to state
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage();
        this.saveMessages();
      }
    );
  }

  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      createdAt: message.createdAt,
      text: message.text || "",
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  }

  // Change properties of the bubble
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "blue",
          },
        }}
      />
    );
  }

  // Hides chat input to prevent usage when offline
  renderInputToolbar(props) {
    if (this.state.isConnected === false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  renderCustomActions(props) {
    return <CustomActions {...props} />;
  }

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  render() {
    // Sets selected background color from start page
    let { bgColor, name } = this.props.route.params;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: bgColor,
          paddingTop: Platform.OS === "android" ? 20 : 0,
        }}
      >
        <GiftedChat
          // renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderActions={this.renderCustomActions.bind(this)}
          renderCustomView={this.renderCustomView.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            name: this.state.user.name,
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
