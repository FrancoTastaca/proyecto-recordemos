import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './components/WelcomeScreen';
import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';
import SignInScreen from './components/SignInScreen';
import RegisterCuidadorScreen from './components/RegisterCuidadorScreen'

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome" //Nombre que adoptan las pantallas
          component={WelcomeScreen}
          options={{ headerShown: false }}
        /> 
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="RegisterCuidador"
          component={RegisterCuidadorScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerBackTitle: 'Custom Back',
            headerBackTitleStyle: { fontSize: 30 },
            /*headerRight: () => ( //Boton a la derecha que dice info
              <Button
                onPress={() => navigation.popToTop('Home')}
                title="Omitir"
                color="#abdcfd"
              />
            ),*/ 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
