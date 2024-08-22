import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

function SignInScreen({ navigation }) {
    return (
      <View style={styles.signInContainer}>
        <Text style={styles.signInTitle}>¡Hola, de nuevo!</Text>
        <Text style={styles.signInSubtitle}>Inicia sesión</Text>
        <View style={styles.signInInputs}>
          <TextInput
            placeholder="jdoe@gmail.com"
          />
        </View>
        <View style={styles.signInInputs}>
          <TextInput
            placeholder="Aquí va tu contraseña"
          />
        </View>
        <View style={styles.touchsContainer}>
            <TouchableOpacity 
              onPress={ () => navigation.navigate('ProfileCuidador')}
              style={styles.touchItem}>
              <Text style={styles.touchItemText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={ () => navigation.navigate('RegisterCuidador')}
              style={styles.touchItem}>
              <Text style={styles.touchItemText}>Registrarme</Text>
            </TouchableOpacity>
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
  signInTitle:{
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
    paddingStart: 30, //Desde cuándo empieza el texto
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
})

export default SignInScreen;