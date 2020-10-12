import React from "react"
import {KeyboardAvoidingView} from "react-native"
import { createStackNavigator } from '@react-navigation/stack'
import Login from "./Login"
import Chat from "./src/component/Chat";

const LoginStackNav = createStackNavigator();
export const LoginStack = () => {
    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <LoginStackNav.Navigator>
            <LoginStackNav.Screen name="Login" component={Login}></LoginStackNav.Screen>
            <LoginStackNav.Screen name="Chat" component={Chat}></LoginStackNav.Screen>
        </LoginStackNav.Navigator>
        </KeyboardAvoidingView>
    )
}