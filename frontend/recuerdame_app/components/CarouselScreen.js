import React, { useState, useRef } from 'react';
import {View, StyleSheet, FlatList, Animated, TouchableOpacity} from 'react-native';
import CarouselItem from './CarouselItemScreen';
import slides from '../data';
import Paginator from './Paginator';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default Carousel = () => {
    //const [currentIndex, setCurrentIndex] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const dataRef = useRef(null);
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const handleNext = () => {
        if(currentIndex < slides.length - 1){
            dataRef.current.scrollToIndex({ index: currentIndex + 1 })
        }
    }

    return(
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList 
                    data={slides} 
                    renderItem={({ item }) => <CarouselItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
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
            <Paginator data={slides} scrollX={scrollX} />
            {currentIndex < slides.length -1 && (
                <TouchableOpacity onPress={handleNext} style={styles.nextIcon}>
                    <FontAwesomeIcon icon={faCircleArrowRight} size={44} color='#33294c' />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextIcon: {
        position: 'absolute',
        right: 20,
        bottom: 50
    }
});
