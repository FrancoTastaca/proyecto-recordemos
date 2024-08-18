import React, {useEffect, useState} from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./HomeScreen";

const WelcomeScreen=({navigation}) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async() => {
      try{
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if(hasLaunched===null){
          await AsyncStorage.setItem('hasLaunched','true')
          setIsFirstLaunch(true)
        }else{
          setIsFirstLaunch(false)
        }
      }catch(error){
      console.error('Error first launch:', error)
    }
  }
  checkFirstLaunch()
}, [])
  if(isFirstLaunch===null){
    return <ActivityIndicator size='large' color='#624D8A' />
  }
  return(
    <View style={{ flex: 1, backgroundColor: '#CECAE8', alignItems: 'center', justifyContent: 'center' }}>
      {isFirstLaunch ? <Carousel /> : <HomeScreen />}
    </View>
  )
}

    /*return (
      <View style={{ flex: 1, backgroundColor: '#CECAE8', alignItems: 'center', justifyContent: 'center' }}>
        <Carousel />
      </View>
    )*/


export default WelcomeScreen;