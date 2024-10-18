import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useCameraPermissions } from "expo-camera";
import { signIn } from '../shared/auth';  // Importamos la función signIn
import { registerForPushNotificationsAsync, setupNotificationListeners } from '../shared/notificationService'; // Importar el servicio de notificaciones

function SignInScreen({ navigation }) {
  const route = useRoute();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(route.params?.role || 'paciente');
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    console.log('useEffect: route.params?.role', route.params?.role);
    registerForPushNotificationsAsync()
      .then(token => console.log('Push token:', token))
      .catch(error => console.error('Error registering for push notifications:', error));

    const removeListeners = setupNotificationListeners(setNotification);

    return () => {
      removeListeners();
    };
  }, [route.params?.role]);

  const handleSignIn = async () => {
    console.log('handleSignIn: start');
    try {
      const response = await signIn(email, password);
      console.log('handleSignIn: signIn success', response);
      await registerForPushNotificationsAsync();
      console.log('handleSignIn: updatePushToken success');

      if (role === 'cuidador') {
        console.log('handleSignIn: navigate to ProfileCuidador');
        navigation.navigate('ProfileCuidador', { role });
      } else if (role === 'paciente') {
        console.log('handleSignIn: navigate to Pastilleros');
        navigation.navigate('Pastilleros', { role });
      }
    } catch (error) {
      console.error('handleSignIn: error', error);
      if (error.code === 'ECONNABORTED') {
        Alert.alert("Error de tiempo de espera", "La solicitud ha expirado. Por favor, inténtalo nuevamente.");
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
          placeholder="jdoe@gmail.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.signInInputs}>
        <TextInput
          placeholder="Aquí va tu contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.touchsContainer}>
        {role === roles.cuidador && (
          <>
            <Pressable
              onPress={() => {
                console.log('Pressable: Iniciar sesión (cuidador)');
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
    color: '#624D8A',
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