/**
 * @format
 */

import React, {useEffect} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import store from './src/Redux/store';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';

const AppReducer = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => AppReducer);
