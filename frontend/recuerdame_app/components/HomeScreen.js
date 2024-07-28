import React from "react";
import { View, Text, Button } from "react-native";

function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>HomeScreen</Text>
        <Button
          title="Soy cuidador"
          onPress={() => navigation.navigate('SignIn')}
        />
        <Button
          title="Soy paciente"
          //onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
}

export default HomeScreen;