import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDropbox } from '@fortawesome/free-brands-svg-icons';
import { faSuitcaseMedical } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import GenerarCodigoQR from "./GenerarQR";

function ProfileCuidadorScreen({ navigation, route }) {
  const { role, userId, Cuidador } = route.params;
  console.log('--- !!!!userId que llego a ProfileCuidadorScreen:', userId);
  console.log('--- !!!!role que llega a ProfileCuidadorScreen:', role);
  console.log('--- !!!!Cuidador que llega a ProfileCuidadorScreen:', Cuidador);
  // Constantes para el modal Medicamentos
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Constantes para el modal Código QR
  const [isModalVisibleQR, setIsModalVisibleQR] = useState(false);
  const handleModalQR = () => {
    setIsModalVisibleQR(!isModalVisibleQR);
  };

  return (
    <View style={styles.container}>
      <View style={styles.touchsWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Pastilleros', { role, userId, Cuidador })}
          style={styles.touchItem}
        >
          <FontAwesomeIcon icon={faDropbox} size={40} style={styles.iconoItem} />
          <Text style={styles.textTouch}>Pastilleros</Text>
        </TouchableOpacity>
        <TouchableOpacity 
         onPress={() => navigation.navigate('AgregarMedicamento', { role, userId, Cuidador })} style={styles.touchItem}>
          <FontAwesomeIcon icon={faSuitcaseMedical} size={40} style={styles.iconoItem} />
          <Text style={styles.textTouch}>Medicamentos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchItem}
          onPress={() => navigation.navigate('EndDay', { role, userId, Cuidador })}
        >
          <FontAwesomeIcon icon={faCalendarDays} size={40} style={styles.iconoItem} />
          <Text style={styles.textTouch}>Final del día</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchItem} onPress={handleModalQR}>
          <FontAwesomeIcon icon={faQrcode} size={40} style={styles.iconoItem} />
          <Text style={styles.textTouch}>Código QR Paciente</Text>
        </TouchableOpacity>
        {isModalVisibleQR && <GenerarCodigoQR isVisible={isModalVisibleQR} onPress={handleModalQR} />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CECAE8',
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchsWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  touchItem: {
    backgroundColor: '#624D8A',
    paddingVertical: 12,
    paddingHorizontal: 40,
    width: 400,
    height: 100,
    borderRadius: 8,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textTouch: {
    color: '#CECAE8',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center'
  },
  iconoItem: {
    alignSelf: 'left',
    color: '#CECAE8'
  },
  textTouch: {
    color: '#f1eff8',
    fontSize: 24,
    textAlign: 'center',
    flex: 1
  }
})

export default ProfileCuidadorScreen;
