import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Image } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

const AgregarMedicamento = ({ isVisible, onPress }) => {
    const [selectedValueMed, setSelectedValueMed] = useState(''); //Estado del picker medicamento
    const[open, setOpen] = useState(false);
    const [itemsMed, setItemsMed] = useState([
        {label: 'Opción 1', value: 'opcion1'},
        {label: 'Opción 2', value: 'opcion2'}
    ])

    const [inputBrandMed, setInputBrandMed] = useState(''); //Estado del input marca
    const [inputColourMed, setInputColourMed] = useState(''); //Estado del input color

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            animationType='slide'
            onRequestClose={onPress}
        >
            <View style={styles.formsContainer}>
                <View stlye={styles.formsContent}>
                    <Text style={styles.titleAddAlarm}>Agregar Medicamento</Text>
                    <Image source={require('../assets/Configurar.png')} style={styles.imgAlarm} resizeMode='contain' />
                    <Text style={styles.titleContentItem}>Droga</Text>
                    <DropDownPicker style={styles.pickerMedicine} 
                        open={open}
                        value={selectedValueMed}
                        items={itemsMed}
                        setOpen={setOpen}
                        setValue={setSelectedValueMed}
                        setItems={setItemsMed}
                        searchable={true}
                        placeholder="Seleccione una droga"
                        searchPlaceholder="Busque la droga"
                        dropDownContainerStyle={styles.pickerMedicineContainer}
                        textStyle={styles.pickerMedicineText}
                        searchTextInputStyle={styles.searchMedicineInput}
                        onValueChange={(itemValue) => setSelectedValueMed(itemValue)}
                        itemSeparator={true}
                        itemSeparatorStyle={styles.itemSeparator}
                        ListEmptyComponent={() => (
                           <Text style={styles.noResultsText}>No se encontró la droga</Text> 
                        )}
                    />
                    <Text style={styles.titleContentItem}>Marca</Text>
                    <TextInput style={styles.inputValue}
                        placeholder='Ingrese la marca'
                        placeholderTextColor='#4f426d'
                        value={inputBrandMed}
                        onChangeText={setInputBrandMed}
                    />
                    <Text style={styles.titleContentItem}>Color</Text>
                    <TextInput style={styles.inputValue}
                        placeholder='Ingrese el color del medicamento'
                        placeholderTextColor='#4f426d'
                        value={inputColourMed}
                        onChangeText={setInputColourMed}
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

export default AgregarMedicamento;