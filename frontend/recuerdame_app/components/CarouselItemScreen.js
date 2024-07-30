import React from 'react';
import { View, Text, useWindowDimensions, TouchableOpacity, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native"
const { height } = Dimensions.get("window");

export default CarouselItem = ({ item }) => {
    const { width } = useWindowDimensions(); //Utiliza el valor del ancho de la pantalla
    const navigation = useNavigation();
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: '#CECAE8', justifyContent: 'center'}}>
            <View>
                <View
                    style={{
                        width,
                        paddingTop: 110,
                    }}
                >
                    <Text
                    style={{
                        fontSize: 35,
                        color: '#624D8A',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: 20,
                    }}
                    >{item.title}</Text>
                    <ImageBackground
                    style={{
                        marginTop: 20,
                        height: height / 2.5, 
                    }}
                    resizeMode="contain"
                    source={item.image}
                    />
                </View>
                { item.isLast && (
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
                                width: '86%',
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
        </SafeAreaView>        
    );
}