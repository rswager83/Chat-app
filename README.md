# Chat-app


![Backgroundimage](public/BackgroundImage.png)

<br> 

## Description: 
This app will provide users with a chat interface along with the options to share their images and locations to others.

<br>

## Key Features:
* A page where users can enter their name and choose a background color for the chat screen
before joining the chat.
* A page displaying the conversation, as well as an input field and submit button.
* The chat must provide users with two additional communication features: sending images
and location data.
* Data gets stored online and offline.

<br>

## User Stories:

* As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends and family.
* As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.
* As a user, I want to send images to my friends to show them what I’m currently doing.
* As a user, I want to share my location with my friends to show them where I am.
* As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
* As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.
<br>

## Project Dependencies: 
* React-Native
* Expo
* Gifted Chat
* Google Firebase
* Android Studio - Emulator

<br>

## App Installation & Necessary Steps:

### [Expo CLI](https://expo.dev/tools) 
Expo provides tools that can help get you started and speeds up the app development. It has its own SDK(software development kit) which offers features that include access to the camera, retrieving geolocations and so on. And when using the Expo CLI, creating your React-Native App is as simple as:
```
npm install expo-cli --g
expo-init yourProjectName
cd yourProjectName
expo start
```
### [Android Studio](https://developer.android.com/studio)
Android Studio creates virtual devices to allow testing and preview of the app on a android operating system.

* Android Studio Emulator <br>
   * For information to run the Android Emulator, [please click here for full instuctions](https://developer.android.com/studio/run/emulator). 
 
### [Google Firebase](https://firebase.google.com/)

Firebase is being used as a cloud-based storage platform for the app.

1. Sign in to Google Firebase and select **Add Project**, then set up your project.
2. Then select **Firebase Database** from the options on the left under **Build**.
3. Select **Start in Test Mode**, choose your region, then create a collection.
4. To set authentication, go to **Project Settings** and click **Register** to recieve the configuration code.
5. This code is required for your app in order to use the firebase as your data storage.
   * This code can be viewed in my chatscreen.js file.  

<br>

## Contact:
Please feel free to contact me and offer any type of advice. As I begin my journey through web develeopment, I am always open to advice and helpful ways to accomplish whatever task given to me. Please feel free to reach out to me!
- Ryan Swager - nanswaglen83@gmail.com
- Project Link -https://github.com/rswager83/Chat-app/
