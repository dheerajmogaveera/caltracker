import React, { useState } from "react"
import {View,Text,ImageBackground,StyleSheet, Dimensions, Button, ScrollView, TouchableOpacity, TouchableHighlight, Image} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from "expo-media-library"
import ProgressCircle from "react-native-progress-circle"
import  StorageActivity from "./ImageStoreRedux"
import ImageStore from "./ImageStoreRedux"
import axios from "axios"
import FormData from "form-data"
const DisplayPage=(props)=>
{    
  
    const {navigation}=props
    const [uri,seturi]=useState('null')
    const percentage=66
     async function OpenCamera(){
        const {uri}= await ImagePicker.launchCameraAsync({
            allowsEditing:true,
        })
        let localuri={uri}.uri
        let filename=localuri.split('/').pop();
      console.log("file:"+filename)
       seturi(uri)
       if(uri)
       {
        await MediaLibrary.saveToLibraryAsync(uri)
        const type="Store"
        const action={
            type:type,
            imageurl:filename
        };
        ImageStore.dispatch(action)
        try{
           /* const body = new FormData();
            body.append("image",filename)
            //const img={
             //   image:"idli.jpg"
            //}
           console.log(body)
            const response=await fetch("https://cal-track-api.herokuapp.com/predict",{
              body:body,
              method: "POST"
            })

            const res=await response.json()
           console.log(res)*/
           //const image = new FormData();
            //image.append("image",uri)
            var str="Phone/DCIM/"+localuri;
            str=str.replace("file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540dheerajmogaveera%252FfoodCalTracker/ImagePicker/","")
            console.log(str)
            const image=new FormData()
            image.append("image",str)
              axios.post("https://cal-track-api.herokuapp.com/predict",image).then(response=>{
                  console.log(response.data)
              }).catch(error => console.log(error));
             
            
            console.log(uri)
            /*new Promise((resolve,reject) => {

                var data = new FormData();
              
                data.append('image',uri);
               
                    return axios.post("http://192.168.0.101:5000/predict",data).then(response =>     
                        {resolve(response)})
                    .catch(error => 
                        {reject(error)});
                });*/

        }
        catch(e)
        {
            console.log(e)
           
        }
       
       }
      
      

      }
     
     return(
         
        <View style={styles.ParentContainer}>
            <Button title="images" onPress={()=>{
                navigation.navigate("Images")
            }}/>
                
                <ProgressCircle
                
            percent={30}
            radius={100}
            borderWidth={8}
            color="#3399FF"
            shadowColor="#999"
            bgColor="green"
        >
            <Text style={{ fontSize: 18 }}>{'30%'}</Text>
        </ProgressCircle>
               

                <View style={styles.ViewParent}> 
            
                    <ScrollView>

                         <View style={styles.ViewChild}>
                            
                             <Text>Breakfast</Text>

                             <Icon.Button onPress={()=>{alert("Breakfast")}} color="blue" name="ios-add" backgroundColor="grey" size={50}/>


                         </View>
                      {/*<Image source={{uri:uri}}  style={{width: 400, height: 400}} />*/}
                         <View style={styles.ViewChild}>

                             <Text>Lunch</Text>
              
                             <Icon.Button onPress={()=>{alert("Lunch")}} color="blue" name="ios-add" backgroundColor="grey" size={50}/>

              
                        </View>

                        <View style={styles.ViewChild}>

                             <Text>Dinner</Text>

                             <Icon.Button onPress={()=>{alert("Dinner")}} color="blue" name="ios-add" backgroundColor="grey" size={50}/>

                        </View>

                     </ScrollView>

                    
                    <View style={{width:100,height:75,marginLeft:150}}>            
                    <Icon.Button onPress={OpenCamera} name="ios-add-circle" color="orange" backgroundColor="white" size={70}/>
                    </View>      
            </View>
        </View>
    )
}
const styles=StyleSheet.create(
    {

        ParentContainer:{
              
            flex:1,
            alignContent:"center",
            justifyContent:"center",
            flexDirection:"column",
            backgroundColor:"green",
        },
        ImageBackground:{
            alignContent:"center",
            justifyContent:"center",
            flexDirection:"column",
            backgroundColor:"green",
            height:Dimensions.get('window').height/3
        },
        ViewParent:{
            flex:1,
            alignContent:"center",
            justifyContent:"center",
            flexDirection:"column",
            backgroundColor:"white",
            width:Dimensions.get('window').width,
            height:Dimensions.get('window').height
        },
        ViewChild:{
            flex:1,
            width:Dimensions.get('window').width/1.2,
            height:Dimensions.get('window').height/6,
            margin:20,
            justifyContent:"center",
              backgroundColor:"grey"
        },
        ViewIndicator:{
             flex:1,
             justifyContent:"center",
             alignContent:"center"
        }
        ,
        ViewButton:{
            width:Dimensions.get('window')/10
        }
    }
)
export default DisplayPage;