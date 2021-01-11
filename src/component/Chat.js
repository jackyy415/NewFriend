import React, {useState, useRef, useEffect, useLayoutEffect, useContext} from "react"
import { FlatList, SafeAreaView, ScrollView, View, Text, Pressable, TextInput, KeyboardAvoidingView } from "react-native"
import io from "socket.io-client";
import auth from '@react-native-firebase/auth';
import ChatActions from "../socket/ChatActions";
import RoomSocket from "../socket/RoomSocket";
import { useSelector, useDispatch } from "react-redux";
import RoomSocketProvider, { RoomSocketContext } from "../provider/RoomSocketProvider";

const Chat = (props) => {
    const [message, setMessage] = useState([]);
    const [input, setInput] = useState('');
    const [connected, setConnected] = useState(false);
    const socket = useRef(null);
    const scrollView = useRef(null);
    const {route, navigation} = props;

    const connectedRoom = useSelector(state => state.connectedRoom);
    const dispatch  = useDispatch();

    const roomSocket = useContext(RoomSocketContext);

    useEffect(() => {
        let roomId = route.params.roomId;
        
        let rmListener = roomSocket.addEventListener((eventName, payload) => {
            console.log("Chat Event Listener received event");
            console.log(eventName);
            console.log(payload);
            // let newMsg = [...message, payload];            
            setMessage(prevMsg => {                
                return [...prevMsg, payload];
            });
        })

        return () => {
            if(rmListener != null) {
                rmListener();
            }
        }   
    }, []);

    const call = async () => {
        let res = await fetch("http://localhost:3000", {            
            method: 'POST',          
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: 'jacky', age: 18})
        });
        let text = await res.text();
        console.log(text);
    }    

    /*
    const connectSocket = (roomId) => {
        
        // socket.current = io('http://192.168.1.96:3000');
        socket.current = io(`http://localhost:3000?roomId=${roomId}`);
        
        socket.current.on('connect', () => {   
            console.log('connect');         
            console.log(socket.current.id);   
            setConnected(true);         
        })

        socket.current.on('disconnect', () => {
            console.log('disconnect');
            setConnected(false);
        })

        socket.current.on('connecting', () => {
            console.log('connecting');
        })

        socket.current.on('error', (e) => {
            console.log('error');
            console.log(e);
        });

        socket.current.on('connect_error', (e) => {
            console.log('connect error');
            console.log(e);
        })

        socket.current.on(ChatActions.SendMessage, (msg) => {         
            let newMsg = [...message, msg];            
            setMessage(prevMsg => {                
                return [...prevMsg, newMsg];
            });
            
        })        
    }
    */

    const sendMsg = () => {        
        // socket.current.emit(ChatActions.SendMessage, {roomId: route.params.roomId,  target: socket.current.id, msg: input});
        roomSocket.sendMsg(input);
        // console.log(roomSocketContext);
        setInput("");
    }

    const fbLogout = () => {
        auth().signOut();
    }

    return (
        <SafeAreaView style={{flex: 1}}>  
            <Pressable onPress={fbLogout}>
                <Text>Logout</Text>
            </Pressable>
            {connectedRoom?  
            <View>
                <Text>Connected</Text>
            </View>
            :
            <View>
                <Text>Disconnected</Text>
            </View>
            }
        
            
            <FlatList  style={{flexGrow: 1}} data={message} contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-end', paddingHorizontal: 10, paddingBottom: 20}} 
                ref={val => scrollView.current = val} onContentSizeChange={(width, height) => scrollView.current.scrollToEnd()}
                renderItem={({item, index}) => {
                    return (
                        <View key={index}  style={{padding: 5, backgroundColor: 'blue', borderRadius: 5, marginVertical: 5, alignSelf: 'flex-end'}}>
                            <Text style={{color: '#FFF', alignSelf: 'flex-end'}}>{item}</Text>
                            <Text style={{color: '#FFF', alignSelf: 'flex-end', marginTop: 5}}>11:52pm</Text>
                        </View>
                    )
                }}
            />
            
            {/*
            <ScrollView contentContainerStyle={{flexGrow: 1}} ref={val => scrollView.current = val} onContentSizeChange={(width, height) => scrollView.current.scrollToEnd()}>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    {message.map((tmpMsg, index) => {
                        return (
                            <Text key={index}>{tmpMsg}</Text>
                        )
                    })}
                </View>
            </ScrollView> 
                */}

                <View style={{marginTop: 'auto', flexDirection: 'row', height: 50, alignItems: 'center', paddingHorizontal: 10, backgroundColor: '#FFF'}}>
                    <TextInput placeholderTextColor={'#CCC'} placeholder={'Your text message...'} style={{flex: 1,  marginRight: 10, height: 50, fontSize: 15}} value={input} onChangeText={val => setInput(val)}></TextInput>
                    { input.length > 0 && 
                    <Pressable style={{width: 100, alignItems: 'center', borderRadius: 5, backgroundColor: 'blue', height: 40, justifyContent: 'center'}} onPress={sendMsg}>
                        <Text style={{color: '#FFF'}}>Send</Text>
                    </Pressable>
                    }
                </View>
                
                     
            
        </SafeAreaView> 
    )
}

export default Chat;