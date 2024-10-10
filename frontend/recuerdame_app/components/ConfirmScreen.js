import React from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, Image } from "react-native";

function ConfirmScreen({ navigation }) {
    return (
      <SafeAreaView style={styles.homeContainer}>
        <View style={styles.confirmContainer}>
          <Text style={styles.titleDescription}>¡Felicitaciones!</Text>
          <Text style={styles.subtitle}>¡Lo hiciste genial!</Text>
        </View>
        <Image source={require('../assets/Felicitaciones.png')} style={styles.imgAlarm} resizeMode='contain' />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1, 
    backgroundColor: '#CECAE8',
    justifyContent: 'center'
  },
  confirmContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleDescription: {
    fontSize: 35,
    color: '#4c8435',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 30,
    color: '#624D8A',
    marginBottom: 20
  },
  imgAlarm: {
    width: '100',
    height: 250
  },
})

export default ConfirmScreen;