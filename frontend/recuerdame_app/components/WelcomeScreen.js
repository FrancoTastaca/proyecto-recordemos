import React from "react";
import { View, Text, Button } from "react-native";
import Carousel from "./CarouselScreen";

function WelcomeScreen({}) {
    return (
      <View style={{ flex: 1, backgroundColor: '#CECAE8', alignItems: 'center', justifyContent: 'center' }}>
        <Carousel />
      </View>
    )
}

export default WelcomeScreen;