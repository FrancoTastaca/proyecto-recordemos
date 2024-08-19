import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Image } from "react-native";
//import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from "@react-native-community/datetimepicker";

const AgregarAlarma = ({ isVisible, onPress }) => {
    const [selectedValue, setSelectedValue] = useState(''); //Estado del picker medicamento
    const[open, setOpen] = useState(false);
    const [items, setItems] = useState([
        {label: 'Opción 1', value: 'opcion1'},
        {label: 'Opción 2', value: 'opcion2'}
    ])

    const[date, setDate] = useState(new Date()); //Constantes para la fecha y horario
    const[showDatePicker, setShowDatePicker] = useState(false);
    const[showTimePicker, setShowTimePicker] = useState(false);
    
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    }

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || date;
        setShowTimePicker(false);
        setDate(currentTime);
    }

    const [inputColour, setInputColour] = useState(''); //Estado del input color

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            animationType='slide'
            onRequestClose={onPress}
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
                        <TouchableOpacity onPress={onPress} style={styles.touchItemCancel}>
                            <Text style={styles.touchTextCancel}>CANCELAR</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity onPress={onPress} style={styles.touchItemAdd}>
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
        color: '#624D8A',
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
        color: '#624D8A'
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
        color: '#4f426d'
    },
    noResultsText: {
        textAlign: 'center',
        color: '#624D8A',
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