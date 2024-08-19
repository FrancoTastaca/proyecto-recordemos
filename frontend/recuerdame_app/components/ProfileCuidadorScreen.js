import React, {useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faDropbox } from '@fortawesome/free-brands-svg-icons';
import { faSuitcaseMedical } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import AgregarMedicamento from "./AgregarMedicamento";

function ProfileCuidadorScreen({ navigation }) {
   /* Constantes para el modal Medicamentos */
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    return (
      <View style={styles.container}>
        <View style={styles.touchsWrapper}>
          <TouchableOpacity onPress={ () => navigation.navigate('Pastilleros')}
            style={styles.touchItem}>
          <FontAwesomeIcon icon={faDropbox} size={40} style={styles.iconoItem} />  
            <Text style={styles.textTouch}>Pastilleros</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchItem} onPress={handleModal}>
            <FontAwesomeIcon icon={faSuitcaseMedical} size={40} style={styles.iconoItem} />  
              <Text style={styles.textTouch}>Medicamentos</Text>
          </TouchableOpacity>
          {isModalVisible && <AgregarMedicamento isVisible = {isModalVisible} onPress={handleModal} />}
          <TouchableOpacity style={styles.touchItem}>
            <FontAwesomeIcon icon={faCalendarDays} size={40} style={styles.iconoItem} />
            <Text style={styles.textTouch}>Final del día</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchItem}>
            <FontAwesomeIcon icon={faQrcode} size={40} style={styles.iconoItem} />
            <Text style={styles.textTouch}>Código QR Paciente</Text>
          </TouchableOpacity>
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
  iconoItem: {
    alignSelf: 'left',
    color: '#CECAE8'
  },   
  textTouch:{
    color: '#f1eff8',
    fontSize: 24,
    textAlign: 'center',
    flex: 1
  }
})

export default ProfileCuidadorScreen;