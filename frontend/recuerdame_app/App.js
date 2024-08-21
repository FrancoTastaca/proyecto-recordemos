import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './components/WelcomeScreen';
import CarouselScreen from './components/CarouselScreen';
import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';
import SignInScreen from './components/SignInScreen';
import RegisterCuidadorScreen from './components/RegisterCuidadorScreen';
import RegisterPacienteScreen from './components/RegisterPacienteScreen';
import ProfileCuidadorScreen from './components/ProfileCuidadorScreen';
import Header from "./shared/Header";
import PastillerosScreen from './components/PastillerosScreen';
import EndDayScreen from './components/EndDayScreen';

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
          name="Carousel" 
          component={CarouselScreen}
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
          name="RegisterPaciente"
          component={RegisterPacienteScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="ProfileCuidador"
          component={ProfileCuidadorScreen}
          options={{ 
            headerTitle: () => <Header screen={'ProfileCuidador'} />, 
            headerTintColor: '#CECAE8',
            headerStyle: {
              backgroundColor: '#624D8A',
            },
            headerBackVisible: false
          }} 
        />
        <Stack.Screen
          name="Pastilleros"
          component={PastillerosScreen}
          options={{ 
            headerTitle: () => <Header screen={'Pastilleros'} />, 
            headerTintColor: '#CECAE8',
            headerStyle: {
              backgroundColor: '#624D8A',
            },
            headerBackVisible: false
          }} 
        />
        <Stack.Screen
          name="EndDay"
          component={EndDayScreen}
          options={{ 
            headerTitle: () => <Header screen={'EndDay'} />, 
            headerTintColor: '#CECAE8',
            headerStyle: {
              backgroundColor: '#624D8A',
            },
            headerBackVisible: false
          }} 
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
