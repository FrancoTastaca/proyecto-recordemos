import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native"
import Alarmas from './Alarmas'
import api from '../shared/axiosConfig'

function PastillerosScreen({ route }) {
  const { role, userId, Cuidador } = route.params
  console.log(' --------- Valor de userId en PastillerosScreen:', userId)
  console.log('---------- Valor de role en PastillerosScreen:', role)
  console.log('---------- Valor de Cuidador en PastillerosScreen:', Cuidador)
  const [pastilleros, setPastilleros] = useState([])

  useEffect(() => {
    const fetchPastilleros = async () => {
      try {
        if (role === 'Cuidador') {
          const response = await api.get(`/pastilleroAlarma/cuidador`, { withCredentials: true })
          setPastilleros(response.data)
          console.log('Valor de pastilleros en fetchPastilleros:', response.data)
        } else if (role === 'Paciente') {
          const response = await api.get(`/pastilleroAlarma/paciente`, { withCredentials: true });
          setPastilleros(response.data);
          console.log('Valor de pastilleros en fetchPastilleros:', response.data)
        }
      } catch (error) {
        console.error('Error fetching pastilleros:', error)
      }
    };
    fetchPastilleros()
  }, [])

  return (
    <View style={styles.profileContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false} style={styles.listWrapper}>
        <View style={styles.listItems}>
          {pastilleros.map((pastillero, index) => (
            <Alarmas
              key={index}
              droga={pastillero.principio_activo}
              marca={pastillero.marca}
              role={role}
              horario={pastillero.horario_diario}
              dosis={pastillero.dosis}
              medicamento_imagen={pastillero.medicamento_imagen}
              pastillero_imagen={pastillero.pastillero_imagen}
              color={pastillero.color_pastillero}
              estado={'Tomada'}
            />
          ))}
        </View>
      </ScrollView>
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
    marginTop: 20,
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default PastillerosScreen