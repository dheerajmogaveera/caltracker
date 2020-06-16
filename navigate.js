import React from "react"
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import SigninForm from "./UserSign"
import DisplayPage from "./Display"
import Display from "./DisplayImage"

const NavigationMenu=()=>{
const Stack=createStackNavigator();
return(
<NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="UserSignIn" component={SigninForm}/>
        <Stack.Screen name="Profile" component={DisplayPage}/>
        <Stack.Screen name="Images" component={Display}/>
    </Stack.Navigator>

</NavigationContainer>
)
}

export default NavigationMenu;
  


 