import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import usersReducer from '../slice/UserSlice'
import PostsReducer from "../slice/PostsSlice"
import ProfileReducer from "../slice/ProfileSlice"


const reducer = combineReducers({
  user:usersReducer,
  posts:PostsReducer, 
  profile:ProfileReducer,
})

const store = configureStore({
  reducer,    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store;