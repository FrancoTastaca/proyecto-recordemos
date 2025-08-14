import React from "react";
import { View, StyleSheet, Animated, useWindowDimensions } from "react-native";

function Paginator({ data, scrollX }) {
    const {width} = useWindowDimensions();
    return (
      <View style={{ flexDirection: 'row', height: 64 }}>
        {data.map((_, i) => { //Navegar por el array de los elementos de data
            const inputRange = [(i-1)*width, i*width, (i+1)*width] //Marca el punto previo, el actual y el posterior
            const dotWidth = scrollX.interpolate({ //Calcula la posición del punto
                inputRange,
                outputRange: [10,20,10],
                extrapolate: 'clamp', //Si se omite, no se observa la navegación completa de los puntos, solo de aquellos con los que se trabaja
            })
            const opacity = scrollX.interpolate({ //Agrega opacidad a aquellos puntos que no corresponden al punto actual
                inputRange,
                outputRange: [0.3,1,0.3],
                extrapolate: 'clamp',
            })
            return <Animated.View style={[styles.dot, {width:dotWidth, opacity}]} key={i.toString()}/> //Al estar en loop, convertimos en una cadena al objeto
        })}
      </View>
    )
}

const styles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#493d8a',
        marginHorizontal: 8,
    },
});

export default Paginator;
