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
                <View 
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 40,
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity 
                      onPress={ () => navigation.navigate('Home')}
                      style={{
                        backgroundColor: '#624D8A',
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        width: '48%',
                        borderRadius: 8,
                        marginBottom: 14,
                      }}>
                      <Text style={{
                        color: '#f1eff8',
                        fontSize: 22,
                        textAlign: 'center',
                      }}>Empezar</Text>
                    </TouchableOpacity>
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
});