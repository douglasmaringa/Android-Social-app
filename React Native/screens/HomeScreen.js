import React,{useState,useEffect} from 'react'
import { View, Text,TextInput,Button ,StyleSheet,TouchableOpacity,ScrollView} from 'react-native'
import Feed from "../components/Feed"
import Card from "../components/Card"
import axios from "axios"
import {useDispatch, useSelector} from 'react-redux'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {post} from '../slice/PostsSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({navigation}) => {
  const[posts1, setPosts1]= useState([])
  const[load, setLoad]= useState(false)
  const[id, setId]= useState("")
  const dispatch = useDispatch()
  const { posts} = useSelector(state => state.posts)
  const { email,users} = useSelector(state => state.user)
   
   /* useEffect(() => {
     get()
    }, [get])
    const get = async()=>{
      const data = await AsyncStorage.getItem('id')
      console.log(JSON.parse(data))
      setId(JSON.parse(data))
     }
  
    useEffect(() => {
      if(id){
        dispatch(post({id:id}))
        }
     }, [id])
    
 */
 
    return (
     
      <ScrollView>
      <View>
        <Feed/>
        {
          posts.map(m=>(
            <Card name={m.username} image={m.img} desc={m.desc} key={m._id} time={m.createdAt} likes={m.likes.length} id={m._id} navigation={navigation}/>
          ))
        }
       
     </View>
     </ScrollView>
    
      );
    }
    
export default HomeScreen
