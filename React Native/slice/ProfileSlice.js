import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"


//action for getting user
export const getprofile = createAsyncThunk(
  "getting/getprofile",
  async ({id},dispatch, getState) => {
    console.log(id)
    try{
    return await axios.get(`http://192.168.100.5:8800/api/users/${id}`)
   
    }catch(err){
     return err;
    }
  }
);


//State
const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: [],
    status: null,
  },
  
  //reducers for thunk axios call come here
  extraReducers: {
    [getprofile.pending]: (state, action) => {
      state.status = "loading";
    },
    [getprofile.fulfilled]: (state, action) => {
      state.status = "success";
      if(action.payload.data){
      state.profile = action.payload.data;
      }
  },
    [getprofile.rejected]: (state, action) => {
      state.status = "failed";
    }
  },
});


export default ProfileSlice.reducer;