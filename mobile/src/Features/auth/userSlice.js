import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const loginUser = createAsyncThunk("account/login", async(payload) =>{
    //call api login
    const data = await userApi.login(payload);
    //save in AsyncStorage
    await AsyncStorage.setItem("access_token",data.token);
    await AsyncStorage.setItem("user",JSON.stringify(data._id));
    return data;
})
const userSlice = createSlice({
    name : 'user',
    initialState : {
        current : ({})
    },
    reducers : {
        logout(state){
            AsyncStorage.removeItem('access_token');
            AsyncStorage.removeItem('user');
            state.current = {}
        }
    },
    extraReducers : {
        [loginUser.fulfilled] : (state, action) =>{
            state.current = action.payload;
        }
    }
})
const {actions, reducer} = userSlice;
export const { logout } = actions;
export default reducer;