import React from 'react';
import { View, Text, useWindowDimensions, TouchableOpacity, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native"
const { height } = Dimensions.get("window");

export default CarouselItem = ({ item }) => {
    const { width } = useWindowDimensions(); //Utiliza el valor del ancho de la pantalla
    const navigation = useNavigation();
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <View
                    style={{
                        width,
                        paddingTop: 80,
                    }}
                >
                    <Text
                    style={styles.text}
                    >{item.title}</Text>
                    <ImageBackground
                    style={{
                        marginTop: 50,
                        marginBottom: 40,
                        height: item.id === '2' ? height / 2.5 : height / 3, 
                    }}
                    resizeMode="contain"
                    source={item.image}
                    />
                </View>
                { item.isLast && (
                    <View style={styles.containerTouch}>
                        <TouchableOpacity 
                            onPress={ () => navigation.navigate('Home')}
                            style={styles.touch}>
                        <Text style={styles.touchText}>Empezar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>        
    );
}

const styles = {
    container: {
        flex: 1, 
        backgroundColor: '#CECAE8', 
        justifyContent: 'center'
    },
    text: {
        fontSize: 50,
        color: '#624D8A',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    containerTouch: {
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    touch: {
        backgroundColor: '#624D8A',
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '86%',
        borderRadius: 8
    },
    touchText: {
        color: '#f1eff8',
        fontSize: 22,
        textAlign: 'center',
    }
}
