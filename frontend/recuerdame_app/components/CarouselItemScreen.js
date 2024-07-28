import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native"

export default CarouselItem = ({ item }) => {
    const { width } = useWindowDimensions(); //Utiliza el valor del ancho de la pantalla
    const navigation = useNavigation();
    return(
        <View style={[styles.container, { width }]}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            { item.isLast && ( //Botón "Empezar" para el último ítem del Carousel y redirección al seleccionarlo
                <View style={styles.empezarButton}>
                    <Button
                        title="Empezar" 
                        onPress={ () => navigation.navigate('Home')}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#CECAE8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: '600',
        fontSize: 32,
        marginBottom: 10,
        color: '#33294C',
        textAlign: 'center',
    },
    titleContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 0.5,
        justifyContent: 'center',
        width: '50%',
        height: 100,
        marginBottom: 50,
    },
    empezarButton: {
        color: '#fff',
        width: '48%',
        fontSize: 20,
        marginTop: 20,
        justifyContent: 'center',
    },  
});