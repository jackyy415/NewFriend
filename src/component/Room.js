import React from "react"
import {SafeAreaView, View, Text, ScrollView} from "react-native"

const Room = () => {
    useEffect(() => {
        let roomId = route.params.roomId;
        // console.log(`Room ID: ${route.params.roomId}`);
        if (socket.current == null) {
            connectSocket(roomId);
        } else if (!socket.current.connected) {
            connectSocket(roomId);
        }        
    }, []);
    
    return (
        <SafeAreaView>
            <View>
                <Text>This is Room</Text>
            </View>
        </SafeAreaView>
    )
}


export default Room;