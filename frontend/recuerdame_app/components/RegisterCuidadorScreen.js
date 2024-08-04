import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";

function RegisterCuidadorScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <FontAwesomeIcon icon={faUserCircle} size={64} color="#624d8a" style={styles.icono} />
            <Text style={styles.subtitulo}>Cuidador</Text>
            <View style={styles.textInput}>
              <TextInput placeholder="Nombre" />
            </View>
            <View style={styles.textInput}>
              <TextInput placeholder="Apellido" />
            </View>
            <View style={styles.textInput}>
              <TextInput placeholder="Correo electrónico" />
            </View>
            <View style={styles.textInput}>
              <TextInput placeholder="Celular" />
            </View>    
            <View style={styles.textInput}>
              <TextInput placeholder="Aquí va tu contraseña" />
            </View>  
            <View style={styles.textInput}>
              <TextInput placeholder="Por favor, confirme su contraseña" />
            </View>   
            <View style={styles.textInput}>
              <TextInput placeholder="DNI" />
            </View>                                       
            <View style={styles.containerBoton}>
                <TouchableOpacity 
                  onPress={ () => navigation.navigate('RegisterPaciente')}
                  style={styles.boton}>
                  <Text style={styles.textoBoton}>Registrar paciente</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles={   
    container: {
        flex: 1,
        backgroundColor: '#CECAE8',
        justifyContent: 'center',
        paddingStart: 20,
    }, 
    subtitulo: {
        fontSize: 26,
        color: '#624D8A',
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10,
    },
    icono: {
        alignSelf:"center", 
        marginBottom:20, 
        marginTop: 20
    },
    textInput: {
        borderWidth: 2,
        borderColor: '#624D8A',
        width: '94%',
        height: 60,
        paddingStart: 30, 
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        fontSize: 16,
        justifyContent: "center",        
    },
    containerBoton: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    boton: {
        backgroundColor: '#624D8A',
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '86%',
        borderRadius: 8,
    },
    textoBoton: {
        color: '#f1eff8',
        fontSize: 20,
        textAlign: 'center',
    }
}

export default RegisterCuidadorScreen;