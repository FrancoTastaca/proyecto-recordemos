import React, { useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
const { height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const navigation = useNavigation();
  const roles = {
    cuidador: 'Cuidador',
    paciente: 'Paciente'
  };

  const handleRoleSelection = (role) => {
    navigation.navigate('SignIn', { role })
  }

  const [role, setRole] = useState(roles.paciente);
  return (
    <SafeAreaView style={styles.homeContainer}>
      <View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.titleDescription}>RECUERDAME</Text>
          <ImageBackground
            style={{
              height: height / 2.5,
            }}
            resizeMode="contain"
            source={require("../assets/Home.png")}
          />
          <Text style={styles.subtitleDescription}>Seleccione el perfil</Text>
        </View>
        <View style={styles.btnsHomeContainer}>
          <TouchableOpacity
            onPress={() => handleRoleSelection(roles.cuidador)}
            style={styles.touchsHome}>
            <Text style={styles.textsBtnsHome}>Soy cuidador</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleRoleSelection(roles.paciente)}
            style={styles.touchsHome}>
            <Text style={styles.textsBtnsHome}>Soy paciente</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#CECAE8'
  },
  descriptionContainer: {
    paddingHorizontal: 40,
    paddingTop: 110
  },
  titleDescription: {
    fontSize: 35,
    color: '#392C52',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitleDescription: {
    fontSize: 24,
    color: '#33294c',
    textAlign: 'center',
    marginTop: 20
  },
  btnsHomeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center'
  },
  touchsHome: {
    backgroundColor: '#624D8A',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '86%',
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10
  },
  textsBtnsHome: {
    color: '#f1eff8',
    fontSize: 20,
    textAlign: 'center'
  }
})

export default HomeScreen;
