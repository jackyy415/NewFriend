import ChatActions from "./ChatActions";

class RoomSocket {
    roomId = "";
    connected = false;
    socket = null;
    
    constructor(roomId) {
        this.roomId = roomId;
    }

    connectSocket = (connectedCb, disconnectedCb, errorCb, eventCb) => {
                
        this.socket = io(`http://localhost:3000?roomId=${this.roomId}`);
        
        this.socket.on('connect', () => {   
            console.log('connect');         
            console.log(socket.current.id);   
            this.connected = true;
            if (connectedCb) {
                connectedCb();
            }
        })

        this.socket.on('disconnect', () => {
            console.log('disconnect');
            this.connected = false;
            if (disconnectedCb) {
                disconnectedCb();
            }
        })

        this.socket.on('connecting', () => {
            console.log('connecting');
        })

        this.socket.on('error', (e) => {
            console.log('error');
            console.log(e);
            if (errorCb) {
                errorCb();
            }
        });

        this.socket.on('connect_error', (e) => {
            console.log('connect error');
            console.log(e);
            if (errorCb) {
                errorCb();
            }
        })

        this.socket.on(ChatActions.SendMessage, (msg) => { 
            if (eventCb) {
                eventCb(ChatActions.SendMessage, msg);
            }                 
        })        
    }

    sendMsg = (msg) => {
        this.socket.emit(ChatActions.SendMessage, {roomId: this.roomId,  target: this.socket.id, msg: msg});
    }
}

export default RoomSocket;