import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import RoomSocket from '../socket/RoomSocket';



export const test = createAsyncThunk(
    'test',
    async(userId, thunkApi) => {
        return userId;
    }
)

var roomSocket = null;


const appSlices = createSlice({
    name: 'app',
    initialState: {
        authenticated: undefined,
        connectedRoom: false,
        roomId: ''        
    },
    reducers: {
        login: (state, action) => { 
            console.log("Received login");
            state.authenticated = true
        },
        logout: (state, action) => {
            state.authenticated = false
        },
        setConnected: (state, action) => {
            state.connectedRoom = true;
        },
        connectRoom: (state, action) => {
            console.log("Connect room");
            let roomId = action.payload;
            state.roomId = roomId;
            
            // console.log(action.payload);
            // state.connectedRoom = true;
        }
    },
    extraReducers: {
        [test.fulfilled]: (state, action) => {
            console.log("Payload");
            console.log(action.payload);
        }
    }
})

export const {login, logout, connectRoom, setConnected} = appSlices.actions;
export default appSlices.reducer;
