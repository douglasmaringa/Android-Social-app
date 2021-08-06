import React,{useState,useEffect} from 'react'
import { View, Text,Button } from 'react-native'
import { Image,Input} from 'react-native-elements';
import axios from "axios"


const Register = ({navigation}) => {
    const[username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    const register = async()=>{
        try{
        const data = await axios.post("http://192.168.100.5:8800/api/auth/register",{
            username:username,
            email:email,
            password:password,
            
        })
       navigation.navigate("login")
    }catch(err){
        console.log(err)
    }
    }

    return (
        <View>

<Input
  placeholder='Username'
  style={{ marginTop:25,fontSize:15}}
  value={username}
  onChangeText={(text)=>{
    setUsername(text)
  }}
/>
            
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
<Button title="Register" onPress={register}/>
        </View>
    )
}

export default Register
