import React, { useState, useRef } from 'react';
import {View, StyleSheet, FlatList, Animated} from 'react-native';
import CarouselItem from './CarouselItemScreen';
import slides from '../data';

export default Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(true);
    const scrollX = useRef(new Animated.Value(0)).current;
    const dataRef = useRef(null);
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    return(
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList 
                    data={slides} 
                    renderItem={({ item }) => <CarouselItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator
                    pagingEnabled
                    bounces={false} 
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={dataRef}
                />    
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
