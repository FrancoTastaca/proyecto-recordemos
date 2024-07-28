import React from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
const { height } = Dimensions.get("window");

function HomeScreen({ navigation }) {
    return (
      <SafeAreaView>
        <View>
          <View
            style={{
              paddingHorizontal: 40,
              paddingTop: 100,
            }}
          >
            <Text
              style={{
                fontSize: 35,
                color: '#624D8A',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >RECUERDAME</Text>
            <ImageBackground
              style={{
                height: height / 2.5, 
              }}
              resizeMode="contain"
              source={require("../assets/Home.png")}
            />
            <Text
              style={{
                fontSize: 20,
                color: '#624D8A',
                textAlign: 'left',
                marginTop: 20,
              }}
            >Seleccione el perfil</Text>
          </View>
          <View style={{
            paddingHorizontal: 20,
            paddingVertical: 40,
            alignItems: 'center',
          }}>
            <TouchableOpacity 
              onPress={ () => navigation.navigate('SignIn')}
              style={{
                backgroundColor: '#624D8A',
                paddingVertical: 15,
                paddingHorizontal: 20,
                width: '86%',
                borderRadius: 8,
                marginBottom: 14,
              }}>
              <Text style={{
                color: '#f1eff8',
                fontSize: 20,
                textAlign: 'center',
              }}>Soy cuidador</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              backgroundColor: '#624D8A',
              paddingVertical: 15,
              paddingHorizontal: 20,
              width: '86%',
              borderRadius: 8,
            }}>
              <Text style={{
                color: '#f1eff8',
                fontSize: 20,
                textAlign: 'center',
              }}>Soy paciente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
}

export default HomeScreen;