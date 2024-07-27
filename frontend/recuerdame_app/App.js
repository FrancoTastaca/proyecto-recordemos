import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './components/WelcomeScreen';
import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
        /> 
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Overview', //Nombre visual de la pantalla
            //headerShown: false, Elimina el encabezado
            headerRight: () => ( //Boton a la derecha que dice info
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#abdcfd"
              />
            ), 
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
