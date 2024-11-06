import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Image, Alert, Platform } from "react-native";
import PushNotification from 'react-native-push-notification';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from 'expo-notifications';
import { Audio } from "expo-av";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from '../shared/axiosConfig';

const AgregarAlarma = ({ isVisible, onPress, screen }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    const { role, userId, Cuidador, Paciente } = route.params;
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [inputColour, setInputColour] = useState('');
    const [dosis, setDosis] = useState(1); // Estado para "Dosis"
    const [isModalVisible, setModalVisible] = useState(isVisible);

    useEffect(() => {
        const { role, userId, Cuidador, Paciente } = route.params;
        console.log('------- AgregarAlarma role recibido:', role);
        console.log('------- AgregarAlarma userId recibido:', userId);
        console.log('------- AgregarAlarma Cuidador recibido:', Cuidador);
        console.log('------- AgregarAlarma Paciente recibido:', Paciente);

        const getPermissions = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permiso denegado, debe permitir las notificaciones para que funcione la alarma');
            }
            console.log('AgregarAlarma: Permisos de notificaciones', status);
        };

        getPermissions();

        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('AgregarAlarma: Notificación recibida', response);
            navigation.navigate('Confirm');
        });

        return () => subscription.remove();
    }, [navigation, route.params]);

    useEffect(() => {
        const fetchMedicamentos = async () => {
            try {
                console.log('AgregarAlarma: Fetching medicamentos for Cuidador ID', route.params.Cuidador.idCuidador);
                const response = await api.get(`/medicamento/cuidador`);
                console.log('AgregarAlarma: Response data', response.data);
                const medicamentos = response.data.map((med, index) => ({
                    label: `${med.Vademecum.principio_activo} - ${med.Vademecum.presentacion}`,
                    value: med.ID || index,
                    key: med.ID || index
                }));
                setItems(medicamentos);
                console.log('AgregarAlarma: Medicamentos fetched', medicamentos);
            } catch (error) {
                console.error('AgregarAlarma: Error fetching medicamentos:', error);
            }
        };

        fetchMedicamentos();
    }, [route.params.Cuidador.idCuidador]);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
        console.log('AgregarAlarma: Fecha seleccionada', currentDate);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || date;
        setShowTimePicker(false);
        setDate(currentTime);
        console.log('AgregarAlarma: Hora seleccionada', currentTime);
    };

    const scheduleNotification = async () => {
        console.log('AgregarAlarma: Programando notificación para', date);
        // Primera notificación
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Alarma',
                body: `Acordate que debés tomar del pastillero ${inputColour} el medicamento ${selectedValue}`,
                vibrate: true,
                sound: require('../assets/sounds/alarma.wav'),
                data: { screen: 'Confirm' } 
            },
            trigger: {
                date,
            }
        });

        // Segunda notificación (5 minutos después)
        const fiveMinutesLater = new Date(date.getTime() + 7 * 60000);
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Recordatorio',
                body: `¿Tomaste la medicación del pastillero ${inputColour}?`,
                vibrate: true,
                sound: require('../assets/sounds/alarma.wav'),
                data: { screen: 'Confirm' } 
            },
            trigger: {
                date: fiveMinutesLater,
            }
        });
        console.log('AgregarAlarma: Notificaciones programadas');
    };

    const handleAddAlarm = async () => {
      if (!selectedValue || !inputColour || !date) {
          Alert.alert('Error', 'Por favor, complete todos los campos.');
          return;
      }
      // Formatear la hora en el formato hh:mm
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      try {
          console.log('AgregarAlarma: Creando alarma con', {
              MedCuidadorID: selectedValue,
              PacienteID: route.params.Paciente ? route.params.Paciente.idPaciente : null,
              horarioDiario: formattedTime, // Usar el tiempo formateado aquí
              dosis, // Incluye la dosis aquí
              colorPastillero: inputColour,
              imagenURL: null // Ajusta este valor según sea necesario
          });
          const response = await api.post('/pastilleroAlarma/', {
              MedCuidadorID: selectedValue,
              PacienteID: route.params.Paciente ? route.params.Paciente.idPaciente : null,
              horarioDiario: date.toISOString(),
              dosis, // Incluye la dosis aquí
              colorPastillero: inputColour,
              imagenURL: null // Ajusta este valor según sea necesario
          });
          console.log('AgregarAlarma: Alarma creada', response.data);
          setModalVisible(false);
          scheduleNotification();
  
          // Mostrar mensaje de éxito y redirigir después de 3 segundos
          Alert.alert('Éxito', 'La alarma se ha creado exitosamente.');
          setTimeout(() => {
              navigation.goBack(); // Volver a la vista anterior
          }, 3000);
      } catch (error) {
          console.error('AgregarAlarma: Error creando alarma:', error);
          Alert.alert('Error', 'Ocurrió un error al crear la alarma. Por favor, inténtelo nuevamente.');
      }
  };

    return (
        <Modal
            transparent={true}
            visible={isModalVisible}
            animationType='slide'
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.formsContainer}>
                <View stlye={styles.formsContent}>
                    <Text style={styles.titleAddAlarm}>Agregar Alarma</Text>
                    <Image source={require('../assets/Controlar.png')} style={styles.imgAlarm} resizeMode='contain' />
                    <Text style={styles.titleContentItem}>Medicamento</Text>
                    <DropDownPicker style={styles.pickerMedicine} 
                        open={open}
                        value={selectedValue}
                        items={items}
                        setOpen={setOpen}
                        setValue={setSelectedValue}
                        setItems={setItems}
                        searchable={true}
                        placeholder="Seleccione un medicamento"
                        searchPlaceholder="Busque un medicamento"
                        dropDownContainerStyle={styles.pickerMedicineContainer}
                        textStyle={styles.pickerMedicineText}
                        searchTextInputStyle={styles.searchMedicineInput}
                        onValueChange={(itemValue) => {
                            setSelectedValue(itemValue);
                            console.log('AgregarAlarma: Medicamento seleccionado', itemValue);
                        }}
                        itemSeparator={true}
                        itemSeparatorStyle={styles.itemSeparator}
                        ListEmptyComponent={() => (
                           <Text style={styles.noResultsText}>No se encontró el medicamento</Text> 
                        )}
                    />
                    <Text style={styles.titleContentItem}>Seleccione fecha y horario</Text>
                    <View style={styles.touchContainer}>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                            <Text style={styles.inputValue}>Fecha: {date.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker value={date}
                                mode='date'
                                display='default'
                                onChange={onChangeDate}
                                style={styles.pickerDateTime}
                            />
                        )}
                        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                            <Text style={styles.inputValue}>Hora: {date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</Text>
                        </TouchableOpacity>
                        {showTimePicker && (
                            <DateTimePicker value={date}
                                mode='time'
                                display='default'
                                onChange={onChangeTime}
                                style={styles.pickerDateTime}
                            />
                        )}
                    </View>
                    <View style={styles.rowContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.titleContentItem}>Color</Text>
                            <TextInput style={styles.inputValue}
                                placeholder='Ingrese el color del pastillero'
                                placeholderTextColor='#4f426d'
                                value={inputColour}
                                onChangeText={(text) => {
                                    setInputColour(text);
                                    console.log('AgregarAlarma: Color ingresado', text);
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.titleContentItem}>Dosis</Text>
                            <View style={styles.dosisContainer}>
                                <TouchableOpacity onPress={() => setDosis(dosis > 1 ? dosis - 1 : 1)}>
                                    <Text style={styles.dosisButton}>-</Text>
                                </TouchableOpacity>
                                <TextInput style={styles.inputValue}
                                    value={String(dosis)}
                                    keyboardType='numeric'
                                    onChangeText={(text) => {
                                        const value = parseInt(text, 10);
                                        setDosis(isNaN(value) ? 1 : value);
                                        console.log('AgregarAlarma: Dosis ingresada', value);
                                    }}
                                />
                                <TouchableOpacity onPress={() => setDosis(dosis + 1)}>
                                    <Text style={styles.dosisButton}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.touchContainer}>
                        <TouchableOpacity onPress={() => {
                            setModalVisible(!isVisible);
                            console.log('AgregarAlarma: Cancelar presionado');
                            navigation.goBack(); // Volver a la vista anterior
                        }} style={styles.touchItemCancel}>
                            <Text style={styles.touchTextCancel}>CANCELAR</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity onPress={handleAddAlarm} style={styles.touchItemAdd}>
                            <Text style={styles.touchTextAdd}>AGREGAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    formsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CECAE8',
        padding: 12
    },
    formsContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#e4e2f2',
        borderRadius: 10
    },
    titleAddAlarm: {
        fontSize: 30,
        marginBottom: 50,
        textAlign: 'center',
        color: '#392C52',
        fontWeight: 'bold'
    },
    imgAlarm: {
        width: '100',
        height: 180,
        marginBottom: 40
    },
    titleContentItem: {
        marginBottom: 5,
        fontSize: 22,
        color: '#392C52'
    },
    pickerMedicineContainer:{
        borderRadius: 5
    },
    pickerMedicine: {
        height: 50,
        width: '100%',
        backgroundColor: '#bfbae7',
        marginBottom: 40,
        borderWidth: 2,
        borderColor: '#624D8A'
    },
    pickerMedicineText: {
        height: 'auto',
        fontSize: 20,
        color: '#4f426d'
    },
    itemSeparator: {
        backgroundColor: '#624D8A'
    },
    searchMedicineInput: {
        padding: 10,
        color: '#392C52'
    },
    noResultsText: {
        textAlign: 'center',
        color: '#392C52',
        fontWeight: 'bold',
        padding: 12
    },
    pickerDateTime:{
        backgroundColor: '#bfbae7',
    },
    inputValue: {
        height: 50,
        backgroundColor: '#bfbae7',
        borderWidth: 2,
        paddingHorizontal: 10,
        fontSize: 20,
        borderRadius: 5,
        borderColor: '#624D8A',
        textAlignVertical: 'center',
        color: '#4f426d',
        textAlign: 'center', // Centrar el texto
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    inputContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    dosisContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dosisButton: {
        fontSize: 24,
        color: '#624D8A',
        paddingHorizontal: 10,
    },
    touchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //marginTop: 20
    },
    touchItemCancel: {
        backgroundColor: '#624D8A',
        padding: 10,
        borderRadius: 5
    },
    touchTextCancel: {
        color: '#e4e2f2',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    touchItemAdd: {
        backgroundColor: '#b3abda',
        padding: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#624D8A'
    },
    touchTextAdd: {
        color: '#624D8A',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20
    }
})

export default AgregarAlarma;