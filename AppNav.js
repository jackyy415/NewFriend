import React from "react"
import {KeyboardAvoidingView} from "react-native"
import { createStackNavigator } from '@react-navigation/stack'
import Login from "./Login"
import Chat from "./src/component/Chat";
import Verification from "./Verification";

import { useSelector, useDispatch } from "react-redux";
import ListRooms from "./src/component/ListRooms";
import PhoneChecker from "./src/component/PhoneChecker";
import Room from "./src/component/Room";

const LoginStackNav = createStackNavigator();
export const LoginStack = () => {
    return (
        
        <LoginStackNav.Navigator>
            <LoginStackNav.Screen name="Login" component={Login}></LoginStackNav.Screen>
            <LoginStackNav.Screen name="Verification" component={Verification}></LoginStackNav.Screen>                
        </LoginStackNav.Navigator>
        
    )
}

const MainStackNav = createStackNavigator();
export const MainStack = () => {
    return (
  
        <MainStackNav.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#4574EB'
            },
            headerTintColor: '#FFF',            
            }}
            initialRouteName='Room'
        >
            <MainStackNav.Screen name="PhoneChecker" component={PhoneChecker} options={(props, navigation) => (
                {title: 'Stock'}
            )}></MainStackNav.Screen>
            <MainStackNav.Screen name="ListRooms" component={ListRooms}></MainStackNav.Screen>
            <MainStackNav.Screen name="Room" component={Room}></MainStackNav.Screen>
            <MainStackNav.Screen name="Chat" component={Chat}></MainStackNav.Screen>            
        </MainStackNav.Navigator>
        
    )
} 