# Chess Clock App

A simple and easy-to-use chess clock app built with Ionic and Capacitor. This app allows you to keep track of time during your chess games.

## Features

- Customizable time controls
- Simple and intuitive user interface
- Pause and resume functionality
- Sound alerts for time expiration
- Supports both Android (.apk) and iOS (.ipa) platforms

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Ionic CLI](https://ionicframework.com/docs/cli)
- [Capacitor CLI](https://capacitorjs.com/docs/getting-started)
- [Xcode](https://developer.apple.com/xcode/)
- [Android Studio](https://developer.android.com/studio)

### Clone the Repository

```bash
git clone https://github.com/palakz-simform/Ionic-Chess-Clock
cd Ionic-Chess-Clock
```
### Install Dependencies

```bash
npm install
```

### Running the App in the Browser

```bash
ionic serve
```

### Building the App
#### Android
```bash
ionic build
ionic cap add android
ionic cap sync
ionic cap open android
```
This will open Android Studio. From there, you can build and run your app, which will generate the .apk file.

#### IOS
```bash
ionic build
ionic cap add ios
ionic cap sync
ionic cap open ios
```
This will open Xcode. From there, you can build and run your app, which will generate the .ipa file. You will need a macOS machine with Xcode installed to build and test the iOS app.

## Usage

- Install the app on your Android or iOS device.
- Open the app and set the desired time control for each player.
- Press the start button to begin the game.
- Tap the screen to switch turns between players.
- The app will alert you when the time for any player runs out.

## Live Link
https://ionic-chess-clock.netlify.app/chessClock
