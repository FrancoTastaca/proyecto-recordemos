import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import AgregarAlarma from '../components/AgregarAlarma'
import { useRoute } from '@react-navigation/native'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'
import api from './axiosConfig'

function Header({ screen }) {
    const navigation = useNavigation();
    const route = useRoute();
    const { role, userId, Cuidador, Paciente } = route.params; // Obtener role, userId, Cuidador y Paciente desde route.params
    const roles = {
        cuidador: 'Cuidador',
        paciente: 'Paciente'
    };

    const [cuidadorData, setCuidadorData] = useState(Cuidador);
    const [pacienteData, setPacienteData] = useState(Paciente);

    useEffect(() => {
        if (!Paciente && role === roles.cuidador) {
            console.log('Header: Error: Paciente no está definido, por lo tanto entre por el camino de ser cuidador');
            const fetchCuidadorData = async () => {
                try {
                    const response = await api.get(`/cuidador/miPaciente`);
                    setPacienteData(response.data);
                } catch (error) {
                    console.error('Error fetching Cuidador data:', error);
                }
            };
            fetchCuidadorData();
            console.log('Header: pacienteData exitoso con un valor de: ', pacienteData);
        }
    }, [Paciente, role]);

    /* Constantes para el pop up */
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    console.log('Header: screen', screen);
    console.log('Header: role', role);
    console.log('Header: userId', userId);
    console.log('Header: Cuidador', cuidadorData);
    console.log('Header: Paciente', pacienteData);

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackIconContainer}>
                <FontAwesomeIcon icon={faArrowLeft} size={32} style={styles.goBackIcon} />
            </TouchableOpacity>
            <View style={styles.headerContent}>
                {screen === 'ProfileCuidador' ? (
                    <>
                        {role === roles.cuidador && cuidadorData && (
                            <>
                                <Text style={styles.headerTitle}>{roles.cuidador}</Text>
                                <Text style={styles.headerText}>{cuidadorData.nombre} {cuidadorData.apellido}</Text>
                            </>
                        )}
                        {role === roles.paciente && pacienteData && (
                            <>
                                <Text style={styles.headerTitle}>{roles.paciente}</Text>
                                <Text style={styles.headerText}>{pacienteData.nombre} {pacienteData.apellido}</Text>
                            </>
                        )}
                    </>
                ) : screen === 'EndDay' ? (
                    <>
                        <Text style={styles.headerTitleEndDay}>FINAL DEL DÍA</Text>
                        <View style={styles.headerSubContent}>
                            <View style={styles.withIconContainer}>
                                <FontAwesomeIcon icon={faUserCircle} size={42} style={styles.iconUser} />
                                {role === roles.cuidador && (
                                    <Text style={styles.headerText}>{roles.cuidador}</Text>
                                )}
                            </View>
                            {pacienteData ? (
                                <Text style={styles.headerTextEndDay}>
                                    Paciente: {pacienteData.nombre} {pacienteData.apellido}
                                </Text>
                            ) : (
                                <Text style={styles.errorText}>Error: Paciente no está definido</Text>
                            )}
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
                                {isModalVisible && <AgregarAlarma isVisible={isModalVisible} onPress={handleModal} />}
                            </View>
                        )}
                        {role === roles.paciente && pacienteData && (
                            <View style={styles.headerSubContentPaciente}>
                                <>
                                    <Text style={styles.headerText}>{roles.paciente}</Text>
                                    <Text style={styles.headerTextEndDay}>
                                        {pacienteData.nombre} {pacienteData.apellido}
                                    </Text>
                                </>
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
        height: 220,
        backgroundColor: '#624D8A',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'relative' // Asegura que los elementos hijos se posicionen relativamente al contenedor
    },
    goBackIconContainer: {
        position: 'absolute',
        top: 20,
        left: 5, 
        zIndex: 1 // Asegura que el ícono esté por encima de otros elementos
    },
    goBackIcon: {
        color: '#CECAE8'
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
        height: 130,
        alignItems: 'center',
        marginLeft: 0,
        marginRight: 32,
        padding: 0
    },
    headerSubContentPaciente: {
        backgroundColor: '#2f273f',
        width: '100%',
        height: 86,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 0,
        marginRight: 32,
        marginBottom: 8,
    },
    headerTitle: {
        marginTop: '1rem',
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
        fontSize: 24, // Reducir el tamaño de la fuente
        color: '#CECAE8',
        letterSpacing: 1,
        paddingBottom: 4,
        marginBottom: 15 // Agregar margen inferior
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
    },
    errorText: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default Header;