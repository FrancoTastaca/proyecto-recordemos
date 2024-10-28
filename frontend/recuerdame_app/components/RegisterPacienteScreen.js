import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { signUp } from "../shared/auth";
import api from "../shared/axiosConfig";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function RegisterPacienteScreen({ navigation }) {
  const [nombrePaciente, setNombrePaciente] = useState('')
  const [apellidoPaciente, setApellidoPaciente] = useState('')
  const [correoPaciente, setCorreoPaciente] = useState('')
  const [celularPaciente, setCelularPaciente] = useState('')
  const [passwordPaciente, setPasswordPaciente] = useState('')
  const [confirmPasswordPaciente, setConfirmPasswordPaciente] = useState('')
  const [errorsPaciente, setErrorsPaciente] = useState({})

  const [dniPaciente, setDniPaciente] = useState('')

  const validateDNI = (dni) => {
    const allowDni = /^\d+$/;
    return allowDni.test(dni);
  };

  const handleDniChange = (text) => {
    setDni(text);
    if (!validateDNI(text)) {
      setErrors((prev) => ({
        ...prev, dni: 'El DNI solo admite números'
      }));
    } else {
      setErrors((prev) => ({
        ...prev, dni: null
      }));
    }
  };

  const validatePassword = (password) => {
    const allowPassword = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
    return allowPassword.test(password);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (!validatePassword(text)) {
      setErrors((prev) => ({
        ...prev, password: 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un caracter especial'
      }));
    } else {
      setErrors((prev) => ({
        ...prev, password: null
      }));
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (text !== password) {
      setErrors((prev) => ({
        ...prev, confirmPassword: 'Las contraseñas no coinciden'
      }));
    } else {
      setErrors((prev) => ({
        ...prev, confirmPassword: null
      }));
    }
  };

  const handleRegister = async () => {
    let valid = true;
    let newErrors = {};

    if (!nombre) {
      valid = false;
      newErrors.nombre = 'Nombre es requerido';
    }
    if (!apellido) {
      valid = false;
      newErrors.apellido = 'Apellido es requerido';
    }
    if (!correo) {
      valid = false;
      newErrors.correo = 'Email es requerido';
    }
    if (!celular) {
      valid = false;
      newErrors.celular = 'Celular es requerido';
    }
    if (!password) {
      valid = false;
      newErrors.password = 'Contraseña es requerido';
    }
    if (!confirmPassword) {
      valid = false;
      newErrors.confirmPassword = 'Confirmación de la contraseña es requerida';
    }
    if (!dni) {
      valid = false;
      newErrors.dni = 'DNI es requerido';
    }
    setErrors(newErrors);

    if (valid) {
      try {
        // Crear Paciente
        const pacienteResponse = await api.post('paciente/crear', {
          nombre,
          apellido,
          celular,
          dni,
          codVinculacion
        });
        const paciente = pacienteResponse.data.data.datosPersonaPaciente;
        console.log('--- Entre a paciente en RegisterPacienteScreen antes de llamar al signUp');
        console.log('--- Paciente:', paciente);
        console.log('--- Correo:', correo);
        console.log('--- Password:', password);
        console.log('--- ConfirmPassword en signUp:', confirmPassword);
        console.log('--- cuidador.ID:', paciente.ID);
        // Registrar Usuario Paciente

        const response = await signUp({
          email: correo, password, confirmPassword, persona_id: paciente.ID
        });
        if (response.success) {
          Alert.alert('Registro exitoso', 'El paciente ha sido registrado correctamente.');
          const token = AsyncStorage.getItem('token');
          const id = AsyncStorage.getItem('userId');
          const Cuidador = await api.get(`/cuidador/`, { headers: { Authorization: `Bearer ${token}` } });
          console.log('handleSignIn: navigate to ProfileCuidador');
          console.log('--- Cuidador.data:', Cuidador.data);
          const role = 'Cuidador';
          console.log('--- Role:', role);
          console.log('--- UserId:', id);
          navigation.navigate('ProfileCuidador', { role, userId, Cuidador: Cuidador.data });
        }
      } catch (error) {
        console.error('Error en el registro del paciente:' + error);
        Alert.alert('Error', 'Ocurrió un error al registrar el paciente. Por favor, inténtelo nuevamente.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faUserCircle} size={64} color="#624d8a" style={styles.icono} />
      <Text style={styles.subtitulo}>Paciente</Text>
      <View style={styles.textInput}>
        <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} />
        {errors.nombre && <Text style={styles.error}>{errors.nombre}</Text>}
      </View>
      <View style={styles.textInput}>
        <TextInput placeholder="Apellido" value={apellido} onChangeText={setApellido} />
        {errors.apellido && <Text style={styles.error}>{errors.apellido}</Text>}
      </View>
      <View style={styles.textInput}>
        <TextInput placeholder="Correo electrónico" value={correo} onChangeText={setCorreo} />
        {errors.correo && <Text style={styles.error}>{errors.correo}</Text>}
      </View>
      <View style={styles.textInput}>
        <TextInput placeholder="Celular" keyboardType="numeric" value={celular} onChangeText={setCelular} />
        {errors.celular && <Text style={styles.error}>{errors.celular}</Text>}
      </View>
      <View style={styles.textInput}>
        <TextInput placeholder="Aquí va tu contraseña" value={password} secureTextEntry onChangeText={handlePasswordChange} />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      </View>
      <View style={styles.textInput}>
        <TextInput placeholder="Por favor, confirme su contraseña" value={confirmPassword} secureTextEntry onChangeText={handleConfirmPasswordChange} />
        {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
      </View>
      <View style={styles.textInput}>
        <TextInput placeholder="DNI"
          value={dni}
          keyboardType="numeric"
          onChangeText={handleDniChange}
        />
        {errors.dni && <Text style={styles.error}>{errors.dni}</Text>}
      </View>
      <View style={styles.containerBoton}>
        <TouchableOpacity
          onPress={handleRegister}
          style={styles.boton}>
          <Text style={styles.textoBoton}>Completar registro</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = {
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
    alignSelf: "center",
    marginBottom: 20,
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
    justifyContent: "center"
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
    textAlign: 'center'
  },
  error: {
    color: 'red'
  }
}

export default RegisterPacienteScreen;