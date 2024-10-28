import React from "react";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Alarmas = ({ marca, droga, estado, role, horario, dosis, fecha, color }) => {
  const route = useRoute(); // Utilizar la ruta de las pantallas
  const isEndDayScreen = route.name === 'EndDay';
  const stateColour = estado === 'Tomada' ? '#76F36D' : '#FEC1BB';

  const roles = {
    cuidador: 'Cuidador',
    paciente: 'Paciente'
  };

  return (
    <View style={styles.itemsContainer}>
      <View style={styles.itemLeft}>
        <ImageBackground source={require('../assets/Configurar.png')} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={[styles.itemText, { fontWeight: 'bold' }]}>{horario}hs</Text>
          <Text style={styles.itemText} numberOfLines={2} ellipsizeMode="tail">{droga}</Text>
          <Text style={styles.itemText} numberOfLines={2} ellipsizeMode="tail">{marca}</Text>
          <Text style={styles.itemText}>{dosis}mg</Text>
        </View>
      </View>
      {isEndDayScreen &&
        <View style={styles.stateContainer}>
          <Text style={[styles.itemState, { color: stateColour }]}>{estado}</Text>
        </View>
      }
      {!isEndDayScreen && role === roles.cuidador && (
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconWrapper}>
            <FontAwesomeIcon icon={faTrashCan} size={32} color={'#CECAE8'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <FontAwesomeIcon icon={faPenToSquare} size={32} color={'#CECAE8'} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemsContainer: {
    backgroundColor: '#624D8A',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Asegura que los elementos estén alineados verticalmente
    marginBottom: 22
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1 // Permite que el contenedor izquierdo ocupe el espacio disponible
  },
  image: {
    width: 140,
    height: 140,
    opacity: 0.4,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10, // Agrega un margen entre la imagen y el texto
    marginRight: 10 // Agrega un margen entre el texto y los íconos
  },
  itemText: {
    fontSize: 24,
    color: '#CECAE8',
    flexShrink: 1 // Permite que el texto se ajuste dentro del contenedor
  },
  itemState: {
    fontSize: 24,
    color: '#CECAE8',
    fontWeight: 'bold'
  },
  stateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 12
  },
  iconsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconWrapper: {
    marginTop: 17,
    marginBottom: 17,
    marginRight: 24
  }
})

export default Alarmas;