import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Image, Switch, Platform } from "react-native";
//import { Picker } from '@react-native-picker/picker';
import PushNotification from 'react-native-push-notification';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";


const AgregarAlarma = ({ isVisible, onPress, screen }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([{ label: 'Donezepil', value: 'opcion1' }]);
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [inputColour, setInputColour] = useState('');
    const [isModalVisible, setModalVisible] = useState(isVisible);

    useEffect(() => {
        const getPermissions = async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permiso denegado, debe permitir las notificaciones para que funcione la alarma');
            }
        };

        getPermissions();

        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            navigation.navigate('Confirm');
        });

        return () => subscription.remove();
    }, [navigation]);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || date;
        setShowTimePicker(false);
        setDate(currentTime);
    };

    const scheduleNotification = async () => {
        // Primera notificación
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Alarma',
                body: 'Acordate que debés tomar del pastillero ROJO el medicamento Donezepil',
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
                body: '¿Tomaste la medicación BLANCA del pastillero ROJO?',
                vibrate: true,
                sound: require('../assets/sounds/alarma.wav'),
                data: { screen: 'Confirm' } 
            },
            trigger: {
                date: fiveMinutesLater,
            }
        });
    };

    const handleAddAlarm = () => {
        setModalVisible(false);
        scheduleNotification();
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
                        onValueChange={(itemValue) => setSelectedValue(itemValue)}
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
                    <Text style={styles.titleContentItem}>Color</Text>
                    <TextInput style={styles.inputValue}
                        placeholder='Ingrese el color del pastillero'
                        placeholderTextColor='#4f426d'
                        value={inputColour}
                        onChangeText={setInputColour}
                    />
                    <View style={styles.touchContainer}>
                        <TouchableOpacity onPress={() => setModalVisible(!isVisible)} style={styles.touchItemCancel}>
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
            marginBottom: 40,
            paddingHorizontal: 10,
            fontSize: 20,
            borderRadius: 5,
            borderColor: '#624D8A',
            textAlignVertical: 'center',
            color: '#4f426d'
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