import React, { useState, useEffect } from "react";
import {View, Text, TextInput, Pressable, Alert} from "react-native";
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from "react-redux";
import {login, logout, test} from "./src/redux/slices";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = (props) => {
    const [prefix, setPrefix] = useState('');
    const [mobile, setMobile] = useState('');
    const [confirm, setConfirm] = useState(null);
    const [code, setCode] = useState('');
    const authenticated = useSelector(state => state.authenticated);
    const dispatch  = useDispatch();
    const {navigation} = props;

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(user => {
            console.log("Auth changed");
            console.log(user);            
        })

        return subscriber;
    }, []);

    const submitLogin = async () => {
        try {
            console.log("Before sign in");
            // const confirmation = await auth().signInWithPhoneNumber('+852 11111111');
            const confirmation = await auth().signInWithPhoneNumber(mobile);
            console.log("after sign in");
            console.log(confirmation);
            setConfirm(confirmation);
        } catch (err) {
            console.log(err);
            Alert.alert("Error", "Cannot send SMS to this number");
        }   
        // console.log("Verify now");
        // navigation.navigate("Chat");
        // dispatch(test(123));
        
    }

    const verifyCode = async () => {
        try {
            let user = await confirm.confirm(code);
            console.log(user);
            navigation.navigate("Chat");
        } catch (err) {
            console.log("Invalid code");
            console.log("Before alert");
            Alert.alert("Error", "Invalid code");
            console.log("after alert");
        }
        // dispatch(logout());
        
    }

    return (
        <View style={{padding: 10, backgroundColor: '#FFF', flex: 1}}>            
            <Text>Authenticated: { authenticated ? 'Y' : 'N' }</Text>
            <View>
                <Text style={{fontSize: 20}}>Mobile</Text>
                <TextInput style={{height: 40, borderBottomWidth: 1, fontSize: 20}} keyboardType={'numeric'} value={mobile} onChangeText={val => setMobile(val)}></TextInput>
            </View> 
            <View style={{ marginTop: 15}}>
                <Pressable onPress={submitLogin} style={{padding: 10, borderWidth: 1, borderRadius: 5, alignSelf: 'flex-end'}}>
                    <Text>Next</Text>
                </Pressable>
            </View>

            <View style={{ marginTop: 15}}>
                <Text style={{fontSize: 20}}>Verification Code</Text>
                <TextInput style={{height: 40, borderBottomWidth: 1, fontSize: 20}} keyboardType={'numeric'} value={code} onChangeText={val => setCode(val)}></TextInput>
            </View> 
            <View style={{ marginTop: 15}}>
                <Pressable onPress={verifyCode} style={{padding: 10, borderWidth: 1, borderRadius: 5, alignSelf: 'flex-end'}}>
                    <Text>Verify</Text>
                </Pressable>
            </View>
         
        </View>
    )
}

export default Login;