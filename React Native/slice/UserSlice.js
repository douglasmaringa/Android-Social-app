import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';


//action for getting user
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async ({username,password},dispatch, getState) => {
   //console.log(username)
    try{
    return await axios.post("http://192.168.100.5:8800/api/auth/login",{
      email:username,
      password:password
    })
    }catch(err){
     return err;
    }
  }
);


     

//State
const usersSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: null,
  },
  //normal reducers come here
  reducers:{  
    logoutSuccess: (state, action) =>  {
      state.email = null;
      state.users= [];
      AsyncStorage.removeItem('email')
      AsyncStorage.removeItem('id')
      AsyncStorage.removeItem('username')
    },
  },
  //reducers for thunk axios call come here
  extraReducers: {
    [getUsers.pending]: (state, action) => {
      state.status = "loading";
    },
    [getUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = action.payload;
      //console.log(action.payload.data)
      if(action.payload.status == 200){
        AsyncStorage.setItem('email', JSON.stringify(action.payload.data.email))
        AsyncStorage.setItem('id', JSON.stringify(action.payload.data._id))
        AsyncStorage.setItem('username', JSON.stringify(action.payload.data.username))
    }
    else{
      alert("wrong credentials")
    }
   
  
  },
    [getUsers.rejected]: (state, action) => {
      state.status = "failed";
    }
  },
});

//logout this is a normal action so it must be defined first
// Actions
const {logoutSuccess } = usersSlice.actions
export const logout = () => async dispatch => {
  try {
    // await api.post('/api/auth/logout/')
    alert("logout sucees")
    return dispatch(logoutSuccess())
  } catch (e) {
    return console.error(e.message);
  }
}
export default usersSlice.reducer;