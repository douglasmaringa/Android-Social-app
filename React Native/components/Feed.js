import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Dimensions ,LogBox} from 'react-native';
import { ActionSheet, Root } from 'native-base'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Contants from 'expo-constants';
import { Image,Input} from 'react-native-elements';
import { Entypo } from '@expo/vector-icons'; 
import axios from "axios"
import {useDispatch, useSelector} from 'react-redux'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {post} from '../slice/PostsSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Feed = () => {
  const[post1,setPost1]=useState("")
  const[show,setShow]=useState(false)
  const [fileList, setFileList] = useState([]);
  const[photo,setPhoto]=useState("")
  const[selectedImage,setSelectedImage]=useState("")
  const[load,setLoad]=useState("")
  const[id,setId]=useState("")
  const dispatch = useDispatch()
  const { profile} = useSelector(state => state.profile)

  const { content, btnPressStyle, btnPressText, itemImage, itemViewImage } = styles;
  LogBox.ignoreLogs(['Setting a timer']);

  let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dd1ra4zvo/upload';
//camera roll
  const takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
    setLoad("loading....")

    let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;

    let data = {
      "file": base64Img,
      "upload_preset": "ml_default",
    }

    

    fetch(CLOUDINARY_URL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(async r => {
      let data = await r.json()
      console.log(data.url);
      setPhoto(data.url);
      setShow(true)
      setFileList([...fileList, data.url]);
    }).catch(err => console.log(err))
  };


   
  //image from gallery
  const choosePhoto = async () => {
    
  let pickerResult = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [1, 1],
    base64: true
  });

  if (pickerResult.cancelled === true) {
    return;
  }

  setSelectedImage({ localUri: pickerResult.uri });
  setLoad("loading....")

  let base64Img = `data:image/jpg;base64,${pickerResult.base64}`;

  let data = {
    "file": base64Img,
    "upload_preset": "ml_default",
  }

  setShow(true)
  setPhoto("https://i.pinimg.com/originals/65/ba/48/65ba488626025cff82f091336fbf94bb.gif")

  fetch(CLOUDINARY_URL, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
  }).then(async r => {
    let data = await r.json()
    console.log(data.url);
    setPhoto(data.url);
  
    setFileList([...fileList, data.url]);
  }).catch(err => console.log(err))
};


 
  
//how will the pictures be taken
  const handleAddImage = () => {
    const BUTTONS = ['Take a Photo', 'Choose from Library', 'Cancel'];

    ActionSheet.show({
      options: BUTTONS,
      cancelButtonIndex: 2,
      title: 'Select a photo',

    },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            takePhoto();
            break;
          case 1:
            choosePhoto();
            break;

          default:
            break;
        }
      });
  }
//it asks for the permissions
  const getPermissionAsync = async () => {
    if (Contants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status != 'granted') {
        console.log('Sorry, we need CAMERA ROLL permission to make this works!');
      }
    }

    const { granted } = await Permissions.askAsync(Permissions.CAMERA);

    if (!granted) {
      console.log('Sorry, we need CAMERA permission to make this works!');
    }

  }

  useEffect(() => {
    getPermissionAsync();
  }, []);

  useEffect(() => {
    getPermissionAsync();
  }, []);
  useEffect(() => {
    get()
   }, [get])
   const get = async()=>{
     const data = await AsyncStorage.getItem('id')
     console.log(JSON.parse(data))
     setId(JSON.parse(data))
    }
 

const submit=async()=>{
  try{
    const data =  await axios.post("http://192.168.100.5:8800/api/posts/",{
      userId:id,
      desc:post1,
      img:photo,
      username:"douglas",
      email:"douglas@gmail.com",
    })
    dispatch(post({id:id}))
    console.log(data.data)
    setShow(false)
    setPost("")
    setPhoto("")
   
    }catch(err){
     return err;
    }
}
  
    return (
     
        <View style={styles.head}>

            <View style={styles.top}>
            <Image
  source={{uri:profile.profilePicture}}
  style={{ width: 100, height:100 ,borderRadius:50, marginTop:2,}}
  
/>
<Input
  placeholder='Whats on your mind?'
  style={{ marginTop:25,fontSize:15}}
  value={post1}
  onChangeText={(text)=>{
    setPost1(text)
  }}
/>
<View>

<Entypo name="image" size={24} color="gray"  style={{ marginTop:25}} />
<Button title="+" buttonStyle={{backgroundColor:'#FF8080',}} onPress={handleAddImage}/>
</View>

</View>
{
  show?
  (<View>
    <Image
  source={{ uri: photo }}
  style={{ width: 200, height:100 , marginLeft:100,}}/>
  <View  style={{ width: 50,  marginLeft:250,}}>
  <Button title="=>" buttonStyle={{backgroundColor:'#FF8080',width:40}} onPress={submit}/>
  </View>
  </View>):(<View></View>)
}
<View style={styles.bottom}>
        <View style={{ marginLeft:35, display:"flex",flexDirection:"row"}}>
        <Entypo name="pencil" size={24} color="blue" />
            <Text>Text</Text>
        </View>
        <View style={{ marginLeft:35, display:"flex",flexDirection:"row"}}>
        <Entypo name="video-camera" size={24} color="red" />
        <Text>Video</Text>
        </View>
        <View style={{ marginLeft:35, display:"flex",flexDirection:"row"}}>
        <Entypo name="location-pin" size={24} color="red" />
        <Text>Location</Text>
        </View>
</View>

        </View>
       
    )
}
const styles = StyleSheet.create({
    head:{
      color:'blue',
      borderTopColor:"gray",
      borderTopWidth:1,
      borderBottomColor:"gray",
      borderBottomWidth:1
      
    },
    top:{
        display:'flex',
        flexDirection:'row',
        maxWidth:180,
    }
    ,
    bottom:{
        display:'flex',
        flexDirection:'row',
        maxWidth:180,
        padding:10
    }
  })
export default Feed
