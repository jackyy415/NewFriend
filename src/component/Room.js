import React, {useEffect, useState, useContext} from "react"
import {SafeAreaView, View, Text, ScrollView, Pressable} from "react-native"
import { useSelector, useDispatch } from "react-redux";
import RoomSocketProvider, { RoomSocketContext } from "../provider/RoomSocketProvider";
import ChatActions from "../socket/ChatActions";


const Room = (props) => {
    let [roomId, setRoomId] = useState('');
    let [memberCount, setMemberCount] = useState(0);
    let {navigation} = props;
    const connectedRoom = useSelector(state => state.connectedRoom);
    const dispatch  = useDispatch();

    const roomSocket = useContext(RoomSocketContext);    

    const goToRoom = () => {
        navigation.navigate("Chat", {roomId: roomId});
        // dispatch(connectRoom("hello"));
        // console.log(connectRoom.toString());
        // roomSocketContext.sendMsg("Hi");
        
    }

    const findRoom = async () => {
        let assignRoomResult = await fetch('http://localhost:3000/assignRoom');
        let { roomId } = await assignRoomResult.json();
        console.log(`Assigned roomId: ${roomId}`);            

        setRoomId(roomId);

        roomSocket.connect(roomId);    
        
    }

    
    

    useEffect(() => {        
        let rmListener = roomSocket.addEventListener((eventName, payload) => {
            console.log("Room Event Listener Received event");
            console.log(eventName);
            console.log(payload);
            if (eventName == ChatActions.NewMemberJoined) {
                setMemberCount(payload.memberCount);
            }
        })

        findRoom();

        return () => {
            if (rmListener != null) {
                rmListener();
            }
        }
                
    }, []);
    

    return (
        
        <SafeAreaView>
            <View>
                <Text>This is Room: {roomId}</Text>
                <Text>Member Count: {memberCount}</Text>
                {connectedRoom &&
                    <Text>Connected Room</Text>
                }
                {!connectedRoom &&
                    <Text>NOT Connected Room</Text>
                }
                <Pressable onPress={goToRoom}>
                    <Text>Go to room</Text>
                </Pressable>

                <Pressable onPress={findRoom}>
                    <Text>Find room</Text>
                </Pressable>
            </View>
        </SafeAreaView>
        
    )
}


export default Room;