/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { LoginStack } from "./AppNav";
import AuthLoading from "./AuthLoading";
import { configureStore } from "@reduxjs/toolkit";
import appReducers from "./src/redux/slices";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: appReducers
})

const App: () => React$Node = () => {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <AuthLoading></AuthLoading>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
