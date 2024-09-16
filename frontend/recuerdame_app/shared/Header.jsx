import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import AgregarAlarma from '../components/AgregarAlarma';
import { useRoute } from "@react-navigation/native";

function Header({ screen }){
    const route = useRoute()
    const { role } = route.params;
    const roles = {
        cuidador: 'cuidador',
        paciente: 'paciente'
    };
    /* Constantes para el pop up */
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
    return(
        <View style={styles.header}>
            <View style={styles.headerContent}>
                {screen === 'ProfileCuidador' ? (
                    <> 
                        <Text style={styles.headerTitle}>ROL</Text>
                        <Text style={styles.headerText}>Nombre Apellido</Text>
                    </>
                ) : screen === 'EndDay' ? (
                    <>
                        <Text style={styles.headerTitleEndDay}>FINAL DEL DÍA</Text>
                        <View style={styles.headerSubContent}>
                            <View style={styles.withIconContainer}>
                                <FontAwesomeIcon icon={faUserCircle} size={42} style={styles.iconUser} /> 
                                <Text style={styles.headerText}>ROL</Text>
                            </View>
                            <Text style={styles.headerTextEndDay}>Nombre Apellido</Text>
                        </View>
                    </>
                ) : (
                    <>
                        <Text style={styles.headerTitle}>PASTILLERO</Text>
                        <Text style={styles.headerTitle}>DIARIO</Text>
                        {role === roles.cuidador && (
                            <View style={styles.touchContainer}>
                                <TouchableOpacity style={styles.touchPlus} onPress={handleModal}>
                                    <FontAwesomeIcon icon={faCirclePlus} size={36} style={styles.iconPlus} />  
                                    <Text style={styles.btnHeaderText}>Agregar alarma</Text>
                                </TouchableOpacity>
                                {isModalVisible && <AgregarAlarma isVisible = {isModalVisible} onPress={handleModal} />}
                            </View>
                        )}
                    </>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 170,
        backgroundColor: '#624D8A',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    headerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        width: '100%'
    },
    headerSubContent: {
        backgroundColor: '#2f273f',
        width: '100%', 
        height: 110,
        alignItems: 'center',
        marginLeft: 0,
        marginRight: 32,
        padding: 0
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#CECAE8'
    },
    headerTitleEndDay: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#CECAE8', 
        marginBottom: 15
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#CECAE8',
        letterSpacing: 1,
        paddingBottom: 10,
        paddingTop: 14
    },
    headerTextEndDay: {
        fontWeight: 'italic',
        fontSize: 30,
        color: '#CECAE8',
        letterSpacing: 1,
        paddingBottom: 4
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
    withIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconPlus: {
        color: '#624D8A',
        marginRight: 16
    },
    iconUser: {
        color: '#CECAE8',
        marginRight: 16
    }
})

export default Header