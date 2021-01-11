import ChatActions from "./ChatActions";
import io from "socket.io-client";

class RoomSocket {
    roomId = "";
    connected = false;
    socket = null;
    connectedCb = null;
    disconnectedCb = null;
    errorCb = null;
    eventCb = null;
    
    constructor(roomId) {
        this.roomId = roomId;
    }

    connectSocket = () => {
                
        this.socket = io(`http://localhost:3000?roomId=${this.roomId}`);
        
        this.socket.on('connect', () => {   
            console.log('connect');         
            // console.log(this.socket.current.id);   
            this.connected = true;
            if (this.connectedCb) {
                this.connectedCb();
            }            
            
        })

        this.socket.on('disconnect', () => {
            console.log('disconnect');
            this.connected = false;
            if (this.disconnectedCb) {
                this.disconnectedCb();
            }
        })

        this.socket.on('connecting', () => {
            console.log('connecting');
        })

        this.socket.on('error', (e) => {
            console.log('error');
            console.log(e);
            if (this.errorCb) {
                this.errorCb(e);
            }
        });

        this.socket.on('connect_error', (e) => {
            console.log('connect error');
            console.log(e);
            if (this.errorCb) {
                this.errorCb(e);
            }
        })

        this.socket.on(ChatActions.NewMemberJoined, (msg) => { 
            console.log("Received new member join event");            
            if (this.eventCb) {
                this.eventCb(ChatActions.NewMemberJoined, msg);
            }                 
        })   

        this.socket.on(ChatActions.SendMessage, (msg) => { 
            console.log("Received send message event");
            console.log(msg);
            if (this.eventCb) {
                this.eventCb(ChatActions.SendMessage, msg);
            }                 
        })        
    }

    sendMsg = (msg) => {
        this.socket.emit(ChatActions.SendMessage, {roomId: this.roomId,  target: this.socket.id, msg: msg});
    }
}

export default RoomSocket;