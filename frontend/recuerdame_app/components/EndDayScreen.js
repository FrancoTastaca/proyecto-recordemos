import React from "react";
import { StyleSheet, View, Text, ScrollView} from "react-native";
import Alarmas from './Alarmas' 

const EndDay = () => {
    return (
      <ScrollView>
        <View style={styles.endDayContainer}>
          <Text style={styles.titleStateAlarm}>Estado alarmas</Text> 
          <View style={styles.itemsContainer}>
            <View style={styles.items}>
              <Alarmas text={'Alarma 1'} estado={'Tomada'} />
              <Alarmas text={'Alarma 2'} estado={'Omitida'} />
              <Alarmas text={'Alarma 3'} estado={'Tomada'} />
              <Alarmas text={'Alarma 4'} estado={'Tomada'} />
              <Alarmas text={'Alarma 5'} estado={'Omitida'} />
              <Alarmas text={'Alarma 6'} estado={'Tomada'} />
            </View>
          </View>
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  endDayContainer:{
    flex: 1,
    backgroundColor: '#CECAE8',
    alignItems: 'center'
  },
  titleStateAlarm:{
    padding: 10,
    fontSize: 30,
    color: '#624D8A',
    fontWeight: 'bold'
  },
  itemsContainer: {
    paddingTop: 2,
    width: '100%',
    paddingHorizontal: 10
  },
  items: {
    marginTop: 10
  }
})

export default EndDay;