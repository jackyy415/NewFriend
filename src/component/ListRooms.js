import React, {useState, useEffect} from "react"
import {View, Text, FlatList, Pressable} from "react-native"
import Geolocation from '@react-native-community/geolocation';

const ListRooms = (props) => {
    
    let [rooms, setRooms] = useState([]);
    let {navigation} = props;

    const getRooms = async () => {
        let res = await fetch('http://localhost:3000/room');
        let resJson = await res.json();
        console.log(resJson);
        let {rooms} = resJson;
        setRooms(rooms);
    }

    useEffect(() => {    
        getRooms();
        Geolocation.getCurrentPosition(info => {
            console.log("Current POs");
            console.log(info);
        });
    }, [])

    const goToRoom = (roomId) => {
        navigation.navigate("Chat", {roomId: roomId});
    }

    return (
        <View>
            <Text>List Rooms</Text>
            <FlatList data={rooms} extraData={rooms} renderItem={({item}) => {
                return (
                    <Pressable onPress={() => goToRoom(item)} style={{paddingVertical: 10}}>
                        <Text>{item}</Text>
                    </Pressable>
                )
            }} />
        </View>
    )
}

export default ListRooms;