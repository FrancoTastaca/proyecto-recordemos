import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';

export default CarouselItem = ({ item }) => {
    const { width } = useWindowDimensions();
    return(
        <View style={[styles.container, { width }]}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
            <Image source={item.image} style={styles.image} resizeMode="contain" />
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
        fontSize: 20,
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
        //flex: 0.7,
        justifyContent: 'center',
        width: '100%',
        height: 200,
    },
    
});