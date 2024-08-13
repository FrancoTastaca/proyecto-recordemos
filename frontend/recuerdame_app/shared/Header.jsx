import React from "react";
import { StyleSheet, Text, View } from "react-native";

function Header(){
    return(
        <View style={styles.header}>
            <View style={styles.headerContent}>
                <Text style={styles.headerTitle}>Rol</Text>
                <Text style={styles.headerText}>Nombre Apellido</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 180,
        backgroundColor: '#624D8A'
    },
    headerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#CECAE8',
        paddingBottom: 10,
        paddingTop: 10,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#CECAE8',
        letterSpacing: 1,
        paddingBottom: 20
    }
})

export default Header