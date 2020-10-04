import React from "react"
import { createStackNavigator } from '@react-navigation/stack'
import Login from "./Login"

const LoginStackNav = createStackNavigator();
export const LoginStack = () => {
    return (
        <LoginStackNav.Navigator>
            <LoginStackNav.Screen name="Login" component={Login}></LoginStackNav.Screen>
        </LoginStackNav.Navigator>
    )
}