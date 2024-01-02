/**
 * @format
 */

// Entry file (e.g., App.js or index.js)
import React, {useEffect} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import FirebaseConfig from './FirebaseConfig';

// Initialize Firebase when the app starts
if (!FirebaseConfig.firebase.apps.length) {
  FirebaseConfig.firebase.initializeApp(FirebaseConfig.firebaseConfig);
}

const Main = () => {
  // Other initializations or configurations if needed

  useEffect(() => {
    // Cleanup or additional initialization
    return () => {
      // Cleanup logic if needed
    };
  }, []);

  return <App />;
};

AppRegistry.registerComponent(appName, () => Main);
