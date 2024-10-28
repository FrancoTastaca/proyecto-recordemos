import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, Alert, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCheckbox from './CustomCheckbox';
import { signIn } from '../shared/auth';
import api from "../shared/axiosConfig";
import { registerForPushNotificationsAsync, setupNotificationListeners } from '../shared/notificationService';
import { useCameraPermissions } from "expo-camera";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Definir roles
const roles = {
  cuidador: 'Cuidador',
  paciente: 'Paciente'
};

function SignInScreen({ navigation }) {
  const route = useRoute();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [role, setRole] = useState(route.params?.role || 'Paciente');
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = permission?.granted;
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

  useEffect(() => {
    console.log('useEffect: route.params?.role', route.params?.role);
    const removeListeners = setupNotificationListeners(setNotification);

    return () => {
      removeListeners();
    };
  }, [route.params?.role]);

  const handleSignIn = async () => {
    console.log('handleSignIn: start');

    // Validar que los campos de correo electrónico y contraseña no estén vacíos
    if (!email || !password) {
      Alert.alert("Error de inicio de sesión", "Por favor, ingresa tu correo electrónico y contraseña.");
      return;
    }

    try {
      const { id, token } = await signIn(email, password);
      console.log('handleSignIn: signIn success', id);

      // Guardar credenciales si "Recordar credenciales" está activado
      if (rememberMe) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('userId', id);
        await AsyncStorage.setItem('token', token);
      } else {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
        await AsyncStorage.removeItem('userId');
      }

      // Registrar el push token después de iniciar sesión
      const pushToken = await registerForPushNotificationsAsync(id);
      console.log('handleSignIn: updatePushToken success', pushToken);

      if (role === 'Cuidador') {
        console.log('--- Entre a cuidador en SignInScreen');
        // Capturamos informacion cuidador-persona
        const Cuidador = await api.get(`/cuidador/`, { headers: { Authorization: `Bearer ${token}` } });
        console.log('handleSignIn: navigate to ProfileCuidador');
        console.log('--- Cuidador.data:', Cuidador.data);
        console.log('--- Role:', role);
        console.log('--- UserId:', id);
        navigation.navigate('ProfileCuidador', { role, userId: id, Cuidador: Cuidador.data });
      } else if (role === 'Paciente') {
        console.log('--- Entre Como  paciente en SignInScreen');
        console.log('handleSignIn: navigate to Pastilleros');
        const Paciente = await api.get(`/paciente/`, { headers: { Authorization: `Bearer ${token}` } });
        console.log('handleSignIn: navigate to ProfilePaciente');
        console.log('--- Paciente.data:', Paciente.data);
        console.log('--- Role:', role);
        console.log('--- UserId:', id);
        navigation.navigate('Pastilleros', { role, userId: id, Paciente: Paciente.data });
      }
    } catch (error) {
      console.error('handleSignIn: error', error);
      if (error.code === 'ECONNABORTED') {
        Alert.alert("Error de tiempo de espera", "La solicitud ha expirado. Por favor, inténtalo nuevamente.");
      } else if (error.response && error.response.status === 401) {
        Alert.alert("Error de inicio de sesión", "Token expirado o inválido. Por favor, inicia sesión nuevamente.");
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('token');
        setEmail('');
        setPassword('');
        setRememberMe(false);
      } else {
        Alert.alert("Error de inicio de sesión", "Por favor, verifica tus credenciales e inténtalo nuevamente.");
      }
    }
  };

  return (
    <View style={styles.signInContainer}>
      <Text style={styles.signInTitle}>¡Hola, de nuevo!</Text>
      <Text style={styles.signInSubtitle}>Inicia sesión</Text>
      <View style={styles.signInInputs}>
        <TextInput
          placeholder="Correo electrónico por ejemplo: jdoe@gmail.com "
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={[styles.signInInputs, { flexDirection: 'row', alignItems: 'center' }]}>
        <TextInput
          placeholder="Aquí va tu contraseña"
          value={password}
          secureTextEntry={!showPassword} // Controlar la visibilidad de la contraseña
          onChangeText={setPassword}
          style={{ flex: 1 }}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Icon name={showPassword ? "eye-off" : "eye"} size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.rememberMeContainer}>
        <CustomCheckbox
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
        <Text style={styles.rememberMeText}>Recordar credenciales</Text>
      </View>
      <View style={styles.touchsContainer}>
        {role === roles.cuidador && (
          <>
            <Pressable
              onPress={() => {
                console.log('Pressable: Iniciar sesión');
                handleSignIn();
              }}
              style={styles.touchItem}>
              <Text style={styles.touchItemText}>Iniciar sesión</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                console.log('Pressable: Registrarme (cuidador)');
                navigation.navigate('RegisterCuidador');
              }}
              style={styles.touchItem}>
              <Text style={styles.touchItemText}>Registrarme</Text>
            </Pressable>
          </>
        )}
        {role === roles.paciente && (
          <>
            <Pressable
              onPress={() => {
                console.log('Pressable: Iniciar sesión (paciente)');
                handleSignIn();
              }}
              style={styles.touchItem}>
              <Text style={styles.touchItemText}>Iniciar sesión</Text>
            </Pressable>
            {!isPermissionGranted && (
              <Pressable
                onPress={() => {
                  console.log('Pressable: Permiso de cámara');
                  requestPermission();
                }}
                style={styles.touchItem}>
                <Text style={styles.touchItemText}>Permiso de cámara</Text>
              </Pressable>
            )}
            {isPermissionGranted && (
              <Pressable
                disabled={!isPermissionGranted}
                onPress={() => {
                  console.log('Pressable: Escanear');
                  navigation.navigate('ScanQr', { role });
                }}
                style={styles.touchItem}>
                <Text
                  style={[
                    styles.touchItemText,
                    { opacity: !isPermissionGranted ? 0.5 : 1 },
                  ]}
                >
                  Escanear
                </Text>
              </Pressable>
            )}
          </>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  signInContainer: {
    flex: 1,
    backgroundColor: '#CECAE8',
    justifyContent: 'center',
    paddingStart: 20
  },
  signInTitle: {
    fontSize: 70,
    color: '#392C52',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 50
  },
  signInSubtitle: {
    fontSize: 30,
    color: 'black'
  },
  signInInputs: {
    borderWidth: 2,
    borderColor: '#624D8A',
    width: '94%',
    height: 60,
    paddingStart: 30,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    justifyContent: "center"
  },
  eyeIcon: {
    marginRight: 10, // Agregar margen a la derecha del ícono
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  rememberMeText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black'
  },
  touchsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  touchItem: {
    backgroundColor: '#624D8A',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '86%',
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10
  },
  touchItemText: {
    color: '#f1eff8',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default SignInScreen;