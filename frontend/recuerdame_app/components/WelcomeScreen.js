import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./HomeScreen";
import { getRole, signIn } from '../shared/auth'; // Importar las funciones getRole y signIn

const WelcomeScreen = ({ navigation }) => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          await AsyncStorage.setItem('hasLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }

        // Verificar si hay credenciales guardadas
        const savedEmail = await AsyncStorage.getItem('email');
        const savedPassword = await AsyncStorage.getItem('password');
        const savedUserId = await AsyncStorage.getItem('userId');
        if (savedEmail && savedPassword && savedUserId) {
          const { id } = await signIn(savedEmail, savedPassword);
          if (id === savedUserId) {
            // Obtener el rol del usuario logueado
            const role = await getRole(savedUserId);
            // Navegar a la vista correspondiente
            if (role === 'Cuidador') {
              navigation.navigate('ProfileCuidador', { role });
            } else if (role === 'Paciente') {
              navigation.navigate('Pastilleros', { role });
            }
          }
        }
      } catch (error) {
        console.error('Error first launch:', error);
      }
    };
    checkFirstLaunch();
  }, [navigation]);

  if (isFirstLaunch === null) {
    return <ActivityIndicator size='large' color='#624D8A' />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#CECAE8', alignItems: 'center', justifyContent: 'center' }}>
      {isFirstLaunch ? <Carousel /> : <HomeScreen />}
    </View>
  );
};

export default WelcomeScreen;