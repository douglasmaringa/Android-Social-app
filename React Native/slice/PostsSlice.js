import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"


//action for getting user
export const post = createAsyncThunk(
  "posting/post",
  async ({id},dispatch, getState) => {
    console.log(id)
    try{
    return await axios.get(`http://192.168.100.5:8800/api/posts/timeline/${id}`)
   
    }catch(err){
     return err;
    }
  }
);


//State
const PostsSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    status: null,
  },
  
  //reducers for thunk axios call come here
  extraReducers: {
    [post.pending]: (state, action) => {
      state.status = "loading";
    },
    [post.fulfilled]: (state, action) => {
      state.status = "success";
      if(action.payload.data){
      state.posts = action.payload.data.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1);
      }
  },
    [post.rejected]: (state, action) => {
      state.status = "failed";
    }
  },
});


export default PostsSlice.reducer;