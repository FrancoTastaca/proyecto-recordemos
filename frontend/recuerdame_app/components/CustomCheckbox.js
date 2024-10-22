import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function CustomCheckbox({ checked, onChange }) {
    return (
        <Pressable
            style={[styles.checkboxBase, checked && styles.checkboxChecked]}
            onPress={onChange}>
            {checked && <Ionicons name="checkmark" size={24} color="white" />}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    checkboxBase: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#624D8A', // Color violeta predominante
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: '#624D8A', // Color violeta predominante
    },
});

export default CustomCheckbox;