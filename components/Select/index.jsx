import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

const Select = ({ name, value, options, onChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{name}</Text>
            <RNPickerSelect
                placeholder={{ label: "Selecione uma opção", value: null, color: '#000' }}
                value={value}
                onValueChange={onChange}
                items={options}
                style={pickerSelectStyles}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 8,
        overflow: 'hidden',
    },
    label: {
        color: '#fff',
        marginBottom: 2,
        fontSize: 15,
        fontWeight: '600',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        color: '#333',
        paddingRight: 30,
        backgroundColor: '#D9D9D9',
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        color: '#333',
        paddingRight: 30,
        backgroundColor: '#D9D9D9',
    },
});

export default Select;
