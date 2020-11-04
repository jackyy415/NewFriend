import React, {useEffect, useState} from "react"
import {SafeAreaView, View, Text, ScrollView} from "react-native"

const Room = () => {
    let [roomId, setRoomId] = useState('');
    useEffect(() => {

        const findRoom = async () => {
            let assignRoomResult = await fetch('http://localhost:3000/assignRoom');
            let { roomId } = await assignRoomResult.json();
            setRoomId(roomId);
            console.log(`Assigned roomId: ${roomId}`);            
        }

        findRoom();

        // let roomId = route.params.roomId;
        // // console.log(`Room ID: ${route.params.roomId}`);
        // if (socket.current == null) {
        //     connectSocket(roomId);
        // } else if (!socket.current.connected) {
        //     connectSocket(roomId);
        // }        
    }, []);
    
    return (
        <SafeAreaView>
            <View>
                <Text>This is Room: {roomId}</Text>
            </View>
        </SafeAreaView>
    )
}


export default Room;