import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import AgregarAlarma from '../components/AgregarAlarma';
import { useRoute } from "@react-navigation/native";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native"

function Header({ screen }){
    const navigation = useNavigation();
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
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <FontAwesomeIcon icon={faArrowLeft} size={32} style={styles.goBackIcon} />
                        </TouchableOpacity>
                        {role === roles.cuidador && (
                            <>
                            <Text style={styles.headerTitle}>{roles.cuidador}</Text>
                            <Text style={styles.headerText}>Silvia Hernández</Text>
                            </>
                        )}
                        {role === roles.paciente && (
                            <>
                            <Text style={styles.headerTitle}>{roles.paciente}</Text>
                            <Text style={styles.headerText}>Sonia Hernández</Text>
                            </>
                        )}
                    </>
                ) : screen === 'EndDay' ? (
                    <>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <FontAwesomeIcon icon={faArrowLeft} size={32} style={styles.goBackIcon} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitleEndDay}>FINAL DEL DÍA</Text>
                        <View style={styles.headerSubContent}>
                            <View style={styles.withIconContainer}>
                                <FontAwesomeIcon icon={faUserCircle} size={42} style={styles.iconUser} /> 
                                {role === roles.cuidador && (
                                    <Text style={styles.headerText}>{roles.cuidador}</Text>
                                )}
                            </View>
                            <Text style={styles.headerTextEndDay}>Silvia Hernández</Text>
                        </View>
                    </>
                ) : (
                    <>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <FontAwesomeIcon icon={faArrowLeft} size={32} style={styles.goBackIcon} />
                        </TouchableOpacity>
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
                        {role === roles.paciente && (
                            <View style={styles.headerSubContentPaciente}>
                                <>
                                <Text style={styles.headerText}>{roles.paciente}</Text>
                                <Text style={styles.headerTextEndDay}>Sonia Hernández</Text>
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
        marginBottom: 8
    },
    goBackIcon: {
        marginRight: 340, 
        color: '#CECAE8'
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