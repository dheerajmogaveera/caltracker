import React from "react"
import {Text,View, Image, Button} from "react-native"
import ImageStore from "./ImageStoreRedux"
 
const action={
    type:"Fetch"
}
const res=ImageStore.dispatch(action)

const Display=()=>{
    
    return <View>
       <Text>Images</Text>
       <Button title="check console" onPress={()=>{
           console.log(res)
       }}/>
    </View>
}
export default Display