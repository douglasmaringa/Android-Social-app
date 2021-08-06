import React,{useState,useEffect} from 'react'
import { View, Text,Button } from 'react-native'
import { Image,Input} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getUsers,logout} from '../slice/UserSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const dispatch = useDispatch()
    const { users} = useSelector(state => state.user)

const reg =()=>{
    navigation.navigate("register")
}
    const login = ()=>{
       
        dispatch(getUsers({username:email,
         password:password}));
       if(users.status==200){
           navigation.navigate("Home")
       }
       }
       useEffect(() => {
          // dispatch(logout)
        get()
       }, [])
     
       const get = async()=>{
        const data = await AsyncStorage.getItem('email')
        if(data){
            navigation.navigate("Home")
        }
       }
      
  console.log(users)
    return (
        <View>
           
            <Input
  placeholder='Email'
  style={{ marginTop:25,fontSize:15}}
  value={email}
  onChangeText={(text)=>{
    setEmail(text)
  }}
/>
<Input
  placeholder='Password'
  style={{ marginTop:25,fontSize:15}}
  value={password}
  type="password"
  onChangeText={(text)=>{
    setPassword(text)
  }}
/>
<Button title="login" onPress={login}/>
<View style={{ marginTop:25}}>
<Button title="Register" onPress={reg}/>
</View>
        </View>
    )
}

export default Login
