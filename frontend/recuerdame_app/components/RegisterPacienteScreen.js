import React, {useState} from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";

function RegisterPacienteScreen({ navigation }) {
  const [nombrePaciente, setNombrePaciente] = useState('')
  const [apellidoPaciente, setApellidoPaciente] = useState('')
  const [correoPaciente, setCorreoPaciente] = useState('')
  const [celularPaciente, setCelularPaciente] = useState('')
  const [passwordPaciente, setPasswordPaciente] = useState('')
  const [confirmPasswordPaciente, setConfirmPasswordPaciente] = useState('')
  const [errorsPaciente, setErrorsPaciente] = useState({})

  const [dniPaciente, setDniPaciente] = useState('')

  const validateDNIPaciente = (dniPaciente) => {
    const allowDniPaciente = /^\d+$/
    return allowDniPaciente.test(dniPaciente)
  }

  const handleDniPacienteChange = (text) => {
    setDniPaciente(text)
    if(!validateDNIPaciente(text)){
      setErrorsPaciente((prev) => ({
        ...prev, dniPaciente: 'El DNI solo admite números'
      }))
    }else{
      setErrorsPaciente((prev) => ({
        ...prev, dniPaciente: null
      }))
    }
  }

  const validatePasswordPaciente = (passwordPaciente) => {
    const allowPasswordPaciente = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/
    return allowPasswordPaciente.test(passwordPaciente)
  }

  const handlePasswordPacienteChange = (text) => {
    setPasswordPaciente(text)
    if(!validatePasswordPaciente(text)){
      setErrorsPaciente((prev) => ({
        ...prev, passwordPaciente: 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un caracter especial'
      }))
    }else{
      setErrorsPaciente((prev) => ({
        ...prev, passwordPaciente: null
      }))
    }
  }

  const handleConfirmPasswordPacienteChange = (text) =>{
    setConfirmPasswordPaciente(text)
    if(text !== passwordPaciente) {
      setErrorsPaciente((prev) => ({
        ...prev, confirmPasswordPaciente: 'Las contraseñas no coinciden'
      }))
    }else{
      setErrorsPaciente((prev) => ({
        ...prev, confirmPasswordPaciente: null
      }
      ))
    }
  }
  
  const handleRegisterComplete = () => {
    let valid = true
    let newErrorsPaciente = {}

    if(!nombrePaciente){
      valid = false
      newErrorsPaciente.nombrePaciente = 'Nombre es requerido'
    }
    if(!apellidoPaciente){
      valid = false
      newErrorsPaciente.apellidoPaciente = 'Apellido es requerido'
    }
    if(!correoPaciente){
      valid = false
      newErrorsPaciente.correoPaciente = 'Email es requerido'
    }
    if(!celularPaciente){
      valid = false
      newErrorsPaciente.celularPaciente = 'Celular es requerido'
    }
    if(!passwordPaciente){
      valid = false
      newErrorsPaciente.passwordPaciente = 'Contraseña es requerido'
    }
    if(!confirmPasswordPaciente){
      valid = false
      newErrorsPaciente.confirmPasswordPaciente = 'Confirmación de la contraseña es requerida'
    }
    if(!dniPaciente){
      valid = false
      newErrorsPaciente.dniPaciente = 'DNI es requerido'
    }
    setErrorsPaciente(newErrorsPaciente)
    if(valid) {
      navigation.navigate('SignIn')
    }
  }

  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faUserCircle} size={64} color="#624d8a" style={styles.icono} />
      <Text style={styles.subtitulo}>Paciente</Text>
      <View style={styles.textInput}>
        <TextInput placeholder="Nombre" onChangeText={setNombrePaciente} />
        {errorsPaciente.nombrePaciente && <Text style={styles.error}>{errorsPaciente.nombrePaciente}</Text>}
      </View>
      <View style={styles.textInput}>
        <TextInput placeholder="Apellido" onChangeText={setApellidoPaciente} />
        {errorsPaciente.apellidoPaciente && <Text style={styles.error}>{errorsPaciente.apellidoPaciente}</Text>}
      </View>
      <View style={styles.textInput}>
        <TextInput placeholder="Correo electrónico" onChangeText={setCorreoPaciente} />
        {errorsPaciente.correoPaciente && <Text style={styles.error}>{errorsPaciente.correoPaciente}</Text>}
      </View>
      <View style={styles.textInput}>
        <TextInput placeholder="Celular" keyboardType="numeric" onChangeText={setCelularPaciente} />
        {errorsPaciente.celularPaciente && <Text style={styles.error}>{errorsPaciente.celularPaciente}</Text>}
      </View>    
      <View style={styles.textInput}>
        <TextInput placeholder="Aquí va tu contraseña" secureTextEntry onChangeText={handlePasswordPacienteChange} />
        {errorsPaciente.passwordPaciente && <Text style={styles.error}>{errorsPaciente.passwordPaciente}</Text>}
      </View>  
      <View style={styles.textInput}>
        <TextInput placeholder="Por favor, confirme su contraseña" secureTextEntry onChangeText={handleConfirmPasswordPacienteChange} />
        {errorsPaciente.confirmPasswordPaciente && <Text style={styles.error}>{errorsPaciente.confirmPasswordPaciente}</Text>}
      </View>   
      <View style={styles.textInput}>
        <TextInput placeholder="DNI" keyboardType="numeric" onChangeText={handleDniPacienteChange} />
        {errorsPaciente.dniPaciente && <Text style={styles.error}>{errorsPaciente.dniPaciente}</Text>}
      </View>                                       
      <View style={styles.containerBoton}>
        <TouchableOpacity 
          onPress={handleRegisterComplete}
          style={styles.boton}>
          <Text style={styles.textoBoton}>Completar registro</Text>
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
    paddingStart: 20
  }, 
  subtitulo: {
    fontSize: 26,
    color: '#624D8A',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10
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
    marginTop: 10
  },
  boton: {
    backgroundColor: '#624D8A',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '86%',
    borderRadius: 8
  },
  textoBoton: {
    color: '#f1eff8',
    fontSize: 20,
    textAlign: 'center',
  },
  error: {
    color: 'red'
  }
}

export default RegisterPacienteScreen;