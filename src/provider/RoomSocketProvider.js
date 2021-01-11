import React, { createContext } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setConnected } from "../redux/slices"
import RoomSocket from "../socket/RoomSocket"
import RandomGenerator from "../util/RandomGenerator";

const RoomSocketContext = createContext(null);

export {RoomSocketContext};

const RoomSocketProvider = ({children}) => {

    console.log("Provider called");

    const dispatch = useDispatch();

    let connectedCb =() => {
        console.log("Connected Room Cb");
        // console.log(state);                
        // setConnected();
        // state.connectedRoom = true;
        dispatch(setConnected());
    };

    var roomSocket;

    var listeners = [];

    const connect = (roomId) => {
        

        roomSocket = new RoomSocket(roomId);
        roomSocket.connectedCb = connectedCb;
        roomSocket.disconnectedCb = () => {
            console.log("Disconnect Room Cb");
        }
        roomSocket.errorCb = () => {
            console.log("Connect room error cb");
        }
        roomSocket.eventCb = (eventName, payload) => {         
            if (listeners.length > 0) {
                listeners.forEach(listenItem => {
                    listenItem.listener(eventName, payload);
                });
            }
        }
        roomSocket.connectSocket();
    }

    const sendMsg = (msg) => {
        roomSocket.sendMsg(msg);
    }

    const removeListener = (id) => {        
        listeners = listeners.filter(listenerItem => {
            return listenerItem.id != id;
        })
    }

    const removeAllListeners = () => {
        listeners = [];
    }

    const addEventListener = (evtListener) => {
        let randomId = RandomGenerator.generateRandomString(6);
        listeners.push({id: randomId, listener: evtListener});
        const tmpRemoveListener = () => {
            removeListener(randomId);
        }
        return tmpRemoveListener;
    }

    let contextVal = {        
        connect,
        sendMsg,
        addEventListener,
        removeAllListeners
    }
    
    return (
        <RoomSocketContext.Provider value={contextVal}>
            { children }
        </RoomSocketContext.Provider>
    )
}

export default RoomSocketProvider;