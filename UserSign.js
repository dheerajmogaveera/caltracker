import React, { useState,useEffect } from "react"
import {View,Text,TextInput, ImageBackground,StyleSheet, Dimensions, Button,Alert} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from "expo-media-library"
import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
const SigninForm=(props)=>
{    

   const [error,seterror]=useState("null")
    const {navigation}=props
    const signup=async (state=0,action)=>{
     
      if(action.type==="SIGNUP")
      {
       
       const res=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKAAa4BLT91j343UmTmOA1jekL4tMIexE",
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email:action.email,
              password:action.password,
              returnSecureToken:true
            })
          }
        )
        
    }
    else
    {
     
      const res=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKAAa4BLT91j343UmTmOA1jekL4tMIexE",
      {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email:action.email,
            password:action.password,
            returnSecureToken:true
          })
        }
      )
      const response=await res.json();
      if(!res.ok)
      {
      seterror(response.error.message)
      if(res.error)
      {
        Alert.alert("Something Went Wrong",error,[{text:"OK"}])
      }
      }
      else
      navigation.navigate('Profile')
    
      
      }
      
  }
    

 
    
    const sform=createStore(signup,applyMiddleware(thunk))
    
    const widthvalue=parseInt(Dimensions.get('window')/2)
    const [user,setuser]=useState("")
    const [pass,setpassword]=useState("")
    const [email,setemail]=useState("")
    const [userpass,setuserpass]=useState("")
    const loginuser=()=>{
     
      
    }
    const signupuser=()=>{
     
     
    }
    return(
         

                <View style={styles.ViewParent}> 
                    <View style={styles.input}>
                    <TextInput placeholder="enter email id" value={user} onChangeText={(text)=>{setuser(text)}}/>
                     </View>
                     <View style={styles.input}>
                    <TextInput placeholder="enter password" textContentType="password" value={pass} onChangeText ={(text)=>{setpassword(text)}}/>
                     </View>
                    <View style={styles.Viewbutton}>
                       <View>
                       <Button color="purple" title="login" onPress={()=>{
                         setemail(user)
                         setuserpass(pass)
                          const action={
                            type:"LOGIN",
                            email:user,
                            password:pass
                        }
                        sform.dispatch(action)
                      
                       }}/>
                    </View>
                    </View>
                    <View style={styles.Viewbutton}>
                      <Button color="purple" title="signup" onPress={()=>{
                         setemail(user)
                         setuserpass(pass)
                          const action={
                            type:"SIGNUP",
                            email:user,
                            password:pass}}}/>
                    
                    </View>
                                 
                  
                   {/*<View style={{width:70}}>
                  <Icon.Button name="ios-person" color="blue" backgroundColor="white" onPress={()=>navigation.navigate("Profile")} style={{width:100}} size={60}/>
                  </View>*/}
                    
                                 
                 
                                   
                             
            </View>
        
    )
}
const styles=StyleSheet.create(
    {

       
        ViewParent:{
            flex:1,
            alignContent:"center",
           justifyContent:"center",
           
        },
       input:{
           
            alignSelf:"center",
            
            marginBottom:20
       },
        Viewbutton:{
               
               alignSelf:"center",
               width:80,
               marginBottom:30


        }
    }
)
export default SigninForm;