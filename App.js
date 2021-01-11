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
import store from "./src/redux/store"
import RoomSocketProvider, { RoomSocketContext } from "./src/provider/RoomSocketProvider";


const App: () => React$Node = () => {
  return (
    <>
    
      <Provider store={store}>
      <RoomSocketProvider>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <AuthLoading></AuthLoading>
        </NavigationContainer>
        </RoomSocketProvider>
      </Provider>
      
    </>
  );
};

export default App;
