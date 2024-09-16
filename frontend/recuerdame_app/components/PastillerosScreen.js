import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Alarmas from './Alarmas' 

function PastillerosScreen({route}) {
  const { role } = route.params;
  const roles = {
    cuidador: 'cuidador',
    paciente: 'paciente'
  };
    return (
      <View style={styles.profileContainer}>
        <View style={styles.listWrapper}>
            <View style={styles.listItems}>
                <Alarmas text={'Alarma 1'} role={role} />
                <Alarmas text={'Alarma 2'} role={role} />
                <Alarmas text={'Alarma 3'} role={role} />
            </View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1, 
    backgroundColor: '#CECAE8', 
    alignItems: 'center'
  },
  listWrapper: {
    paddingTop: 20,
    width: '100%',
    paddingHorizontal: 10
  },
  listItems: {
    marginTop: 20
  }
})

export default PastillerosScreen;