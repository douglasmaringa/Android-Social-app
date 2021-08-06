import React,{useState,useEffect} from 'react'
import { View, Text,ScrollView } from 'react-native'
import { Image,Input} from 'react-native-elements';


const SingleScreen = ({route,navigation}) => {
    const { name, image } = route.params;
    return (
        <View style={{flex:1,}}>
           
           <Image
  source={{uri:image}}
  style={{ width: 330, height:390 , marginTop:2,padding:10}}
  
/>

        </View>
    )
}

export default SingleScreen
