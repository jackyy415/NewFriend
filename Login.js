import React, { useState, useEffect } from "react";
import {View, Text, TextInput, Pressable, Alert} from "react-native";
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from "react-redux";
import {login, logout, test} from "./src/redux/slices";

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
            
            
            const confirmation = await auth().signInWithPhoneNumber(`+852${mobile}`);            
            setConfirm(confirmation);

            if (confirmation != null) {
                navigation.navigate("Verification", {confirmation: confirmation});
            } else {
                throw Error('Failed to send SMS');
            }
        } catch (err) {
            console.log(err);
            Alert.alert("Error", "Cannot send SMS to this number");
        }                   
    }

    

    return (
        <View style={{padding: 10, backgroundColor: '#FFF', flex: 1}}>                        
            <View>
                <Text style={{fontSize: 20}}>Mobile</Text>
                <TextInput style={{height: 40, borderBottomWidth: 1, fontSize: 20}} keyboardType={'numeric'} value={mobile} onChangeText={val => setMobile(val)}></TextInput>
            </View> 
            <View style={{ marginTop: 15}}>
                <Pressable onPress={submitLogin} style={{padding: 10, borderWidth: 1, borderRadius: 5, alignSelf: 'flex-end'}}>
                    <Text>Send</Text>
                </Pressable>
            </View>


            
         
        </View>
    )
}

export default Login;