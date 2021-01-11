import { configureStore } from "@reduxjs/toolkit";
import appReducers from "./slices";


const store = configureStore({
    reducer: appReducers
})

export default store;