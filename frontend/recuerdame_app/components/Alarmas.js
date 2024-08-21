import React from "react";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Alarmas = (props) => {
  const route = useRoute(); //Utilizar la ruta de las pantallas
  const isEndDayScreen = route.name === 'EndDay';
  const stateColour = props.estado === 'Tomada' ? '#63cd5b' : '#eb867e';
    return (
      <View style={styles.itemsContainer}>
        <View style={styles.itemLeft}>
          <ImageBackground source={require('../assets/Configurar.png')} style={styles.image} />
          <View>
            <Text style={styles.itemText}>Fecha</Text>
            <Text style={styles.itemText}>Horario</Text>
            <Text style={styles.itemText}>{props.text}</Text>
            <Text style={styles.itemText}>Dosis</Text>
          </View>
        </View>
        {isEndDayScreen && 
          <View style={styles.stateContainer}>
            <Text style={[styles.itemState, {color: stateColour}]}>{props.estado}</Text>
          </View>
        }
        {!isEndDayScreen && (
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
    )
}

const styles = StyleSheet.create({
  itemsContainer: {
    backgroundColor: '#624D8A', 
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  image: {
    width: 140,
    height: 140,
    opacity: 0.4,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 24,
    color: '#CECAE8',
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