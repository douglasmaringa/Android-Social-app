import * as React from 'react';
import { Text, View,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from "./screens/HomeScreen"
import CategoriesScreen from "./screens/CategoryScreen"
import SingleScreen from "./screens/SingleScreen"
import CartScreen from "./screens/CartScreen"
import Login from "./screens/Login"
import Register from "./screens/Register"
import store  from './app/store';
import Splash from "./screens/Splash"
import { Provider } from 'react-redux';
import { ActionSheet, Root } from 'native-base'
import { Ionicons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//you first create stacks and put the screens for each stack. 
function HomeStack (){
//if you wanna add more routes to home page just add more screens to the home stack.
  return(
    <Stack.Navigator initialRouteName="splash">
      {/*Initial is so that the all screens arent displayed at once it displays a single screen*/}
      <Stack.Screen name="login" component={Login}/>
      <Stack.Screen name="splash" component={Splash}/>
      <Stack.Screen name="register" component={Register}/>
    <Stack.Screen name="Home" component={HomeScreen}/>
    <Stack.Screen name="single" component={SingleScreen}/>
    </Stack.Navigator>
  )
}
function CategoryStack (){
  return(
    <Stack.Navigator initialRouteName="Category">
    <Stack.Screen name="Category" component={CategoriesScreen}/>
    </Stack.Navigator>
  )
}
function CartStack (){
  return(
    <Stack.Navigator initialRouteName="Cart">
    <Stack.Screen name="Profile" component={CartScreen}/>
    </Stack.Navigator>
  )
}

//My tabs is the bottom nav bar it will hold all the stacks 
//The home tab will hold the homestack so if youre in the categories tab you can access the home stack.
function MyTabs() {
  return (
    
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeStack} 
       options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}/>
       <Tab.Screen name="Friends" component={CategoryStack} 
      options={{
        tabBarLabel: 'Friends',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-add-outline" size={size} color={color} />
        ),
      }}/>
       
      <Tab.Screen name="Profile" component={CartStack} 
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" size={size} color={color} />
        ),
      }}/>
    </Tab.Navigator>
    
  );
}


//here we will now export our nav bar which has a stack inside it.
//sometimes it will also has a drawer.
export default function App() {
  return (
    
    <NavigationContainer>
      
       <Provider store={store}>
         <Root>
       <MyTabs />
       </Root>
      </Provider>
     
    </NavigationContainer>
    
  );
}