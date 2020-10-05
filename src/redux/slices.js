import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const test = createAsyncThunk(
    'test',
    async(userId, thunkApi) => {
        return userId;
    }
)

const appSlices = createSlice({
    name: 'app',
    initialState: {
        authenticated: false
    },
    reducers: {
        login: (state, action) => { 
            state.authenticated = true
        },
        logout: (state, action) => {
            state.authenticated = false
        }
    },
    extraReducers: {
        [test.fulfilled]: (state, action) => {
            console.log("Payload");
            console.log(action.payload);
        }
    }
})

export const {login, logout} = appSlices.actions;
export default appSlices.reducer;
