import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import QRCode from "react-qr-code";


const EscanearCodigoQR = ({ isVisible, onPress }) => {
    const link = 'https://alz.org/ar/demencia-alzheimer-argentina.asp';
    return (
        <Modal
            transparent={true}
            visible={isVisible}
            animationType='slide'
            onRequestClose={onPress}
        >
            <View style={styles.formsContainer}>
                <Text style={styles.titleAddAlarm}>Por favor, escaneá el código QR para vincular la cuenta del paciente</Text>
                <QRCode value={link} />
                <TouchableOpacity onPress={onPress}>
                    <FontAwesomeIcon icon={faCircleXmark} size={72} style={styles.iconoItem} />  
                </TouchableOpacity>
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
    titleAddAlarm: {
        fontSize: 30,
        marginBottom: 60,
        textAlign: 'center',
        color: '#624D8A',
        fontWeight: 'bold'
    },
    iconoItem: {
        color: '#624D8A',
        marginTop: 60
    } 
})

export default EscanearCodigoQR;

