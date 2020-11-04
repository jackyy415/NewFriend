import React, {useState} from "react"
import {View, Text, TextInput, Pressable, Alert} from "react-native"
import { useDispatch, useSelector } from 'react-redux';
import { login } from "./src/redux/slices"


const Verification = (props) => {    

    let {navigation, route} = props;
    let [code, setCode] = useState('');
    let dispatch = useDispatch();

    let confirmation = route.params.confirmation;    

    const verifyCode = async () => {
        try {
            let user = await confirmation.confirm(code);
            console.log(user);
            
            dispatch(login());
        } catch (err) {
            console.log("Invalid code");
            console.log("Before alert");
            Alert.alert("Error", "Invalid code");
            console.log("after alert");
        }
        // dispatch(logout());
        
    }

    return (
        <View style={{padding: 10}}>
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

export default Verification;