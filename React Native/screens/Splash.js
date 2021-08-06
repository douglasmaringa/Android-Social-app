import React,{useState,useEffect} from 'react'
import { View, Text,TextInput,Button ,StyleSheet,TouchableOpacity,ScrollView} from 'react-native'
import Feed from "../components/Feed"
import Card from "../components/Card"
import { Image,Input} from 'react-native-elements';
import axios from "axios"
import {useDispatch, useSelector} from 'react-redux'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {post} from '../slice/PostsSlice'
import {getprofile} from "../slice/ProfileSlice"
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
    const dispatch = useDispatch()
    const[id,setId]=useState("")
  const { posts} = useSelector(state => state.posts)
  const { profile} = useSelector(state => state.profile)

//gets id from async storage
  useEffect(() => {
    get()
   }, [get])
   const get = async()=>{
     const data = await AsyncStorage.getItem('id')
     //console.log(JSON.parse(data))
     setId(JSON.parse(data))
    }

    //uses id to get posts for the app
    useEffect(() => {
        if(id){
          dispatch(post({id:id}))
          dispatch(getprofile({id:id}))
          }else{
              navigation.navigate("Home")
          }
       }, [id])
      
   //when posts arrive it sends user to home screen
   useEffect(() => {
    if(posts){
     navigation.navigate("Home")
      }
   }, [posts])

    // console.log(profile)
    return (
        <View style={{ backgroundColor:"#10BEF6",height:600}}>
            <Text style={{ fontSize:20,textAlign:"center",marginTop:100,fontWeight:"700",color:"white"}}>splash</Text>
            <Image
  source={{uri:"https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif"}}
  style={{ width: 300, height:150 , marginTop:5,padding:10,marginLeft:10}}
  
/>
        </View>
    )
}

export default Splash
