import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

function Header({ screen }){
    return(
        <View style={styles.header}>
            <View style={styles.headerContent}>
                {screen === 'ProfileCuidador' ? (
                    <> 
                        <Text style={styles.headerTitle}>ROL</Text>
                        <Text style={styles.headerText}>Nombre Apellido</Text>
                    </>
                ) : (
                    <>
                        <Text style={styles.headerTitle}>PASTILLERO</Text>
                        <Text style={styles.headerTitle}>DIARIO</Text>
                        <View style={styles.touchContainer}>
                            <TouchableOpacity style={styles.touchPlus}>
                                <FontAwesomeIcon icon={faCirclePlus} size={36} style={styles.iconPlus} />  
                                <Text style={styles.btnHeaderText}>Agregar alarma</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 190,
        backgroundColor: '#624D8A',
        alignItems: 'center'
    },
    headerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#CECAE8'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#CECAE8',
        letterSpacing: 1,
        paddingBottom: 10,
        paddingTop: 14
    },
    touchPlus: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        backgroundColor: '#CECAE8',
        padding: 8,
        borderColor: '#624D8A',
        borderRadius: 8,
        marginTop: 12,
        marginBottom: 8,
    },
    btnHeaderText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#624D8A',
        letterSpacing: 1,
        paddingBottom: 10
    },
    iconPlus: {
        color: '#624D8A',
        marginRight: 16
    }
})

export default Header