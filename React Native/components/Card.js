import React,{useState,useEffect} from 'react'
import { View, Text ,StyleSheet,TouchableOpacity} from 'react-native'
import { Image,Input} from 'react-native-elements';
import { Entypo,AntDesign,EvilIcons } from '@expo/vector-icons'; 
import TimeAgo from 'react-native-timeago';
import {useDispatch, useSelector} from 'react-redux'
import axios from "axios"
import {post} from '../slice/PostsSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Card = ({name,desc,image,time,id,likes,navigation}) => {
    const dispatch = useDispatch()
    const[userid,setUserid]=useState("")
    const[liked,setLiked]=useState(false)
    useEffect(() => {
        get()
       }, [get])
       const get = async()=>{
         const data = await AsyncStorage.getItem('id')
         
         setUserid(JSON.parse(data))
        }
     
     
    const like = async () => {
       setLiked(true)
        try{
        const res = await axios.put(`http://192.168.100.5:8800/api/posts/${id}/like`,{
            userId:userid
        });
        console.log(res.data);
        dispatch(post({id:userid}))
        setLiked(false)
        }catch(err)
        {
            //alert("you already follow this user")
            console.log(err)
        }
      };
      
    return (
        
        <View style={styles.card}>
 
            <View style={styles.cardtop}>
            <View>
                <Image
  source={{uri:'https://avatars.githubusercontent.com/u/64867706?v=4'}}
  style={{ width: 50, height:50 ,borderRadius:50, marginTop:2,padding:10}}
  
/>
                </View>
            
<View  style={{ marginLeft:10,}}>
<Text style={{ fontWeight:"bold",}}>{name}</Text>
<Text  style={{ fontSize:12,}}> <TimeAgo time={time} /></Text>
</View>

<View style={{  marginLeft:150}}>
<Entypo name="dots-three-horizontal" size={24} color="black" />
</View>
</View>


<View style={styles.middle}>
    <Text style={{ marginLeft:15,}}>{desc}</Text>
</View>
<TouchableOpacity onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('single', {
           name:name,
           image:image,
          });
        }}>
<Image
  source={{uri:image}}
  style={{ width: 300, height:250 , marginTop:5,padding:10,marginLeft:10}}
  
/>
</TouchableOpacity>
<View style={{marginTop:10,display:"flex",flexDirection:"row",marginBottom:20}}>
    <View style={{display:"flex",flexDirection:"row"}}>
    <TouchableOpacity onPress={like}>
        {
            liked?
            (<View><AntDesign name="like2" size={24} color="blue" style={{marginLeft:10}}/></View>):
            (<View><AntDesign name="like2" size={24} color="black" style={{marginLeft:10}}/></View>)
        }

</TouchableOpacity>
<Text style={{marginLeft:10}}>{likes}</Text>
</View>
<EvilIcons name="comment" size={24} color="black" style={{marginLeft:110}} />
<Entypo name="share" size={24} color="black"style={{marginLeft:100}} />
</View>

        </View>
       
    )
}
const styles = StyleSheet.create({
    cardtop:{
        display:"flex",
        flexDirection:"row",
        padding:10
    },
    card:{
        borderTopColor:"gray",
        borderTopWidth:1,
        borderBottomColor:"gray",
        borderBottomWidth:1,
        marginTop:10,
    }
  })

export default Card
