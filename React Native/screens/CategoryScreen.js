import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet ,ScrollView} from 'react-native'
import {useDispatch,useSelector} from 'react-redux'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getUsers,logout} from '../slice/UserSlice'

const CategoryScreen = () => {
    const { users ,email} = useSelector(state => state.user)
   useEffect(() => {
       
      console.log(email)
   }, [])
    return (
        <View style={{flex:1}}>
           <Text>catergory</Text>
        </View>
    )
}



export default CategoryScreen
