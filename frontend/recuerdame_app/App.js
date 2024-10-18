// frontend/recuerdame_app/App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './components/WelcomeScreen';
import CarouselScreen from './components/CarouselScreen';
import HomeScreen from './components/HomeScreen';
import ConfirmScreen from './components/ConfirmScreen';
import SignInScreen from './components/SignInScreen';
import RegisterCuidadorScreen from './components/RegisterCuidadorScreen';
import RegisterPacienteScreen from './components/RegisterPacienteScreen';
import ProfileCuidadorScreen from './components/ProfileCuidadorScreen';
import Header from "./shared/Header";
import PastillerosScreen from './components/PastillerosScreen';
import EndDayScreen from './components/EndDayScreen';
import EscanearCodigoQr from './components/EscanearQR';
import { useEffect } from 'react';
import { setupNotificationListeners } from './shared/notificationService';

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    setupNotificationListeners();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
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
          options={{
            headerShown: true,
            headerTitle: '',
            headerBackVisible: true,
            headerTintColor: '#CECAE8',
            headerStyle: {
              backgroundColor: '#624D8A'
            }
          }}
        />
        <Stack.Screen
          name="RegisterCuidador"
          component={RegisterCuidadorScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerBackVisible: true,
            headerTintColor: '#CECAE8',
            headerStyle: {
              backgroundColor: '#624D8A'
            }
          }}
        />
        <Stack.Screen
          name="RegisterPaciente"
          component={RegisterPacienteScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerBackVisible: true,
            headerTintColor: '#CECAE8',
            headerStyle: {
              backgroundColor: '#624D8A'
            }
          }}
        />
        <Stack.Screen
          name="ProfileCuidador"
          component={ProfileCuidadorScreen}
          options={{
            headerTitle: () => <Header screen={'ProfileCuidador'} />,
            headerTintColor: '#CECAE8',
            headerStyle: {
              backgroundColor: '#624D8A'
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
          name="ScanQr"
          component={EscanearCodigoQr}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmScreen}
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#624D8A',
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;