import React, {useState} from "react";
import { View, Text, Button, StyleSheet, SafeAreaView, Image, Switch, TouchableOpacity } from "react-native";
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

function ConfirmScreen({ navigation }) {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [currentImage, setCurrentImage] = useState('pastillero');

  const toggleSwitch = () => {
    setIsConfirmed(previousState => !previousState)
  }

  const handleNextImage = () => {
    if (currentImage === 'pastillero') {
      setCurrentImage('pastilla');
    }
  };

  const handlePreviousImage = () => {
    if (currentImage === 'pastilla') {
      setCurrentImage('pastillero');
    }
  };

    return (
      <SafeAreaView style={styles.homeContainer}>
        {!isConfirmed ? (
          <>
          <View style={styles.confirmContainer}>
            <Text style={styles.titleConfirm}>Acordate que debés tomar del pastillero ROJO el medicamento Donezepil</Text>
          </View>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={handlePreviousImage} style={styles.buttonDirection}>
              {currentImage === 'pastilla' && <FontAwesomeIcon icon={faCircleArrowLeft} size={44} color='#33294c' />}
            </TouchableOpacity>
            <Image
              source={currentImage === 'pastillero' ? require('../assets/Pastillero.png') : require('../assets/Pastilla.png')}
              style={styles.imgAlarm}
              resizeMode='contain'
            />
            <TouchableOpacity onPress={handleNextImage} style={styles.buttonDirection}>
              {currentImage === 'pastillero' && <FontAwesomeIcon icon={faCircleArrowRight} size={44} color='#33294c' />}
            </TouchableOpacity>
          </View>
            <View style={styles.switchContainer}>
              <Text style={styles.textHelp}>Desliza para confirmar que tomaste la medicación</Text>
              <Switch trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isConfirmed ? "#f5dd4b" : "#f4f3f4"}
                onValueChange={toggleSwitch}
                value={isConfirmed} style={styles.switchConfirm} />
            </View>
          </>
        ):(
          <>
            <View style={styles.confirmContainer}>
              <Text style={styles.titleDescription}>¡Felicitaciones!</Text>
              <Text style={styles.subtitle}>¡Lo hiciste genial!</Text>
            </View>
            <Image source={require('../assets/Felicitaciones.png')} style={styles.imgAlarmCongratulations} resizeMode='contain' />
          </>
        )}
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
  titleConfirm: {
    fontSize: 24,
    color: '#624D8A',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20    
  },
  textHelp: {
    fontSize: 20,
    color: '#624D8A',
    marginBottom: 20,
    textAlign: 'center'
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  buttonDirection: {
    marginHorizontal: 50,
  },
  switchContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  switchConfirm: {
    transform: [{ scale: 2.4 }]
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
    width: 200,
    height: 250
  },
  imgAlarmCongratulations: {
    width: '100',
    height: 250
  }
})

export default ConfirmScreen;