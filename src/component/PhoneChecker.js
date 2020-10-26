import React, {useState, useEffect} from "react"
import {SafeAreaView, FlatList, Text, View, Alert, ActivityIndicator, Pressable} from "react-native"

const PhoneChecker = () => {
    const [available, setAvailable] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAvailable = async () => {
        setLoading(true);
        try {
            let result = await fetch("http:/www.kodku.com:3000/phone/");               
            let resultJson = await result.json();
            setAvailable(resultJson);
        } catch (err) {
            Alert.alert("Error", "Cannot call phone server.");
        }
        setLoading(false);
    }

    useEffect(() => {        
        getAvailable();
    }, [])
        
    return (
        <>
        {loading &&
            <View style={{width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <ActivityIndicator size={'large'} />
            </View>
        }
        <SafeAreaView style={{flex: 1}}>
            
            <View style={{padding: 10, flex: 1}}>
                <Text>Available Store: {available.length}</Text>
                <FlatList style={{flex: 1}} contentContainerStyle={{flexGrow: 1}} data={available} extraData={available} keyExtractor={(item, index) => index.toString()} renderItem={({item, index}) => {                
                    return (
                        <View style={{borderBottomWidth: 1, paddingVertical: 5}} key={index}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', marginBottom: 3}}>{item.name}</Text>   
                            {item.available.map((device, index) => (
                                <View key={index}>
                                    <Text>{device}</Text>
                                </View>
                            ))}
                            
                        </View>
                    )
                }}>
                </FlatList>
                <Pressable style={{marginTop: 'auto'}} onPress={getAvailable} style={{borderRadius: 5, alignItems: 'center', paddingVertical: 10, backgroundColor: '#4574EB'}}>
                    <Text style={{color: '#FFF', fontSize: 17}}>Retry</Text>
                </Pressable>
            </View>
        </SafeAreaView>
        </>
    )
}

export default PhoneChecker;