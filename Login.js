import React, { useState } from "react";
import {View, Text, TextInput, Pressable} from "react-native";
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from "react-redux";
import {login, logout, test} from "./src/redux/slices";

const Login = () => {

    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const authenticated = useSelector(state => state.authenticated);
    const dispatch  = useDispatch();

    const submitLogin = async () => {
        // const confirmation = await auth().signInWithPhoneNumber('+852 97584245');
        // setConfirm(confirmation);
        dispatch(test(123));
    }

    const verifyCode = async () => {
        // try {
        //     let user = await confirm.confirm(code);
        //     console.log(user);
        // } catch (err) {
        //     console.log("Invalid code");
        // }
        dispatch(logout());
        
    }

    return (
        <View>
            <Text>Login</Text>
            <Text>Authenticated: { authenticated ? 'Y' : 'N' }</Text>
            <Pressable onPress={submitLogin} style={{padding: 10, borderWidth: 1}}>
                <Text>Submit</Text>
            </Pressable>
            <View>
                <TextInput style={{borderWidth: 1, height: 30, paddingHorizontal: 10}} value={code} onChangeText={val => setCode(val)} />
            </View>
            <Pressable onPress={verifyCode} style={{padding: 10, borderWidth: 1}}>
                <Text>Verify</Text>
            </Pressable>
        </View>
    )
}

export default Login;