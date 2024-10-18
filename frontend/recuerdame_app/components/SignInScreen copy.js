import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable, Alert } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useCameraPermissions } from "expo-camera";
import { signIn } from '../shared/auth';  // Importamos la función signIn

function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const route = useRoute();
  const roles = {
    cuidador: 'cuidador',
    paciente: 'paciente'
  };
  const [role, setRole] = useState(roles.paciente);

  useEffect(() => {
    if (route.params?.role) {
      setRole(route.params.role);
    }
  }, [route.params?.role]);

  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  const handleSignIn = async () => {
    try {
      const data = await signIn(email, password); // Intentamos iniciar sesión
      if (role === roles.cuidador) {
        navigation.navigate('ProfileCuidador', { role });
      } else if (role === roles.paciente) {
        navigation.navigate('Pastilleros', { role });
      }
    } catch (error) {
      // Mostrar alerta en caso de error
      Alert.alert("Error de inicio de sesión", "Por favor, verifica tus credenciales e inténtalo nuevamente.");
      console.error('Error en el inicio de sesión:', error);
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
            <TouchableOpacity
              onPress={handleSignIn}
              style={styles.touchItem}>
              <Text style={styles.touchItemText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterCuidador')}
              style={styles.touchItem}>
              <Text style={styles.touchItemText}>Registrarme</Text>
            </TouchableOpacity>
          </>
        )}
        {role === roles.paciente && (
          <>
            <TouchableOpacity
              onPress={handleSignIn}
              style={styles.touchItem}>
              <Text style={styles.touchItemText}>Iniciar sesión</Text>
            </TouchableOpacity>
            {!isPermissionGranted && (
              <TouchableOpacity onPress={requestPermission} style={styles.touchItem}>
                <Text style={styles.touchItemText}>Permiso de cámara</Text>
              </TouchableOpacity>
            )}
            {isPermissionGranted && (
              <Pressable
                disabled={!isPermissionGranted}
                onPress={() => navigation.navigate('ScanQr', { role })}
                asChild
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
