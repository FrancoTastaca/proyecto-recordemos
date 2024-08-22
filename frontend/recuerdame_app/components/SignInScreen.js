import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";

function SignInScreen({ navigation }) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#CECAE8',
        justifyContent: 'center',
        paddingStart: 20,
        }}
      >
        <Text style={{
          fontSize: 70,
          color: '#624D8A',
          fontWeight: 'bold',
          marginTop: 20,
          marginBottom: 50,
          }}
        >¡Hola, de nuevo!</Text>
        <Text style={{
          fontSize: 26,
          color: 'black',
          }}
        >Inicia sesión</Text>
        <View style={{
          borderWidth: 2,
          borderColor: '#624D8A',
          width: '94%',
          height: 60,
          paddingStart: 30, //Desde cuándo empieza el texto
          marginTop: 20,
          borderRadius: 20,
          backgroundColor: '#fff',
          fontSize: 16,
          justifyContent: "center",
          }}
        >
          <TextInput
            placeholder="jdoe@gmail.com"
          />
        </View>
        <View style={{
          borderWidth: 2,
          borderColor: '#624D8A',
          width: '94%',
          height: 60,
          paddingStart: 30, //Desde cuándo empieza el texto
          marginTop: 20,
          borderRadius: 20,
          backgroundColor: '#fff',
          fontSize: 16,
          justifyContent: "center",
          }}
        >
          <TextInput
            placeholder="Aquí va tu contraseña"
          />
        </View>
        <View style={{
            paddingHorizontal: 20,
            paddingVertical: 30,
            alignItems: 'center',
          }}>
            <TouchableOpacity 
              onPress={ () => navigation.navigate('ProfileCuidador')}
              style={{
                backgroundColor: '#624D8A',
                paddingVertical: 15,
                paddingHorizontal: 20,
                width: '86%',
                borderRadius: 8,
                marginBottom: 14,
                marginTop: 20,
              }}>
              <Text style={{
                color: '#f1eff8',
                fontSize: 20,
                textAlign: 'center',
              }}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={ () => navigation.navigate('RegisterCuidador')}
              style={{
                backgroundColor: '#624D8A',
                paddingVertical: 15,
                paddingHorizontal: 20,
                width: '86%',
                borderRadius: 8,
                marginTop: 10,
              }}
            >
              <Text style={{
                color: '#f1eff8',
                fontSize: 20,
                textAlign: 'center',
              }}>Registrarme</Text>
            </TouchableOpacity>
          </View>
        <StatusBar style="auto" />
      </View>
    );
}

export default SignInScreen;