import React,{useEffect,useState} from 'react'
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Dimensions ,LogBox} from 'react-native';
import { Image,Input} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons'; 
import {useDispatch, useSelector} from 'react-redux'
import axios from "axios"
import {getprofile} from "../slice/ProfileSlice"
import { ActionSheet, Root } from 'native-base'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Contants from 'expo-constants';


const CartScreen = () => {
  const[id,setId]=useState("")
  const { profile} = useSelector(state => state.profile)
  const[city,setCity]=useState("")
  const[from,setFrom]=useState("")
  const[show,setShow]=useState(false)
  const [fileList, setFileList] = useState([]);
  const[photo,setPhoto]=useState("")
  const dispatch = useDispatch()
  const[selectedImage,setSelectedImage]=useState("")

  
  LogBox.ignoreLogs(['Setting a timer']);

  let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dd1ra4zvo/upload';

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
    //setLoad("loading....")
  
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
      const BUTTONS = ['Choose from Library', 'Cancel'];
  
      ActionSheet.show({
        options: BUTTONS,
        cancelButtonIndex: 2,
        title: 'Select a photo',
  
      },
        buttonIndex => {
          switch (buttonIndex) {
            case 0:
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
  
 //gets id from async storage
 useEffect(() => {
  get()
 }, [get])
 const get = async()=>{
   const data = await AsyncStorage.getItem('id')
   //console.log(JSON.parse(data))
   setId(JSON.parse(data))
  }

  const save = async ()=>{
    try{
      const data =  await axios.put(`http://192.168.100.5:8800/api/users/${id}`,{
        userId:id,
        city:city,
        from:from,
        profilePicture:photo,
       })
      console.log(data.data)
      dispatch(getprofile({id:id}))
      }catch(err){
       return err;
      }
   
    }
  

    return (
        <View style={{flex:1}}>
           <Image
  source={{uri:"https://i.picsum.photos/id/239/536/354.jpg?hmac=HDafzATHcyRc6EIg5wzbH3R_51n3BNsTqTyQpoKMqwg"}}
  style={{ width: 300, height:150 , marginTop:5,padding:10,marginLeft:10,borderRadius:10}}>
{
      profile.profilePicture?
      (
      <View>
 <Image
  source={{uri:profile.profilePicture}}
  style={{ width: 100, height:100 ,padding:10,marginLeft:90,borderRadius:50,marginTop:45}}
  
>
  <View style={{backgroundColor:"white",marginTop:60,marginLeft:50,borderRadius:50}}>
<Entypo name="pencil" size={24} color="blue">
<Button title="+"  onPress={handleAddImage}/>
</Entypo>
</View>
</Image>

      </View>):
      (<View>
         <Image
  source={{uri:"https://images.rawpixel.com/image_png_1000/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvdjc5MS10YW5nLTM1LnBuZw.png?s=M0yI-4bIlBjNiT8KEnldpJPitOnxjS-nY_aSuitx6eE"}}
  style={{ width: 100, height:100 ,padding:10,marginLeft:90,borderRadius:50,marginTop:45}}
  
>
  <View style={{backgroundColor:"white",marginTop:60,marginLeft:50,borderRadius:50}}>
    <TouchableOpacity onPress={handleAddImage}>
<Entypo name="pencil" size={24} color="blue" />
</TouchableOpacity>
</View>
</Image>
      </View>)
    }
   

  </Image>  

<View  style={{display:"flex",flexDirection:"row",marginTop:10,}}>
<Text style={{textAlign:"center",fontSize:20,fontWeight:"700",marginLeft:70}}>{profile.username}</Text>
</View>


{
  show?
  (<View  style={{display:"flex",flexDirection:"row",marginTop:10,}}>
    <Text style={{textAlign:"center",fontSize:20,fontWeight:"700",marginLeft:30}}>Lives in {profile.city}</Text>
    <Input
  placeholder='City'
  style={{ fontSize:15 ,width:30}}
  value={city}
  onChangeText={(text)=>{
    setCity(text)
  }}
/>
  </View>):
  (<View  style={{display:"flex",flexDirection:"row",marginTop:20,}}>
    <Text style={{textAlign:"center",fontSize:20,fontWeight:"700",marginLeft:30}}>Lives in {profile.city}</Text>
    <TouchableOpacity onPress={()=>{setShow(true)}}>
<Entypo name="pencil" size={24} color="blue" />
</TouchableOpacity>
  </View>)
}



{
  show?
  (<View  style={{display:"flex",flexDirection:"row",marginTop:10,}}>
    <Text style={{textAlign:"center",fontSize:20,fontWeight:"700",marginLeft:30}}>From {profile.from}</Text>
    <Input
  placeholder='City'
  style={{ fontSize:15 ,width:30}}
  value={from}
  onChangeText={(text)=>{
    setFrom(text)
  }}
/>
  </View>):
  (<View  style={{display:"flex",flexDirection:"row",marginTop:20,}}>
    <Text style={{textAlign:"center",fontSize:20,fontWeight:"700",marginLeft:30}}>From {profile.from}</Text>
    <TouchableOpacity onPress={()=>{setShow(true)}}>
<Entypo name="pencil" size={24} color="blue" />
</TouchableOpacity>
  </View>)
}

<View  style={{width:75,marginLeft:225}}>
<Button title="Save" buttonStyle={{backgroundColor:'#FF8080',width:40}} onPress={save} />
</View>

        </View>
    )
}



export default CartScreen
