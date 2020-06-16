import {createStore} from "redux"

const inputIntake=async (state,action)=>{
    if(action.type=="Fetch")
  {
    const response=await fetch("https://dheerajreduxtestapp.firebaseio.com/ImageStore.json")
     const res =await response.json()
     return res
  }
    else{
        
        fetch("https://dheerajreduxtestapp.firebaseio.com/ImageStore.json",
         
        {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({
            imageuri: action.imageurl
           })
         }
   
        )
    
    }

}
const ImageStore=createStore(inputIntake);

export default ImageStore;