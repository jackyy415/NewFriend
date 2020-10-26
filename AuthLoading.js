import React, {useEffect} from "react"
import {View, Text, ActivityIndicator} from "react-native"
import { createStackNavigator } from '@react-navigation/stack'
import { useDispatch, useSelector } from 'react-redux';
import {login, logout} from "./src/redux/slices"
import Chat from "./src/component/Chat";
import { LoginStack, MainStack } from "./AppNav";
import auth from '@react-native-firebase/auth';
import {KeyboardAvoidingView} from "react-native"
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
      let token = await messaging().getToken();
      console.log(`FCM Token: ${token}`);
      let result = await fetch("http://www.kodku.com:3000/phone/", {
          method: 'POST',
          body: JSON.stringify({token: token}),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
      });               
    }
  }


const AuthStackNav = createStackNavigator();

const AuthLoading = (props) => {    
    
    let dispatch = useDispatch();
    let authenticated = useSelector(state => state.authenticated);


    useEffect(() => {
        requestUserPermission();
        const subscriber = auth().onAuthStateChanged(user => {
            console.log("Auth changed");
            console.log(user);   
            if (user) {
                dispatch(login())
            } else {
                dispatch(logout())
            }         
        })

        return subscriber;
    }, []);

    return (              
        <>
        {authenticated == undefined && 
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} />
        </View>   
        }
        
        {authenticated != undefined &&
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
                <AuthStackNav.Navigator screenOptions={{headerShown: false}}>
                    {authenticated ? 
                        <AuthStackNav.Screen name="Main" component={MainStack} />
                    :
                        <AuthStackNav.Screen name="Login" component={LoginStack} />
                    }     
                </AuthStackNav.Navigator> 
            </KeyboardAvoidingView>
        }       
        </>
    )
}

export default AuthLoading;